"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.translateByYoudao = exports.setYoudaoConfig = void 0;
const fetch_1 = __importDefault(require("../fetch"));
const utils_1 = require("./utils");
const config = {
    appKey: '',
    key: '',
    from: '',
    to: [],
};
const ERROR_CODE_TIP_MAP = {
    102: t('不支持的语言类型'),
    108: t('appKey 配置不正确'),
    202: t('key 配置不正确'),
};
const EXIT_ERROR_CODES = ['102', '108', '202'];
function setYoudaoConfig(configProp) {
    Object.entries(configProp).forEach(([key, value]) => {
        config[key] = value;
    });
}
exports.setYoudaoConfig = setYoudaoConfig;
function truncate(q) {
    const len = q.length;
    if (len <= 20)
        return q;
    return q.substring(0, 10) + len + q.substring(len - 10, len);
}
async function translateByYoudao(props) {
    const { texts, from, to } = props;
    const { appKey, key } = config;
    const TRANSLATOR_NAME = (0, utils_1.getTranslatorName)('youdao');
    const success = {};
    const error = {};
    const textErrorMsg = {};
    const salt = new Date().getTime();
    const curtime = Math.round(new Date().getTime() / 1000);
    const str1 = appKey + truncate(texts.join('')) + salt + curtime + key;
    const sign = (0, utils_1.sha256)(str1);
    const body = {
        q: texts,
        appKey,
        salt,
        from,
        to,
        sign,
        signType: 'v3',
        curtime,
    };
    let errorCode;
    try {
        const res = await (0, fetch_1.default)('https://openapi.youdao.com/v2/api', {
            method: 'POST',
            data: (0, utils_1.getURLStringFromObj)(body),
            headers: {
                'content-type': 'application/x-www-form-urlencoded',
            },
        });
        errorCode = res.errorCode;
        if (errorCode != '0') {
            (0, utils_1.throwErrorByErrorCode)(errorCode, ERROR_CODE_TIP_MAP, TRANSLATOR_NAME, 'https://ai.youdao.com/DOCSIRMA/html/%E8%87%AA%E7%84%B6%E8%AF%AD%E8%A8%80%E7%BF%BB%E8%AF%91/API%E6%96%87%E6%A1%A3/%E6%89%B9%E9%87%8F%E7%BF%BB%E8%AF%91%E6%9C%8D%E5%8A%A1/%E6%89%B9%E9%87%8F%E7%BF%BB%E8%AF%91%E6%9C%8D%E5%8A%A1-API%E6%96%87%E6%A1%A3.html#section-10', res.msg);
        }
        const srcDistMap = res?.translateResults?.reduce?.((res, item) => {
            const { query, translation } = item;
            res[query] = translation;
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
exports.translateByYoudao = translateByYoudao;
