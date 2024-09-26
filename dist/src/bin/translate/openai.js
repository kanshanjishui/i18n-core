"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.translateByOpenAI = exports.setOpenAIConfig = void 0;
const fetch_1 = __importDefault(require("../fetch"));
const utils_1 = require("./utils");
const config = {
    key: '',
    proxy: undefined,
    root: 'https://api.openai.com/v1/chat/completions',
    model: 'gpt-3.5-turbo',
    from: '',
    to: [],
    delay: 0,
};
const ERROR_CODE_TIP_MAP = {};
const EXIT_ERROR_CODES = ['invalid_api_key'];
function setOpenAIConfig(configProp) {
    Object.entries(configProp).forEach(([key, value]) => {
        config[key] = value;
    });
}
exports.setOpenAIConfig = setOpenAIConfig;
async function translateByOpenAI(props) {
    const { texts, from, to, tokens } = props;
    const { key, proxy, model = 'gpt-3.5-turbo', root } = config;
    const TRANSLATOR_NAME = (0, utils_1.getTranslatorName)('openai');
    const success = {};
    const error = {};
    const textErrorMsg = {};
    let errorCode;
    try {
        console.log(t('翻译中...'));
        const content = `Translate the following JSON from ${from} to ${to} and return the translated JSON array only: ${JSON.stringify(texts)}`;
        const res = await (0, fetch_1.default)(root, {
            method: 'POST',
            data: JSON.stringify({
                model,
                messages: [
                    {
                        role: 'user',
                        content: content,
                    },
                ],
                temperature: 0,
                max_tokens: 4000 - tokens,
                top_p: 1,
                frequency_penalty: 0,
                presence_penalty: 0,
            }),
            headers: {
                'content-type': 'application/json',
                Authorization: `Bearer ${key}`,
            },
            proxy,
        });
        errorCode = res?.error?.code;
        if (errorCode || res?.error?.message) {
            (0, utils_1.throwErrorByErrorCode)(errorCode, ERROR_CODE_TIP_MAP, TRANSLATOR_NAME, 'https://platform.openai.com/docs/guides/error-codes', res?.error?.message);
        }
        const transText = res.choices[0].message.content.replace(/^\n\n/, '');
        const transTexts = JSON.parse(transText);
        const srcDistMap = transTexts.reduce?.((res, item, index) => {
            res[texts[index]] = item;
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
exports.translateByOpenAI = translateByOpenAI;
