"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const jsx_runtime_1 = require("jsx-to-md/jsx-runtime");
const jsx_to_md_1 = require("jsx-to-md");
const utils_1 = require("../utils");
function Principle() {
    return ((0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [(0, jsx_runtime_1.jsx)(jsx_to_md_1.H1, { children: tr('原理') }), (0, jsx_runtime_1.jsx)(jsx_to_md_1.BlockQuote, { children: tr('以{0}作为key是该库所有功能实现的关键，如果对此有任何疑问，{1}', (0, utils_1.getTranslationText)(), (0, jsx_to_md_1.render)((0, jsx_runtime_1.jsx)(jsx_to_md_1.Link, { href: (0, utils_1.getDocHref)('Q&A'), children: tr('请查看') }))) }), (0, jsx_runtime_1.jsx)(jsx_to_md_1.Break, {}), (0, jsx_runtime_1.jsx)(jsx_to_md_1.Break, {}), tr('该库主要由两部分构成'), (0, jsx_runtime_1.jsxs)(jsx_to_md_1.UnorderedList, { children: [(0, jsx_runtime_1.jsx)(jsx_to_md_1.ListItem, { children: tr('命令行工具') }), (0, jsx_runtime_1.jsx)(jsx_to_md_1.ListItem, { children: tr('函数API') })] }), (0, jsx_runtime_1.jsx)(jsx_to_md_1.Bold, { children: tr('命令行工具') }), "\uFF1A", tr('根据指定规则（正则匹配）解析出需要翻译的文案，并通过翻译平台将文案翻译到指定目标语言，最后生成语言包文件'), (0, jsx_runtime_1.jsx)(jsx_to_md_1.Break, {}), (0, jsx_runtime_1.jsx)(jsx_to_md_1.Break, {}), tr('解析文案的{0}简易示例如下', ` ${(0, jsx_to_md_1.render)((0, jsx_runtime_1.jsx)(jsx_to_md_1.Link, { href: (0, utils_1.getDocHref)('MATCH_RULE'), children: tr('匹配规则') }))} `), (0, jsx_runtime_1.jsx)(jsx_to_md_1.CodeBlock, { langType: "js", code: `
/** ${tr('普通字符串')} */

t('hello world')
t("hello world")
t(\`hello world\`)


/** ${tr('支持{0}', (0, utils_1.getVariableInterpolation)(true))} */

t('hello {0}', '${tr('开发者朋友们')}'),
t('${tr('这是{0}，欢迎{1}，如果你觉得{2}，请给予{3}支持')}', ' \`i18n-pro\` ', '${tr('使用')}', \`${tr('对你有帮助')}\`, ' ⭐️ ')


/** ${tr('{0}类型标记，需配合对应的格式化回调', (0, utils_1.getInterpolationVariable)(true))} */
${(0, utils_1.getTypeTagCode)()}` }), (0, jsx_runtime_1.jsx)(jsx_to_md_1.Bold, { children: tr('函数API') }), "\uFF1A", tr('将国际化语言包接入到项目中，由{0}、{1}、{2}和{3}构成', ' `initI18n` ', ' `t` ', ' `setI18n` ', ' `withI18n` '), (0, jsx_runtime_1.jsxs)(jsx_to_md_1.UnorderedList, { children: [(0, jsx_runtime_1.jsxs)(jsx_to_md_1.ListItem, { children: [(0, jsx_runtime_1.jsx)(jsx_to_md_1.Bold, { children: "initI18n" }), "\uFF1A", tr('用于初始化固定配置，最后返回包含如下 3 个 API 的对象')] }), (0, jsx_runtime_1.jsxs)(jsx_to_md_1.ListItem, { children: [(0, jsx_runtime_1.jsx)(jsx_to_md_1.Bold, { children: "t" }), "\uFF1A", tr('用于包裹{0}实现国际化，也作为命令行匹配{1}规则的标识', (0, utils_1.getTranslationText)(), (0, utils_1.getTranslationText)())] }), (0, jsx_runtime_1.jsxs)(jsx_to_md_1.ListItem, { children: [(0, jsx_runtime_1.jsx)(jsx_to_md_1.Bold, { children: "setI18n" }), "\uFF1A", tr('设置语言、语言包')] }), (0, jsx_runtime_1.jsxs)(jsx_to_md_1.ListItem, { children: [(0, jsx_runtime_1.jsx)(jsx_to_md_1.Bold, { children: "withI18n" }), "\uFF1A", tr('适用于服务端，每个接口响应需要做国际化的处理')] })] }), tr('所以{0}和{1}这两者搭配使用效果更佳，也正是由于这样的结构设计，使得{2}库可以很方便集成到任何的{3}项目中', ` \`${tr(`命令行工具`)}\` `, ` \`${tr(`函数API`)}\` `, ' `i18n-pro` ', ' `JavaScript` ')] }));
}
exports.default = Principle;
