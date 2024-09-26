"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.translateTextsToLangsImpl = exports.getTranslateConfig = exports.setTranslateConfig = void 0;
const gpt_3_encoder_1 = require("gpt-3-encoder");
const constants_1 = require("../constants");
const utils_1 = require("../utils");
const chalk_1 = __importDefault(require("../chalk"));
const baidu_1 = require("./baidu");
const youdao_1 = require("./youdao");
const tencent_1 = require("./tencent");
const aliyun_1 = require("./aliyun");
const microsoft_1 = require("./microsoft");
const google_1 = require("./google");
const openai_1 = require("./openai");
const googlex_1 = require("./googlex");
let config = {
    from: '',
    to: [],
    codeLocaleMap: undefined,
};
let lastRequestTimestamp = 0;
let innerConfig = {
    maxLengthConfig: {
        maxLengthType: 'allStrLength',
        maxLength: 100000,
    },
};
const translatorImplMap = {
    baidu: baidu_1.translateByBaidu,
    youdao: youdao_1.translateByYoudao,
    tencent: tencent_1.translateByTencent,
    aliyun: aliyun_1.translateByAliyun,
    microsoft: microsoft_1.translateByMicrosoft,
    google: google_1.translateByGoogle,
    googlex: googlex_1.translateByGooglex,
    openai: openai_1.translateByOpenAI,
};
const translatorSetConfigMap = {
    baidu: baidu_1.setBaiduConfig,
    youdao: youdao_1.setYoudaoConfig,
    tencent: tencent_1.setTencentConfig,
    aliyun: aliyun_1.setAliyunConfig,
    microsoft: microsoft_1.setMicrosoftConfig,
    google: google_1.setGoogleConfig,
    googlex: googlex_1.setGooglexConfig,
    openai: openai_1.setOpenAIConfig,
};
const maxLengthMap = {
    baidu: {
        maxLengthType: 'allStrLength',
        maxLength: 3000,
        separator: constants_1.SEPARATOR_STR,
    },
    youdao: {
        maxLengthType: 'allStrLength',
        maxLength: 5000,
    },
    tencent: {
        maxLengthType: 'allStrLength',
        maxLength: 5000,
    },
    aliyun: {
        maxLengthType: 'strLengthAndArrLength',
        maxLength: 1000,
        maxArrayLength: 50,
    },
    microsoft: {
        maxLengthType: 'allStrLengthAndArrLength',
        maxLength: 5000,
        maxArrayLength: 1000,
    },
    google: {
        maxLengthType: 'allStrLength',
        maxLength: 5000,
    },
    googlex: {
        maxLengthType: 'allStrLength',
        maxLength: 5000,
    },
    openai: {
        maxLengthType: 'allTokenLength',
        maxLength: 1000,
        separator: constants_1.SEPARATOR_STR,
    },
};
let currentTranslatorImpl;
let currentTranslatorSetConfig;
function setTranslateConfig(configProp, innerConfigProp) {
    const { translator = 'googlex' } = configProp;
    if (!Object.keys(translatorImplMap).includes(translator)) {
        (0, utils_1.logError)(t('不存在{0}的配置项', chalk_1.default.yellowBright(` translator = ${translator} `)));
        process.exit(1);
    }
    config = configProp[`${translator}Config`];
    if (typeof config === 'undefined' || Object.keys(config).length == 0) {
        (0, utils_1.logError)(t('当前{0}没有配置对应配置内容{1}', chalk_1.default.yellowBright(` translator = ${translator} `), chalk_1.default.redBright(` ${translator}Config `)));
        process.exit(1);
    }
    currentTranslatorImpl = translatorImplMap[translator];
    currentTranslatorSetConfig = translatorSetConfigMap[translator];
    currentTranslatorSetConfig(configProp[`${translator}Config`]);
    innerConfig = {
        ...innerConfig,
        ...(() => {
            const maxLengthConfig = maxLengthMap[translator];
            if (maxLengthConfig)
                return { maxLengthConfig };
            return {};
        })(),
        ...(innerConfigProp || {}),
    };
}
exports.setTranslateConfig = setTranslateConfig;
function getTranslateConfig() {
    return config;
}
exports.getTranslateConfig = getTranslateConfig;
async function translateTextsToLangImpl(props) {
    const res = await currentTranslatorImpl(props);
    return res;
}
async function translateTextsToLang(props) {
    const { texts, from, to } = props;
    const { delay } = config;
    const { maxLengthConfig: { maxLengthType, maxLength, maxArrayLength, separator = '', }, } = innerConfig;
    let success = {};
    let error = {};
    let count = 0;
    let fromTexts = [];
    let textErrorMsg = {};
    let tokens = 0;
    try {
        for (let i = 0; i < texts.length; i++) {
            const text = texts[i];
            if (maxLengthType === 'strLengthAndArrLength' &&
                text.length > maxLength) {
                error[text] = t('当前文案超出最大字符数限制：{0}', maxLength);
                continue;
            }
            fromTexts.push(text);
            count += (count === 0 ? 0 : separator.length) + text.length;
            if (i === texts.length - 1 ||
                (['allStrLength', 'allStrLengthAndArrLength'].includes(maxLengthType) &&
                    texts.length - 1 > i &&
                    count + separator.length + texts[i + 1].length > maxLength) ||
                (['strLengthAndArrLength', 'allStrLengthAndArrLength'].includes(maxLengthType) &&
                    fromTexts.length == maxArrayLength) ||
                (['allTokenLength'].includes(maxLengthType) &&
                    texts.length - 1 > i &&
                    (tokens = (0, gpt_3_encoder_1.encode)(fromTexts + texts[i + 1]).length) > maxLength)) {
                if (typeof delay === 'number' &&
                    delay > 0 &&
                    delay * 1000 > Date.now() - lastRequestTimestamp) {
                    const now = Date.now();
                    let last = 0;
                    const prefix = '\u001b[100D';
                    while ((last = Date.now() - now) < delay * 1000) {
                        process.stdout.write(t('{0}秒后将进行下一波翻译', chalk_1.default.redBright(Math.ceil((delay * 1000 - last) / 1000))) + prefix);
                    }
                    process.stdout.write(prefix);
                }
                const res = await translateTextsToLangImpl({
                    texts: fromTexts,
                    from,
                    to,
                    tokens,
                });
                lastRequestTimestamp = Date.now();
                const { success: _success, error: _error, textErrorMsg: _textErrorMsg, } = res;
                success = {
                    ...success,
                    ..._success,
                };
                error = {
                    ...error,
                    ..._error,
                };
                textErrorMsg = {
                    ..._textErrorMsg,
                };
                fromTexts = [];
                count = 0;
            }
        }
    }
    catch (error) {
        (0, utils_1.logError)(error);
    }
    return {
        success,
        error,
        textErrorMsg,
    };
}
function mergeTranslateLog(langCode, textResMap, logTarget) {
    Object.entries(textResMap).forEach(([text, target]) => {
        logTarget[text] = {
            ...(logTarget[text] || {}),
            [langCode]: target,
        };
    });
}
async function translateTextsToLangsImpl(texts, langsProp, incrementalMode) {
    const { from, to: tos, codeLocaleMap = {} } = config;
    const success = {};
    const error = {};
    const textErrorMsg = {};
    const langs = {};
    const textsMap = incrementalMode
        ? texts.reduce((res, item) => {
            res[item] = true;
            return res;
        }, {})
        : {};
    try {
        for (const to of tos) {
            const locale = codeLocaleMap[to] || to;
            const lang = langsProp[locale] || {};
            const filterTexts = incrementalMode
                ? texts.filter((text) => !lang[text])
                : texts;
            const filterLang = incrementalMode
                ? Object.entries(lang).reduce((res, [text, target]) => {
                    if (textsMap[text]) {
                        res[text] = target;
                    }
                    return res;
                }, {})
                : {};
            const res = await translateTextsToLang({
                texts: filterTexts,
                from,
                to,
            });
            const { success: _success, error: _error, textErrorMsg: _textErrorMsg, } = res;
            mergeTranslateLog(locale, _success, success);
            mergeTranslateLog(locale, _error, error);
            mergeTranslateLog(locale, _textErrorMsg, textErrorMsg);
            langs[locale] = {
                ...filterLang,
                ..._success,
            };
        }
    }
    catch (error) {
        (0, utils_1.logError)(error);
    }
    return {
        success,
        error,
        langs,
        textErrorMsg,
    };
}
exports.translateTextsToLangsImpl = translateTextsToLangsImpl;
