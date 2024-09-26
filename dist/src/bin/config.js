"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.readConfig = exports.initConfig = void 0;
const path_1 = require("path");
const fs_1 = __importDefault(require("fs"));
const utils_1 = require("./utils");
const chalk_1 = __importDefault(require("./chalk"));
const constants_1 = require("./constants");
const configPath = (0, path_1.join)(process.cwd(), constants_1.CONFIG_NAME);
function initConfig(pathProp) {
    const targetPath = (() => {
        return typeof pathProp === 'string'
            ? (0, path_1.join)(process.cwd(), pathProp, constants_1.CONFIG_NAME)
            : configPath;
    })();
    const sourcePath = (0, path_1.join)(__dirname, constants_1.RELATIVE_PATH + 'template/' + constants_1.CONFIG_NAME);
    try {
        fs_1.default.copyFileSync(sourcePath, targetPath);
        console.log('\n');
        (0, utils_1.logSuccess)(t(`初始化配置完成，已将配置文件写入到 {0} 中`, targetPath), '\n');
    }
    catch (error) {
        (0, utils_1.logError)(error);
    }
}
exports.initConfig = initConfig;
function readConfig(props) {
    const { path, isFile = false } = props || {};
    const currentConfigPath = path
        ? isFile
            ? path
            : (0, path_1.join)(path, constants_1.CONFIG_NAME)
        : configPath;
    try {
        console.log(chalk_1.default.greenBright(t('读取配置文件')), currentConfigPath);
        const res = require(currentConfigPath);
        if (typeof res !== 'object') {
            throw new Error(t('配置文件不是有效配置'));
        }
        else if (Object.keys(res).length === 0) {
            throw new Error(t('配置文件为空', JSON.stringify(res)));
        }
        return res;
    }
    catch (error) {
        (0, utils_1.logError)(error?.message || error);
        process.exit(0);
    }
}
exports.readConfig = readConfig;
