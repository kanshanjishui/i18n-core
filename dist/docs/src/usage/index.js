"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const jsx_runtime_1 = require("jsx-to-md/jsx-runtime");
const jsx_to_md_1 = require("jsx-to-md");
const path_1 = require("path");
const constants_1 = require("../constants");
const utils_1 = require("../utils");
function Install() {
    return ((0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [(0, jsx_runtime_1.jsx)(jsx_to_md_1.H2, { children: `1. ${tr('安装')}` }), (0, jsx_runtime_1.jsx)(jsx_to_md_1.CodeBlock, { langType: "bash", code: `npm i i18n-pro
# ${tr('或者')}
yarn add i18n-pro
# ${tr('或者')}
pnpm i i18n-pro` })] }));
}
function LinkApi() {
    return ((0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [(0, jsx_runtime_1.jsx)(jsx_to_md_1.H2, { children: `2. ${tr('接入函数API')}` }), (0, jsx_runtime_1.jsx)(jsx_to_md_1.H3, { children: tr('初始化') }), (0, jsx_runtime_1.jsx)(jsx_to_md_1.CodeBlock, { code: `
// i18n.js
import { initI18n } from 'i18n-pro'

const {
  t,
  setI18n,
  withI18n,
} = initI18n({
  // ${tr('命名空间属性是必须配置的')}
  namespace: 'testI18N',
})

// ${tr('这里可以挂载 API 到全局对象上，可以避免不同模块都需要通过 import 来引入 API')}
// ${tr('注意：如果当前你是在某个独立的第三方库或者组件中使用{0}，不推荐这样做，可能会造成你的用户 API 命名冲突', ' i18n-pro')}
// ${tr('浏览器环境，注意：如果是{0}环境需要将{1}替换成{2}', ' Node ', ' window ', ' global ')}
window.t = t
window.setI18n = setI18n
window.withI18n = withI18n

// ${tr('不挂载 API 到全局对象上的话，需要导出 API 以便于其他模块能使用对应 API')}
return {
  t,
  setI18n,
  withI18n,
}
` }), (0, jsx_runtime_1.jsx)(jsx_to_md_1.H3, { children: tr('项目入口文件引入 i18n.js') }), (0, jsx_runtime_1.jsx)(jsx_to_md_1.CodeBlock, { code: `
 // App.js
 import './i18n.js'

 // ${tr('后续是应用的执行（渲染）逻辑')}
` }), (0, jsx_runtime_1.jsx)(jsx_to_md_1.H3, { children: tr('用{0}包裹{1}', ' `t` ', (0, utils_1.getTranslationText)()) }), tr('这一步主要是用{0}函数包裹需要被翻译的文案', ' `t` '), (0, jsx_runtime_1.jsx)(jsx_to_md_1.CodeBlock, { langType: "js", code: `
/** ${tr('同目录下的 {0}', 'test.js')} */
// ${tr('如果是挂载 API 到全局对象，可以省略下行代码')}
import { t } from './i18n.js'

// ${tr('被翻译的文案')}
const text = t('hello world')` })] }));
}
function InitConfig() {
    return ((0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [(0, jsx_runtime_1.jsx)(jsx_to_md_1.Break, {}), (0, jsx_runtime_1.jsx)(jsx_to_md_1.H2, { children: `3. ${tr('初始化命令行配置文件')}` }), tr('在命令行终端输入如下命令，'), (0, jsx_runtime_1.jsx)(jsx_to_md_1.Link, { href: (0, utils_1.getDocHref)('COMMAND_LINE', tr('命令列表')), children: tr('更多命令') }), (0, jsx_runtime_1.jsx)(jsx_to_md_1.CodeBlock, { langType: "bash", code: `npx i18n init ` }), tr('命令执行成功后会在当前目录下生成一个{0}的文件，默认配置如下：', ' `i18nrc.js` '), (0, jsx_runtime_1.jsx)(jsx_to_md_1.CodeBlock, { code: (0, utils_1.getFileContent)((0, path_1.resolve)(__dirname, '../../../template/i18nrc.js')) })] }));
}
function ModifyConfig() {
    return ((0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [(0, jsx_runtime_1.jsx)(jsx_to_md_1.Break, {}), (0, jsx_runtime_1.jsx)(jsx_to_md_1.H2, { children: `4. ${tr('调整{0}配置', ' `i18nrc.js` ')}` }), tr('根据需求自行调整配置文件中的配置项，配置项的{0}', (0, jsx_to_md_1.render)((0, jsx_runtime_1.jsx)(jsx_to_md_1.Link, { href: (0, utils_1.getDocHref)('COMMAND_LINE', `1. ${tr('{0}配置', ' `i18nrc.js` ')}`), children: tr('说明') })))] }));
}
function ExecuteTranslateCommand() {
    return ((0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [(0, jsx_runtime_1.jsx)(jsx_to_md_1.Break, {}), (0, jsx_runtime_1.jsx)(jsx_to_md_1.H2, { children: `5. ${tr('执行翻译命令')}` }), (0, jsx_runtime_1.jsx)(jsx_to_md_1.CodeBlock, { langType: "bash", code: `npx i18n t ` }), tr('命令执行成功的话，会在指定的目录下生成语言包文件'), (0, jsx_runtime_1.jsx)("br", {}), (0, jsx_runtime_1.jsx)("br", {}), tr('默认配置下，生成的语言包是每个语言单独文件形式{0}，会生成{1}个语言包：{2}和{3}', "（`output.langType == 'multiple'`）", ' `2` ', ' `zh.json` ', ' `ja.json` '), (0, jsx_runtime_1.jsx)(jsx_to_md_1.CodeBlock, { langType: "text", code: `// zh.json
{
  "hello world": "你好世界"
}

// ja.json
{
  "hello world": "こんにちは世界"
}
` }), tr('如果生成的语言包是聚合的形式{0}，会生成{1}个语言包：{2}', "（`output.langType == 'single'`）", ' `1` ', ' `langs.json` '), (0, jsx_runtime_1.jsx)(jsx_to_md_1.CodeBlock, { langType: "text", code: `// langs.json
{
  "zh": {
    "hello world": "你好世界"
  },
  "ja": {
    "hello world": "こんにちは世界"
  }
}
` })] }));
}
function ImportLangs() {
    return ((0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [(0, jsx_runtime_1.jsx)(jsx_to_md_1.Break, {}), (0, jsx_runtime_1.jsx)(jsx_to_md_1.H2, { children: `6. ${tr('引入语言包')}` }), tr('语言包已经有了，就需要应用到项目中了'), (0, jsx_runtime_1.jsx)(jsx_to_md_1.Break, {}), (0, jsx_runtime_1.jsx)(jsx_to_md_1.Break, {}), tr('如果生成的语言包是每个语言单独文件形式{0}，操作如下：', "（`output.langType == 'multiple'`）"), (0, jsx_runtime_1.jsx)(jsx_to_md_1.CodeBlock, { code: `import zh from './i18n/zh.json'
import ja from './i18n/ja.json'
// ... ${tr('其他更多语言')}

setI18n({
  locale: 'en',
  langs:{
    zh,
    ja,
    // ... ${tr('其他更多语言')}
  },
})
// ${tr('后续才是应用的页面渲染逻辑')}` }), tr('如果生成的语言包是聚合的形式{0}，操作如下：', "（`output.langType == 'single'`）"), (0, jsx_runtime_1.jsx)(jsx_to_md_1.CodeBlock, { code: `import langs from './i18n/langs.json'

setI18n({
  locale: 'en',
  langs,
})
// ${tr('后续才是应用的页面渲染逻辑')}` }), tr('至此，项目已经完全接入了国际化，上面{0}指定为目标语言中任意一个，在页面上就能看到翻译好的内容了。后续如果项目中有新增的{1}（需要用{2}函数包裹哟），就仅仅需要再次执行翻译命令{3}生成最新的语言包就可以了', ' `locale` ', (0, utils_1.getTranslationText)(), ' `t` ', ' `npx i18n t` ')] }));
}
function SwitchLang() {
    return ((0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [(0, jsx_runtime_1.jsx)(jsx_to_md_1.Break, {}), (0, jsx_runtime_1.jsx)(jsx_to_md_1.H2, { children: `7. ${tr('切换语言')}` }), tr('正常情况下，执行如下方法就行，但是页面上已渲染的内容不会再更新，只有等对应文案的{0}函数重新执行，才有可能显示新语言对应的文案', ' `t` '), (0, jsx_runtime_1.jsx)(jsx_to_md_1.CodeBlock, { code: `setI18n({
  locale: 'en', // ${tr('设置指定语言')}
})` }), tr('如果是直接在前端应用中使用该库，在页面上切换语言时，只能通过{0}整个页面才能看到翻译后的效果，后续会推出{1}相关UI库的版本，结合对应库的特性可以做到不刷新页面切换语言，敬请期待', `**${tr('直接刷新')}**`, ' `React`、`Vue`、`SolidJS`、`Svelte` ')] }));
}
function Demo() {
    return ((0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [(0, jsx_runtime_1.jsx)(jsx_to_md_1.Break, {}), (0, jsx_runtime_1.jsx)(jsx_to_md_1.H2, { children: "8. Demo" }), tr('真实代码示例可参考{0}文档中的{1}，当前库{2}的控制台输出也接入了国际化', ' `README` ', ` ${(0, jsx_to_md_1.render)((0, jsx_runtime_1.jsx)(jsx_to_md_1.Link, { href: (0, utils_1.getDocHref)('README', 'Live Demo'), children: "Live Demo" }))} `, ` \`${tr('命令行工具')}\` `), (0, jsx_runtime_1.jsx)(jsx_to_md_1.Break, {}), (0, jsx_runtime_1.jsx)(jsx_to_md_1.Break, {}), tr('通过命令{0}就能看中文版了', ' `npx i18n h -L zh` '), (0, jsx_runtime_1.jsx)(jsx_to_md_1.Break, {}), (0, jsx_runtime_1.jsx)(jsx_to_md_1.Image, { ...constants_1.imageObj['demo'] })] }));
}
function Usage(props) {
    (0, utils_1.initI18n)(props);
    return ((0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [(0, jsx_runtime_1.jsx)(jsx_to_md_1.H1, { skip: true, children: tr('快速上手') }), (0, jsx_runtime_1.jsx)(jsx_to_md_1.TableOfContents, { text: tr('目录'), open: false }), (0, jsx_runtime_1.jsx)(Install, {}), (0, jsx_runtime_1.jsx)(LinkApi, {}), (0, jsx_runtime_1.jsx)(InitConfig, {}), (0, jsx_runtime_1.jsx)(ModifyConfig, {}), (0, jsx_runtime_1.jsx)(ExecuteTranslateCommand, {}), (0, jsx_runtime_1.jsx)(ImportLangs, {}), (0, jsx_runtime_1.jsx)(SwitchLang, {}), (0, jsx_runtime_1.jsx)(Demo, {})] }));
}
exports.default = Usage;
