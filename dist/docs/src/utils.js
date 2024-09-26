"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.renderLanguage = exports.getTypeTagCode = exports.getInterpolationVariable = exports.getVariableInterpolation = exports.getTranslationText = exports.getIssueText = exports.getFileContent = exports.getDocHref = exports.initI18n = void 0;
const jsx_runtime_1 = require("jsx-to-md/jsx-runtime");
const jsx_to_md_1 = require("jsx-to-md");
const _lib_1 = require("@lib");
const fs_1 = require("fs");
const en_json_1 = __importDefault(require("./i18n/en.json"));
const package_json_1 = __importDefault(require("../../package.json"));
const constants_1 = require("./constants");
const { t, setI18n } = (0, _lib_1.initI18n)({ namespace: 'default' });
global.tr = t;
function initI18n({ locale }) {
    setI18n({
        locale,
        langs: {
            en: en_json_1.default,
        },
    });
    global.docLocale = locale;
}
exports.initI18n = initI18n;
function getDocHref(filename, anchorProp, localeProp) {
    const { version: originVersion, codeNameMap, homepage } = package_json_1.default;
    const locale = localeProp || global.docLocale;
    let name = codeNameMap[locale];
    name = name ? `_${name}` : '';
    const anchor = anchorProp ? (0, jsx_to_md_1.getAnchor)(anchorProp) : '';
    let version = `v${originVersion}`;
    const DEV_FILENAMES = ['CONTRIBUTION_GUIDELINES'];
    if (DEV_FILENAMES.includes(filename)) {
        version = 'dev';
    }
    if (filename === 'README') {
        return locale === 'en'
            ? `${homepage}/tree/${version}${anchor || '#readme'}`
            : `${homepage}/blob/${version}/${filename}${name}.md${anchor}`;
    }
    else {
        return `${homepage}/blob/${version}/docs/dist/${filename}${name}.md${anchor}`;
    }
}
exports.getDocHref = getDocHref;
function getFileContent(filepath) {
    const res = (0, fs_1.readFileSync)(filepath, { encoding: 'utf-8' });
    return res;
}
exports.getFileContent = getFileContent;
function getIssueText(text, props = {}) {
    const { issue, by } = props;
    let showIssue = typeof issue === 'number' ? [issue] : issue;
    showIssue =
        Array.isArray(showIssue) && showIssue.length
            ? showIssue.reduce((res, item, index) => {
                res += `${index === 0 ? '' : ' '}[#${item}](${package_json_1.default.bugs.url}/${item})`;
                return res;
            }, ' ')
            : '';
    const showBy = by ? ` by @[${by}](https://github.com/${by})` : '';
    return `${text}${showIssue}${showBy}`;
}
exports.getIssueText = getIssueText;
function getText(text, normal = false) {
    if (normal)
        return text;
    return ` \`${text}\` `;
}
function getTranslationText(normal = false) {
    const text = tr('翻译文案');
    return getText(text, normal);
}
exports.getTranslationText = getTranslationText;
function getVariableInterpolation(normal = false) {
    const text = tr('变量插值');
    return getText(text, normal);
}
exports.getVariableInterpolation = getVariableInterpolation;
function getInterpolationVariable(normal = false) {
    const text = tr('插值变量');
    return getText(text, normal);
}
exports.getInterpolationVariable = getInterpolationVariable;
function getTypeTagCode() {
    const text = `
// ${tr('数字类型')}
t('${tr('用户数达到了{0}', '{n0}')}', 100000000)

// ${tr('货币类型')}
t('${tr('售价为{0}', '{c0}')}', 14999)

// ${tr('日期类型')}
t(\`${tr('今天的日期是{0}', '{d0}')}\`, new Date())

// ${tr('时间类型')}
t('${tr('当前时间：{0}', '{t0}')}', new Date())

// ${tr('复数类型')}
t('${tr('我有{0}，{1}和{2}', `{${tr('p0个苹果')}}`, `{${tr('p1个香蕉')}}`, `{${tr('p2个梨')}}`)}', 5, 4, 3) `;
    return text;
}
exports.getTypeTagCode = getTypeTagCode;
function renderLanguage(filename) {
    const separator = ' | ';
    const res = constants_1.langs.reduce((res, item, index) => {
        const { code, name } = item;
        if (global.docLocale == code) {
            res.push(name);
        }
        else {
            res.push((0, jsx_runtime_1.jsx)(jsx_to_md_1.Link, { href: getDocHref(filename, undefined, code), children: name }));
        }
        if (index != constants_1.langs.length - 1) {
            res.push(separator);
        }
        return res;
    }, []);
    return ((0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [(0, jsx_runtime_1.jsx)(jsx_to_md_1.Break, {}), (0, jsx_runtime_1.jsx)(jsx_to_md_1.Break, {}), res, (0, jsx_runtime_1.jsx)(jsx_to_md_1.Break, {}), (0, jsx_runtime_1.jsx)(jsx_to_md_1.Break, {})] }));
}
exports.renderLanguage = renderLanguage;
