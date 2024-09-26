"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.extraText = void 0;
const utils_1 = require("./utils");
const chalk_1 = __importDefault(require("./chalk"));
const fs = require('fs');
function extraText(fileContent, funcName) {
    const regexp = new RegExp(/\WfuncName\(\n*[ ]*((['"`])(.+?)\2)(,|\))/.source.replace('funcName', funcName), 'g');
    const success = [];
    const error = [];
    let temp;
    while ((temp = regexp.exec(fileContent))) {
        const label = temp[1];
        const content = temp[3];
        if ((label.match(/^`.*`$/) && label.includes('${')) ||
            content.startsWith(' ') ||
            content.endsWith(' ') ||
            content.includes('\n') ||
            content.includes('\\n') ||
            content.includes('\t') ||
            content.includes('\\t')) {
            error.push(content);
        }
        else {
            success.push(content);
        }
    }
    return {
        success,
        error,
    };
}
exports.extraText = extraText;
function extraTexts(filepaths, funcName = 't') {
    let success = [];
    let error = [];
    filepaths.forEach((filepath) => {
        const fileContent = fs.readFileSync(filepath, {
            encoding: 'utf-8',
        });
        const trTextRes = extraText(fileContent, funcName);
        success.push(...trTextRes.success);
        error.push(...trTextRes.error);
    });
    success = Array.from(new Set(success));
    error = Array.from(new Set(error));
    (0, utils_1.logSuccess)(chalk_1.default.greenBright(t('解析符合要求的翻译文案数:')), success.length);
    (0, utils_1.logSuccess)(chalk_1.default.greenBright(t('解析不符合要求的翻译文案数:')), error.length);
    return {
        success,
        error,
    };
}
exports.default = extraTexts;
