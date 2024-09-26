"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.translateByGoogle = exports.translationClientForTest = exports.setGoogleConfig = void 0;
const translate_1 = require("@google-cloud/translate");
const chalk_1 = __importDefault(require("../chalk"));
const utils_1 = require("./utils");
const config = {
    projectId: '',
    location: 'global',
    from: '',
    to: [],
};
const ERROR_CODE_TIP_MAP = {
    '5 NOT_FOUND': t('projectId 配置不正确'),
    '3 INVALID_ARGUMENT': t('location 或者 语言代码 配置不正确'),
};
const EXIT_ERROR_CODES = Object.keys(ERROR_CODE_TIP_MAP);
function setGoogleConfig(configProp) {
    Object.entries(configProp).forEach(([key, value]) => {
        config[key] = value;
    });
}
exports.setGoogleConfig = setGoogleConfig;
const translationClient = new translate_1.TranslationServiceClient();
exports.translationClientForTest = translationClient;
async function translateImpl(props) {
    const { projectId, location, texts, from, to } = props;
    const request = {
        parent: `projects/${projectId}/locations/${location}`,
        contents: texts,
        mimeType: 'text/plain',
        sourceLanguageCode: from,
        targetLanguageCode: to,
    };
    let response = [];
    const res = {
        errorMsg: '',
        reason: '',
        translations: [],
        errorCode: 'noCode',
    };
    try {
        console.log(t('翻译中...'));
        response = await translationClient.translateText(request);
        const [{ translations }] = response;
        res.translations = translations;
    }
    catch (e) {
        const message = e.message || e;
        if (!e)
            throw e;
        Object.entries(ERROR_CODE_TIP_MAP).some(([code, msg]) => {
            if (message.includes(code)) {
                res.reason = msg;
                res.errorCode = code;
                return true;
            }
        });
        res.errorMsg = message;
    }
    return res;
}
async function translateByGoogle(props) {
    const { texts, from, to } = props;
    const { projectId, location } = config;
    const TRANSLATOR_NAME = (0, utils_1.getTranslatorName)('google');
    const success = {};
    const error = {};
    const textErrorMsg = {};
    let errorCode;
    try {
        const res = await translateImpl({
            projectId,
            location,
            ...props,
        });
        errorCode = res?.errorCode;
        if (res?.errorMsg) {
            throw `${chalk_1.default.redBright(t('{0}翻译接口返回错误', TRANSLATOR_NAME))}：
      ${t('错误信息')}：${chalk_1.default.redBright(res.errorMsg)}
      ${res.reason ? `${t('可能原因是: {0}', chalk_1.default.redBright(res.reason))}` : ''}
         `;
        }
        const srcDistMap = res.translations.reduce?.((res, item, index) => {
            res[texts[index]] = item?.translatedText;
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
exports.translateByGoogle = translateByGoogle;
