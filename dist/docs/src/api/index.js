"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsx_runtime_1 = require("jsx-to-md/jsx-runtime");
const jsx_to_md_1 = require("jsx-to-md");
const utils_1 = require("../utils");
const FunctionTemplate_1 = __importDefault(require("./FunctionTemplate"));
const langsTypeStr = `Record&lt;string, Record&lt;string, string&gt;&gt;`;
function renderFormatDesc() {
    const formatTypes = [
        { type: 'formatNumber', name: tr('数字'), lowTag: 'n', upperTag: 'N' },
        { type: 'formatCurrency', name: tr('货币'), lowTag: 'c', upperTag: 'C' },
        { type: 'formatDate', name: tr('日期'), lowTag: 'd', upperTag: 'D' },
        { type: 'formatTime', name: tr('时间'), lowTag: 't', upperTag: 'T' },
        { type: 'formatPlural', name: tr('复数'), lowTag: 'p', upperTag: 'P' },
    ];
    const getDesc = (name, lowTag, upperTag) => {
        return tr('格式化{0}类型{1}的回调，对应的类型标记是{2}{3}{4}', (0, jsx_to_md_1.render)((0, jsx_runtime_1.jsxs)("b", { children: [" ", name, " "] })), ` ${(0, jsx_to_md_1.render)((0, jsx_runtime_1.jsx)("code", { children: (0, utils_1.getInterpolationVariable)(true) }))} `, (0, jsx_to_md_1.render)((0, jsx_runtime_1.jsxs)("b", { children: [" ", lowTag, " "] })), tr('或'), (0, jsx_to_md_1.render)((0, jsx_runtime_1.jsxs)("b", { children: [" ", upperTag, " "] })));
    };
    return formatTypes.reduce((res, { type, name, lowTag, upperTag }) => {
        res[type] = getDesc(name, lowTag, upperTag);
        return res;
    }, {});
}
function getTitleToA(title) {
    return (0, jsx_to_md_1.render)((0, jsx_runtime_1.jsx)("a", { href: (0, jsx_to_md_1.getAnchor)(title), children: title }));
}
function getFormatTypeString(prefix) {
    return `${prefix}formatNumber?: ${getTitleToA('FormatFunc')},
${prefix}formatCurrency?: ${getTitleToA('FormatFunc')},
${prefix}formatDate?: ${getTitleToA('FormatDateFunc')},
${prefix}formatTime?: ${getTitleToA('FormatDateFunc')},
${prefix}formatPlural?: ${getTitleToA('FormatPluralFunc')},`;
}
function APIList() {
    return ((0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [(0, jsx_runtime_1.jsx)(jsx_to_md_1.H2, { children: tr('函数列表') }), (0, jsx_runtime_1.jsx)(FunctionTemplate_1.default, { name: "initI18n", description: tr('初始化固定配置，获取核心 API'), type: `(
  props: {
    namespace: string,
    locale?: string,
    langs?: ${langsTypeStr},
    beginIndex?: number,
${getFormatTypeString('    ')}
  }
) => ({
  ${getTitleToA('t')},
  ${getTitleToA('setI18n')},
  ${getTitleToA('withI18n')},
})`, props: {
                    namespace: tr('指定命名空间'),
                    locale: ((0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [tr('指定当前语言'), (0, jsx_runtime_1.jsx)("br", {}), (0, jsx_runtime_1.jsx)("br", {}), "\uD83D\uDCE2\uD83D\uDCE2\uD83D\uDCE2\uFF1A", tr('{0}的值默认跟语言代码相对应，如需自定义，需参考{1}的用法', ` ${(0, jsx_to_md_1.render)((0, jsx_runtime_1.jsx)("code", { children: "locale" }))} `, ` ${(0, jsx_to_md_1.render)((0, jsx_runtime_1.jsx)("code", { children: "codeLocaleMap" }))} `)] })),
                    langs: tr('设置当前语言包'),
                    beginIndex: tr('设置{0}函数中{1}起始下标，默认为 0', ` ${(0, jsx_to_md_1.render)((0, jsx_runtime_1.jsx)("code", { children: "t" }))} `, ` ${(0, jsx_to_md_1.render)((0, jsx_runtime_1.jsx)("code", { children: (0, utils_1.getInterpolationVariable)(true) }))} `),
                    ...renderFormatDesc(),
                } }), (0, jsx_runtime_1.jsx)(FunctionTemplate_1.default, { name: "t", description: (0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [tr('获取国际化文案'), (0, jsx_runtime_1.jsx)("br", {}), tr('内部会根据当前语言{0}从语言包{1}中获取{2}对应的{3}，未匹配到对应翻译内容会直接显示{4}本身内容', ` ${(0, jsx_to_md_1.render)((0, jsx_runtime_1.jsx)("code", { children: "locale" }))} `, ` ${(0, jsx_to_md_1.render)((0, jsx_runtime_1.jsx)("code", { children: "langs" }))} `, ` ${(0, jsx_to_md_1.render)((0, jsx_runtime_1.jsx)("code", { children: "text" }))} `, (0, utils_1.getTranslationText)(), ` ${(0, jsx_to_md_1.render)((0, jsx_runtime_1.jsx)("code", { children: "text" }))} `)] }), type: `(
  text: string,
  ...args: Array&lt;string|number|unknown&gt;
) =&gt; string`, props: {
                    text: tr('待翻译的文案，该文案需满足特定{0}', ` ${(0, jsx_to_md_1.render)((0, jsx_runtime_1.jsx)("a", { href: (0, utils_1.getDocHref)('MATCH_RULE'), children: tr('匹配规则') }))} `),
                    args: tr('表示{0}，没有个数限制，{1}文案中需要以{2}的形式来接收，{3}表示{4}的位置，从 0 开始（可在{5}中自定义起始值），第 1 个参数对应 0，对 2 个参数对应 1，以此往复', ` ${(0, jsx_to_md_1.render)((0, jsx_runtime_1.jsx)("code", { children: (0, utils_1.getInterpolationVariable)(true) }))} `, ` ${(0, jsx_to_md_1.render)((0, jsx_runtime_1.jsx)("code", { children: "text" }))} `, ` ${(0, jsx_to_md_1.render)((0, jsx_runtime_1.jsx)("code", { children: '{index}' }))} `, ` ${(0, jsx_to_md_1.render)((0, jsx_runtime_1.jsx)("code", { children: "index" }))} `, ` ${(0, jsx_to_md_1.render)((0, jsx_runtime_1.jsx)("code", { children: (0, utils_1.getInterpolationVariable)(true) }))} `, ` ${(0, jsx_to_md_1.render)((0, jsx_runtime_1.jsx)("code", { children: "initI18n" }))} `),
                } }), (0, jsx_runtime_1.jsx)(FunctionTemplate_1.default, { name: "setI18n", description: tr('设置语言、语言包'), type: `(
  props: {
    locale?: string,
    langs?: ${langsTypeStr},
  }
) => ${getTitleToA('I18nState')}`, props: {
                    locale: tr('指定当前语言'),
                    langs: tr('设置当前语言包，支持增量添加，新增的会覆盖合并到原有的之中'),
                } }), (0, jsx_runtime_1.jsx)(FunctionTemplate_1.default, { name: "withI18n", description: (0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [tr('获取独立于主程序的{0}函数', ` ${(0, jsx_to_md_1.render)((0, jsx_runtime_1.jsx)("code", { children: "t" }))} `), (0, jsx_runtime_1.jsx)("br", {}), tr('适用于服务端，每个接口响应需要做国际化的处理')] }), type: `(
  props:{
    locale: string
  }
) => ({ ${getTitleToA('t')} })`, props: {
                    locale: tr('指定当前语言'),
                } })] }));
}
function TypeInfo(props) {
    const { name, desc, content } = props;
    return ((0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [(0, jsx_runtime_1.jsx)(jsx_to_md_1.H3, { children: name }), desc, (0, jsx_runtime_1.jsx)(jsx_to_md_1.Break, {}), (0, jsx_runtime_1.jsx)("pre", { children: content }), (0, jsx_runtime_1.jsx)(jsx_to_md_1.Break, {})] }));
}
function FunctionType() {
    return ((0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [(0, jsx_runtime_1.jsx)(jsx_to_md_1.Break, {}), (0, jsx_runtime_1.jsx)(jsx_to_md_1.H2, { children: tr('其他类型') }), tr('以下类型是为了方便文档说明，与代码中类型写法上会存在区别，需以实际代码为准'), (0, jsx_runtime_1.jsx)(TypeInfo, { name: "I18nState", desc: tr('命名空间下的状态'), content: `type I18nState = {
  namespace: string
  locale?: string
  langs?: ${langsTypeStr}
  beginIndex?: number
${getFormatTypeString('  ')}
}` }), (0, jsx_runtime_1.jsx)(TypeInfo, { name: "FormatFunc", desc: tr('通用的格式化回调类型'), content: `type FormatFunc = <T>(props: {
  locale: string, // ${tr('当前语言')}
  payload: string | number | unknown | T, // ${(0, utils_1.getInterpolationVariable)(true)}
  t: ${getTitleToA('t')}, // ${tr('{0}函数', 't ')}
}) => number | string` }), (0, jsx_runtime_1.jsx)(TypeInfo, { name: "FormatDateFunc", desc: tr('日期（时间）的格式化回调函数类型'), content: `type FormatDateFunc = <T>(props: {
  locale: string, // ${tr('当前语言')}
  payload: string | number | Date | unknown | T, // ${(0, utils_1.getInterpolationVariable)(true)}
  t: ${getTitleToA('t')}, // ${tr('{0}函数', 't ')}
}) => string` }), (0, jsx_runtime_1.jsx)(TypeInfo, { name: "FormatPluralFunc", desc: tr('复数的格式化回调函数类型'), content: `type FormatPluralFunc = <T>(props: {
  locale: string, // ${tr('当前语言')}
  payload: string | number | unknown | T, // ${(0, utils_1.getInterpolationVariable)(true)}
  text: string // ${tr('默认将量词和名词组合起来的字符串，不需要复数处理的语言可以直接返回该属性')}
  keyword: string // ${tr('复数关键词')}
  t: ${getTitleToA('t')}, // ${tr('{0}函数', 't ')}
 }) => string` })] }));
}
function API(props) {
    (0, utils_1.initI18n)(props);
    return ((0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [(0, jsx_runtime_1.jsx)(jsx_to_md_1.H1, { skip: true, children: tr('函数API') }), (0, jsx_runtime_1.jsx)(jsx_to_md_1.TableOfContents, { text: tr('目录'), open: false }), (0, jsx_runtime_1.jsx)(APIList, {}), (0, jsx_runtime_1.jsx)(FunctionType, {})] }));
}
exports.default = API;
