"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getTransResultLength = exports.transferArgsToObj = exports.getParamsNotEqualMsgs = exports.fixErrorTranslateText = exports.getLocale = exports.writeFilesSync = exports.logWarning = exports.logError = exports.logSuccess = void 0;
const fs_1 = __importDefault(require("fs"));
const chalk_1 = __importDefault(require("./chalk"));
function log(...rest) {
    return console.log(...rest);
}
exports.logSuccess = log.bind(null, '✅');
exports.logError = log.bind(null, '❌');
exports.logWarning = log.bind(null, '⚠️');
function writeFilesSync(props) {
    const { filepath, fileContent, showName, indentSize } = props;
    const dirpath = filepath.slice(0, filepath.lastIndexOf(process.platform === 'win32' ? '\\' : '/'));
    try {
        fs_1.default.statSync(dirpath);
    }
    catch (error) {
        if (error?.message?.includes?.('no such file or directory')) {
            try {
                fs_1.default.mkdirSync(dirpath, {
                    recursive: true,
                });
                (0, exports.logSuccess)(t(`检测到指定目录 {0} 不存在，已创建该目录`, chalk_1.default.greenBright(dirpath)));
            }
            catch (error) {
                (0, exports.logError)(error);
                return;
            }
        }
        else {
            (0, exports.logError)(error);
            return;
        }
    }
    try {
        fs_1.default.writeFileSync(filepath, JSON.stringify(fileContent, null, indentSize));
        (0, exports.logSuccess)(t(`已将 {0} 写入到 {1} 中`, showName, chalk_1.default.blueBright.underline.italic(filepath)));
    }
    catch (error) {
        (0, exports.logError)(error);
    }
}
exports.writeFilesSync = writeFilesSync;
function getLocale(args) {
    let locale = 'en';
    args.some((arg, index) => {
        if ((arg === '-L' || arg === '--locale') &&
            ['zh', 'en'].includes(args[index + 1])) {
            locale = args[index + 1];
            return true;
        }
    });
    return locale;
}
exports.getLocale = getLocale;
function fixErrorTranslateText(text) {
    const res = text.replace(/\{[ncdtp]([ ]+)\d+[^}]*\}/gi, (t, i) => {
        return t.replace(i, '');
    });
    return res;
}
exports.fixErrorTranslateText = fixErrorTranslateText;
function getParamNotEqualMsgs(src, dist, regExp) {
    const srcParams = src.match(regExp) || [];
    const distParams = dist.match(regExp) || [];
    const errorMsg = srcParams.reduce((res, i) => {
        if (!distParams.includes(i)) {
            res.push({
                msg: t('已翻译文案中缺少动态参数标识：{0}', i),
                index: i.match(/\d+/)[0],
            });
        }
        return res;
    }, []);
    return errorMsg;
}
function getPluralParamNotEqualMsgs(src, dist) {
    const regExp = /\{p\d+[^}]+\}/gi;
    const srcParams = src.match(regExp) || [];
    const distParams = dist.match(regExp) || [];
    const errorMsg = srcParams.reduce((res, i) => {
        const index = i.match(/\d+/)[0];
        const isExist = distParams.some((i) => new RegExp(regExp.source.replace('\\d+', index), 'gi').test(i));
        if (!isExist) {
            res.push({
                msg: t('已翻译文案中缺少动态参数标识：{0}', i),
                index,
            });
        }
        return res;
    }, []);
    return errorMsg;
}
function getParamsNotEqualMsgs(src, dist) {
    const paramsMsgs = getParamNotEqualMsgs(src, dist, /\{\d+\}/g);
    const tagParamsMsgs = getParamNotEqualMsgs(src, dist, /\{[ncdt]\d+\}/gi);
    const pluralParams = getPluralParamNotEqualMsgs(src, dist);
    const res = [...paramsMsgs, ...tagParamsMsgs, ...pluralParams]
        .sort((a, b) => a.index - b.index)
        .map((i) => i.msg);
    return res;
}
exports.getParamsNotEqualMsgs = getParamsNotEqualMsgs;
function transferArgsToObj(args) {
    const isArgName = (value) => value?.startsWith('-') || value?.startsWith('--');
    const res = args.reduce((res, item, index) => {
        if (isArgName(item)) {
            if (index === args.length - 1 || isArgName(args[index + 1])) {
                res[item] = true;
            }
            else {
                res[item] = args[index + 1];
            }
        }
        return res;
    }, {});
    return res;
}
exports.transferArgsToObj = transferArgsToObj;
function getTransResultLength(record) {
    const length = Object.entries(record).reduce((res, [text, info]) => {
        res += Object.keys(info).length;
        return res;
    }, 0);
    return length;
}
exports.getTransResultLength = getTransResultLength;
