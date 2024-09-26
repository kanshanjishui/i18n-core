"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.translateByAliyun = exports.mockClientUtil = exports.setAliyunConfig = void 0;
const openapi_client_1 = require("@alicloud/openapi-client");
const alimt20181012_1 = __importStar(require("@alicloud/alimt20181012"));
const tea_util_1 = require("@alicloud/tea-util");
const utils_1 = require("./utils");
const config = {
    accessKeyId: '',
    accessKeySecret: '',
    from: '',
    to: [],
};
const ERROR_CODE_TIP_MAP = {
    MissingAccessKeyId: t('accessKeyId 或者 accessKeySecret 配置不正确'),
};
const EXIT_ERROR_CODES = ['MissingAccessKeyId'];
function setAliyunConfig(configProp) {
    Object.entries(configProp).forEach(([key, value]) => {
        config[key] = value;
    });
}
exports.setAliyunConfig = setAliyunConfig;
exports.mockClientUtil = (() => {
    let client;
    return {
        getClient() {
            return client;
        },
        setClient(clientProp) {
            client = clientProp;
        },
    };
})();
async function translateImpl(props) {
    const { texts, from, to } = props;
    const { accessKeyId, accessKeySecret, scene = 'general', apiType = 'translate_standard', endpoint = 'mt.aliyuncs.com', } = config;
    const openApiConfig = new openapi_client_1.Config({
        accessKeyId,
        accessKeySecret,
    });
    openApiConfig.endpoint = endpoint;
    const mockClient = exports.mockClientUtil.getClient();
    const client = mockClient || new alimt20181012_1.default(openApiConfig);
    const getBatchTranslateRequest = new alimt20181012_1.GetBatchTranslateRequest({
        sourceText: JSON.stringify(texts.reduce((res, item, index) => {
            res[index] = item;
            return res;
        }, {})),
        sourceLanguage: from,
        targetLanguage: to,
        formatType: 'text',
        scene,
        apiType,
    });
    const runtime = new tea_util_1.RuntimeOptions({});
    try {
        const res = await client.getBatchTranslateWithOptions(getBatchTranslateRequest, runtime);
        return {
            code: res.body.code != 200 ? res.body.code : undefined,
            message: res.body.message,
            translatedList: res.body.translatedList,
        };
    }
    catch (error) {
        if (!error?.code)
            throw error;
        return {
            code: error?.code,
            message: error?.data?.Message,
        };
    }
}
async function translateByAliyun(props) {
    const TRANSLATOR_NAME = (0, utils_1.getTranslatorName)('aliyun');
    const { texts, from, to } = props;
    const success = {};
    const error = {};
    const textErrorMsg = {};
    let errorCode;
    try {
        const res = await translateImpl({
            ...props,
        });
        errorCode = res?.code;
        if (errorCode) {
            (0, utils_1.throwErrorByErrorCode)(errorCode, ERROR_CODE_TIP_MAP, TRANSLATOR_NAME, 'https://next.api.aliyun.com/global-error-code?spm=api-workbench.API%20Document.0.0.49fe491dRlO8CY', res?.message);
        }
        const srcDistMap = res?.translatedList?.reduce?.((res, item) => {
            const { code, index, translated } = item;
            if (code == '200') {
                res[texts[index]] = translated;
            }
            return res;
        }, {});
        (0, utils_1.collectRes)({
            from,
            to,
            texts,
            srcDistMap,
            success,
            error,
            textErrorMsg,
            translatorName: TRANSLATOR_NAME,
        });
    }
    catch (e) {
        (0, utils_1.handleTranslateFail)(e, errorCode, EXIT_ERROR_CODES, texts, error);
    }
    return {
        success,
        error,
        textErrorMsg,
    };
}
exports.translateByAliyun = translateByAliyun;
