"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const utils_1 = require("./utils");
const chalk_1 = __importDefault(require("./chalk"));
const fast_glob_1 = __importDefault(require("fast-glob"));
const path = require('path');
const fs = require('fs');
function logPath(path) {
    console.log(chalk_1.default.greenBright(t('已录入')), path);
}
function extraFileSyncImpl(dirpath, fileRegExp) {
    const filepaths = [];
    const filenames = fs.readdirSync(dirpath);
    filenames.forEach((filename) => {
        const filepath = path.join(dirpath, filename);
        const stats = fs.statSync(filepath);
        if (stats.isDirectory()) {
            filepaths.push(...extraFileSyncImpl(filepath, fileRegExp));
        }
        else {
            if (fileRegExp.test(filename)) {
                filepaths.push(filepath);
                logPath(filepath);
            }
        }
    });
    return filepaths;
}
function extraFileSyncLegacy(dirpath, fileRegExp) {
    console.log(chalk_1.default.greenBright(t('开始解析路径：')), dirpath);
    if (!dirpath || !fileRegExp) {
        (0, utils_1.logError)(t('未正确配置{0},{1},{2}等属性', ' entry ', ' fileRegExp ', ' glob '));
        return [];
    }
    const filepaths = extraFileSyncImpl(dirpath, fileRegExp);
    return filepaths;
}
function extraFileByGlob(globPattern) {
    console.log(chalk_1.default.greenBright(t('开始解析 Glob 语法：')), globPattern);
    const filepaths = fast_glob_1.default.sync(globPattern, {
        onlyFiles: true,
        absolute: true,
    });
    filepaths.forEach((path) => logPath(path));
    return filepaths;
}
function extraFileSync(props) {
    let filepaths = [];
    const { entry, fileRegExp, input } = props;
    if (typeof input !== 'undefined') {
        filepaths = extraFileByGlob(input);
    }
    else {
        filepaths = extraFileSyncLegacy(entry, fileRegExp);
    }
    (0, utils_1.logSuccess)(chalk_1.default.greenBright(t('解析符合要求的文件路径数:')), filepaths.length);
    return filepaths;
}
exports.default = extraFileSync;
