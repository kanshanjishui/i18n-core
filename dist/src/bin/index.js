#! /usr/bin/env node
"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.execCommand = void 0;
const extra_file_1 = __importDefault(require("./extra-file"));
const utils_1 = require("./utils");
const constants_1 = require("./constants");
const extra_text_1 = __importDefault(require("./extra-text"));
const index_1 = require("./translate/index");
const i18n_1 = require("./i18n");
const config_1 = require("./config");
const chalk_1 = __importDefault(require("./chalk"));
const extra_langs_1 = __importDefault(require("./extra-langs"));
const node_path_1 = require("node:path");
const path = require('path');
const langs = (() => {
    let langs = {};
    try {
        langs = require(constants_1.RELATIVE_PATH + 'i18n/langs.json');
    }
    catch (error) {
        (0, utils_1.logWarning)(chalk_1.default.yellowBright('读取多语言聚合语言包失败，采用默认 zh 的语言包'), '\n');
    }
    return langs;
})();
const packageInfo = require(constants_1.RELATIVE_PATH + 'package.json');
async function translateController({ incrementalMode, configPath, }) {
    const { funcName = 't', entry, fileRegExp = /\.[jt]s$/, input, output: { path: outputPath, langType = 'multiple', indentSize = 2 }, ...restTranslatorConfig } = (0, config_1.readConfig)({
        path: configPath ? (0, node_path_1.join)(process.cwd(), configPath) : undefined,
    });
    (0, index_1.setTranslateConfig)(restTranslatorConfig);
    const filepaths = (0, extra_file_1.default)({
        entry,
        fileRegExp,
        input,
    });
    if (filepaths.length === 0) {
        console.log((0, i18n_1.t)('未解析到需要翻译的文件，本次操作已结束'));
        return;
    }
    const trTextRes = (0, extra_text_1.default)(filepaths, funcName);
    const translateConfig = (0, index_1.getTranslateConfig)();
    const sourceLangs = (0, extra_langs_1.default)({
        path: outputPath,
        langType,
        to: translateConfig.to,
        codeLocaleMap: translateConfig.codeLocaleMap,
    });
    const translateRes = await (0, index_1.translateTextsToLangsImpl)(trTextRes.success, sourceLangs, incrementalMode);
    const { success, error, langs, textErrorMsg } = translateRes;
    (0, utils_1.writeFilesSync)({
        filepath: path.join(outputPath, constants_1.LOG_DIR_NAME, 'filepaths.json'),
        fileContent: filepaths,
        showName: (0, i18n_1.t)('匹配到的文件路径列表({0})', chalk_1.default.greenBright(filepaths.length)),
        indentSize,
    });
    (0, utils_1.writeFilesSync)({
        filepath: path.join(outputPath, constants_1.LOG_DIR_NAME, 'texts.json'),
        fileContent: trTextRes.success,
        showName: (0, i18n_1.t)('提取的翻译文案({0})', chalk_1.default.greenBright(trTextRes.success.length)),
        indentSize,
    });
    (0, utils_1.writeFilesSync)({
        filepath: path.join(outputPath, constants_1.LOG_DIR_NAME, 'texts-error.json'),
        fileContent: trTextRes.error,
        showName: (0, i18n_1.t)('提取的编写不规范的翻译文案({0})', chalk_1.default.redBright(trTextRes.error.length)),
        indentSize,
    });
    (0, utils_1.writeFilesSync)({
        filepath: path.join(outputPath, constants_1.LOG_DIR_NAME, 'translate-success.json'),
        fileContent: success,
        showName: (0, i18n_1.t)('翻译成功({0})', chalk_1.default.greenBright((0, utils_1.getTransResultLength)(success))),
        indentSize,
    });
    (0, utils_1.writeFilesSync)({
        filepath: path.join(outputPath, constants_1.LOG_DIR_NAME, 'translate-fail.json'),
        fileContent: error,
        showName: (0, i18n_1.t)('翻译失败({0})', chalk_1.default.redBright((0, utils_1.getTransResultLength)(error))),
        indentSize,
    });
    (0, utils_1.writeFilesSync)({
        filepath: path.join(outputPath, constants_1.LOG_DIR_NAME, 'translate-error.json'),
        fileContent: textErrorMsg,
        showName: (0, i18n_1.t)('翻译有误({0})', chalk_1.default.redBright((0, utils_1.getTransResultLength)(textErrorMsg))),
        indentSize,
    });
    (0, utils_1.writeFilesSync)({
        filepath: path.join(outputPath, langType === 'multiple' ? constants_1.LOG_DIR_NAME : '', 'langs.json'),
        fileContent: langs,
        showName: (0, i18n_1.t)('多语言聚合文件({0})', chalk_1.default.greenBright((0, utils_1.getTransResultLength)(langs))),
        indentSize,
    });
    Object.entries(langs).forEach(([lang, content]) => {
        (0, utils_1.writeFilesSync)({
            filepath: path.join(outputPath, langType === 'multiple' ? '' : constants_1.LOG_DIR_NAME, lang + '.json'),
            fileContent: content,
            showName: (0, i18n_1.t)('语言包 {0} 文件({1})', lang, chalk_1.default.greenBright(Object.keys(content).length)),
            indentSize,
        });
    });
}
async function execCommand() {
    const [command, ...args] = process.argv.slice(2);
    const locale = (0, utils_1.getLocale)([command, ...args]);
    const argObj = (0, utils_1.transferArgsToObj)(args);
    const configPath = (argObj['--path'] || argObj['-P']);
    (0, i18n_1.setI18n)({
        locale,
        langs,
    });
    switch (command) {
        case 'init':
            (0, config_1.initConfig)(configPath);
            break;
        case 'translate':
        case 't':
            {
                const label = chalk_1.default.yellowBright((0, i18n_1.t)('共耗时'));
                console.time(label);
                await translateController({
                    incrementalMode: !args.includes(constants_1.NON_INCREMENTAL),
                    configPath,
                });
                console.timeLog(label);
            }
            break;
        case 'v':
        case 'version':
            console.log('\n', (0, i18n_1.t)('当前版本：{0}', chalk_1.default.greenBright(packageInfo.version)), '\n');
            break;
        case 'h':
        case 'help':
            console.log(`
  ${chalk_1.default.redBright('i18n')} <${chalk_1.default.greenBright((0, i18n_1.t)('命令'))}> [${chalk_1.default.yellowBright((0, i18n_1.t)('参数'))}]


  ${(0, i18n_1.t)('用法')}:

  i18n  ${chalk_1.default.greenBright('init')}                           ${(0, i18n_1.t)('初始化配置文件')}
  i18n  ${chalk_1.default.greenBright('t | translate')}                  ${(0, i18n_1.t)('提取翻译文案，自动翻译并生成语言包')}
  i18n  ${chalk_1.default.greenBright('v | version')}                    ${(0, i18n_1.t)('显示版本信息')}
  i18n  ${chalk_1.default.greenBright('h | help')}                       ${(0, i18n_1.t)('显示帮助信息')}


  ${(0, i18n_1.t)('参数')}:

        ${chalk_1.default.yellowBright('-L | --locale')}    zh | en       ${(0, i18n_1.t)('可选语言有中文（zh）/ 英文（{0}）， 默认为英文（en）', 'en')}
        ${chalk_1.default.yellowBright(constants_1.NON_INCREMENTAL)}              ${(0, i18n_1.t)('非增量翻译模式进行翻译，已翻译的文案会完全被覆盖')}
        ${chalk_1.default.yellowBright('-P | --path')}                    ${(0, i18n_1.t)('指定配置文件路径（参数为相对路径）')}
          `);
            break;
        default:
            console.log(`
  ${chalk_1.default.redBright((0, i18n_1.t)('输入命令有误:'))}
  ${(0, i18n_1.t)('可输入{0}查看帮助信息', chalk_1.default.greenBright(' i18n h '))}
      `);
    }
}
exports.execCommand = execCommand;
if (!process.env.NODE_ENV) {
    execCommand();
}
