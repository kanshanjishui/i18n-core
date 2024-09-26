"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.translateByMicrosoft = exports.setMicrosoftConfig = void 0;
const fetch_1 = __importDefault(require("../fetch"));
const utils_1 = require("./utils");
const config = {
    key: '',
    location: '',
    from: '',
    to: [],
};
const ERROR_CODE_TIP_MAP = {
    401000: t('key 或者 location 配置不正确'),
};
const EXIT_ERROR_CODES = [401000];
function setMicrosoftConfig(configProp) {
    Object.entries(configProp).forEach(([key, value]) => {
        config[key] = value;
    });
}
exports.setMicrosoftConfig = setMicrosoftConfig;
async function translateByMicrosoft(props) {
    const { texts, from, to } = props;
    const { key, location } = config;
    const TRANSLATOR_NAME = (0, utils_1.getTranslatorName)('microsoft');
    const success = {};
    const error = {};
    const textErrorMsg = {};
    const data = JSON.stringify(texts.map((text) => ({ text })));
    let errorCode;
    try {
        const res = await (0, fetch_1.default)(`https://api.cognitive.microsofttranslator.com/translate?api-version=3.0&from=${from}&to=${to}`, {
            method: 'POST',
            data,
            headers: {
                'Content-type': 'application/json',
                'Ocp-Apim-Subscription-Key': key,
                'Ocp-Apim-Subscription-Region': location,
            },
        });
        errorCode = res?.error?.code;
        if (errorCode) {
            (0, utils_1.throwErrorByErrorCode)(errorCode, ERROR_CODE_TIP_MAP, TRANSLATOR_NAME, 'https://learn.microsoft.com/zh-cn/azure/cognitive-services/translator/reference/v3-0-reference', res?.error?.message);
        }
        const srcDistMap = res?.reduce?.((res, item, index) => {
            res[texts[index]] = item?.translations?.[0]?.text;
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
exports.translateByMicrosoft = translateByMicrosoft;
