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
exports.getTranslatorName = exports.handleTranslateFail = exports.collectRes = exports.throwErrorByErrorCode = exports.getURLStringFromObj = exports.sha256 = exports.md5 = void 0;
const node_crypto_1 = require("node:crypto");
const chalk_1 = __importStar(require("../chalk"));
const constants_1 = require("../constants");
const utils_1 = require("../utils");
function md5(str) {
    return (0, node_crypto_1.createHash)('md5').update(str).digest('hex').toString();
}
exports.md5 = md5;
function sha256(str) {
    return (0, node_crypto_1.createHash)('sha256').update(str).digest('hex').toString();
}
exports.sha256 = sha256;
function getURLStringFromObj(obj) {
    const data = Object.entries(obj).reduce((res, [key, value]) => {
        if (Array.isArray(value)) {
            res += value.reduce((arrRes, item) => {
                arrRes += `${res != '' || arrRes != '' ? '&' : ''}${key}=${item}`;
                return arrRes;
            }, '');
        }
        else {
            res += `${res != '' ? '&' : ''}${key}=${value}`;
        }
        return res;
    }, '');
    return data;
}
exports.getURLStringFromObj = getURLStringFromObj;
function throwErrorByErrorCode(errorCode, errorCodeTipMap, translatorName, docUrl, errorMsg) {
    const errorText = errorMsg
        ? '\n   ' + t('错误信息: {0}', chalk_1.default.redBright(errorMsg))
        : '';
    let errorReason = errorCodeTipMap[errorCode];
    errorReason = errorReason
        ? t('可能原因是: {0}', chalk_1.default.redBright(errorCodeTipMap[errorCode]))
        : '';
    throw `${chalk_1.default.redBright(t('{0}翻译接口返回错误', translatorName))}：
   ${t('错误码')}：${errorCode}${errorText}
   ${t('可根据错误码在 {0} 该文档中查看错误具体原因', chalk_1.default.blueBright.underline(docUrl))}
   ${errorReason}
      `;
}
exports.throwErrorByErrorCode = throwErrorByErrorCode;
function collectRes(props) {
    const { from, to, texts, srcDistMap, success, error, textErrorMsg, translatorName, } = props;
    texts.forEach((text) => {
        const dst = srcDistMap[text];
        if (typeof dst === 'string' && dst) {
            const newDst = (0, utils_1.fixErrorTranslateText)(dst);
            const currentTextError = (0, utils_1.getParamsNotEqualMsgs)(text, newDst);
            if (currentTextError.length > 0) {
                textErrorMsg[text] = currentTextError;
            }
            success[text] = newDst;
            (0, utils_1.logSuccess)(t('{0}({1}{2}{3})：{4}{5}{6}', chalk_1.default.greenBright(t('{0}翻译成功', translatorName)), chalk_1.default.redBright.italic(from), chalk_1.default.bold.greenBright(' → '), chalk_1.default.redBright.italic(to), text, chalk_1.default.bold.greenBright(' → '), newDst));
        }
        else {
            error[text] = t('当前文案【{0}】未被翻译', text);
        }
    });
}
exports.collectRes = collectRes;
function handleTranslateFail(e, errorCode, exitCodes, texts, error) {
    (0, utils_1.logError)(e);
    if (errorCode && exitCodes.includes(errorCode)) {
        process.exit(1);
    }
    let currentErrorText = e || constants_1.TRANSLATE_ERROR_TEXT;
    currentErrorText = currentErrorText
        ?.toString()
        ?.replaceAll('\n', '')
        ?.replaceAll(chalk_1.STYLE_EOF, '')
        ?.replaceAll(chalk_1.default.redBright().replace(chalk_1.STYLE_EOF, ''), '')
        ?.replaceAll(chalk_1.default.blueBright.underline().replace(chalk_1.STYLE_EOF, ''), '');
    texts.forEach((text) => {
        error[text] = currentErrorText;
    });
}
exports.handleTranslateFail = handleTranslateFail;
function getTranslatorName(translator) {
    const translatorTextMap = {
        aliyun: t('阿里云'),
        baidu: t('百度'),
        youdao: t('有道'),
        tencent: t('腾讯'),
        microsoft: t('微软'),
        google: t('谷歌'),
        googlex: t('谷歌X'),
        openai: 'OpenAI',
    };
    return translatorTextMap[translator];
}
exports.getTranslatorName = getTranslatorName;
