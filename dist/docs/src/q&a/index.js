"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const jsx_runtime_1 = require("jsx-to-md/jsx-runtime");
const jsx_to_md_1 = require("jsx-to-md");
const utils_1 = require("../utils");
function Title(props) {
    const { order, title } = props;
    return ((0, jsx_runtime_1.jsxs)(jsx_to_md_1.H2, { children: [order, ". ", title] }));
}
function BasePrinciple(props) {
    const { order } = props;
    const extraCopy = tr('自动提取文案');
    return ((0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [(0, jsx_runtime_1.jsxs)(jsx_to_md_1.H2, { children: [order, ". ", tr('为什么要以{0}作为key呢？', (0, utils_1.getTranslationText)())] }), (0, jsx_runtime_1.jsx)(jsx_to_md_1.Bold, { children: tr('为了实现如下目标') }), (0, jsx_runtime_1.jsx)(jsx_to_md_1.List, { items: ['U', extraCopy, tr('自动翻译'), tr('自动生成语言包')] }), tr('以{0}作为key才能通过脚本识别出所有需要翻译的文案，从而实现{1}的目标，当然{2}也为后续目标的实现打下了良好的基础', (0, utils_1.getTranslationText)(), ` \`${extraCopy}\` `, ` \`${extraCopy}\` `), (0, jsx_runtime_1.jsx)(jsx_to_md_1.Break, {}), (0, jsx_runtime_1.jsx)(jsx_to_md_1.Break, {}), tr('通常国际化库都推荐如下形式的写法'), (0, jsx_runtime_1.jsx)(jsx_to_md_1.CodeBlock, { code: `
// ${tr('定义一个简单的key')}
const text1 = t('hello')
// ${tr('定义一个有分块的key')}
const text2 = t('module.hello')
` }), tr('对应语言包的形式'), (0, jsx_runtime_1.jsx)(jsx_to_md_1.CodeBlock, { code: `
// en.json
{
  "hello": "hello world",
  "module": {
    "hello": "hello xxx",
  }
}

// zh-CN.json
{
  "hello": "你好世界",
  "module": {
    "hello": "你好xxx",
  }
}
` }), (0, jsx_runtime_1.jsx)(jsx_to_md_1.Break, {}), tr('当前库的写法'), (0, jsx_runtime_1.jsx)(jsx_to_md_1.CodeBlock, { code: `
const text1 = t('hello world')
const text2 = t('hello xxx')
` }), tr('对应语言包的形式'), (0, jsx_runtime_1.jsx)(jsx_to_md_1.CodeBlock, { code: `
// zh-CN.json
{
  "hello world": "你好世界",
  "hello xxx": "你好xxx",
}
` }), tr('相对于传统的写法，以{0}作为key，有如下不足', (0, utils_1.getTranslationText)()), (0, jsx_runtime_1.jsx)(jsx_to_md_1.List, { items: ['U', tr('对于一词多译不友好'), tr('生成的语言包较大')] }), tr('当然也会有如下优点'), (0, jsx_runtime_1.jsx)(jsx_to_md_1.List, { items: [
                    'U',
                    tr('源码可读性强'),
                    tr('{0}本身语言无需生成语言包', (0, utils_1.getTranslationText)()),
                ] }), tr('如果你不能接受上述的不足，那么其他国际化方案更适合你；如果你能接受上述的不足，那么我相信{0}会带给你非常不错的开发体验', ' `i18n-pro` ')] }));
}
function VariableInterpolationAndInterpolationVariable(props) {
    const { order } = props;
    return ((0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [(0, jsx_runtime_1.jsx)(Title, { order: order, title: tr('{0}与{1}有何不同？', (0, utils_1.getVariableInterpolation)(), (0, utils_1.getInterpolationVariable)()) }), (0, jsx_runtime_1.jsx)(jsx_to_md_1.CodeBlock, { code: (0, utils_1.getTypeTagCode)() }), (0, jsx_runtime_1.jsx)(jsx_to_md_1.Bold, { children: (0, utils_1.getVariableInterpolation)(true) }), "\uFF1A", tr('指{0}这个功能的实现', ` \`t('hello {0}', 'world')\` → \`'hello world'\` `), (0, jsx_runtime_1.jsx)("br", {}), (0, jsx_runtime_1.jsx)(jsx_to_md_1.Bold, { children: (0, utils_1.getInterpolationVariable)(true) }), "\uFF1A", tr('指插入到文案中的变量'), (0, jsx_runtime_1.jsx)("br", {}), tr('例如上面示例代码中的{0}、{1}和{2}等', ' `100000000` ', ' `14999` ', ' `newDate()` '), (0, jsx_runtime_1.jsx)(jsx_to_md_1.List, { items: [
                    'U',
                    [
                        tr('{0}插入位置', (0, utils_1.getInterpolationVariable)()),
                        ['U', tr('类似于{0}等', `{0}、{1}、{2}`)],
                    ],
                    [
                        tr('{0}类型标记', (0, utils_1.getInterpolationVariable)()),
                        [
                            'U',
                            tr('类似于{0}等', `{n0}、{c1}、{t2}、{d3}、{p4${tr('个苹果')}}`),
                        ],
                    ],
                ] })] }));
}
function NonsupportObjectParamsResolve(props) {
    const { order } = props;
    return ((0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [(0, jsx_runtime_1.jsx)(jsx_to_md_1.H2, { children: `${order}. ${tr('{0}为什么不支持对象属性解析？', (0, utils_1.getVariableInterpolation)())}` }), tr('示例代码'), (0, jsx_runtime_1.jsx)(jsx_to_md_1.CodeBlock, { code: `// ${tr('对象属性解析')}
i18n('我叫{name}，今年{age}岁，来自{base}，是一名{job}', {
  name: '王尼玛',
  age: 22,
  base: '火星',
  job: '码农',
})

// ${tr('当前库的下标解析')}
i18n('我叫{0}，今年{1}岁，来自{2}，是一名{3}',
  '王尼玛',
  '22',
  '火星',
  '码农',
)` }), tr('主要原因是文案中包含属性名，不利于通过第三方平台翻译，上面的示例从中文翻译到英文还OK，如果是英文翻译到中文或其他语言，{0}中的属性名也会被翻译，这就是问题所在', (0, utils_1.getInterpolationVariable)()), (0, jsx_runtime_1.jsx)(jsx_to_md_1.Break, {}), (0, jsx_runtime_1.jsx)(jsx_to_md_1.Break, {}), tr('对象属性解析的示例'), (0, jsx_runtime_1.jsx)(jsx_to_md_1.CodeBlock, { code: `// ${tr('{0}为中文', (0, utils_1.getTranslationText)(true))}
const zh = '我叫{name}，今年{age}岁，来自{base}，是一名{job}'

// ${tr('通过百度翻译成英文，看似OK的')}
const zhToEn = \`My name is {name}. I'm {age} years old. I'm from {base}. I'm a {job} \`

// ${tr('再通过百度翻译将上面的英文翻译成中文，可以发现{job}的翻译就出问题了，而且不同的翻译平台，可能出现在的问题也不一样')}
const enToZh = '我的名字是｛name｝。我{age}岁。我来自{base}。我是{工作}'` }), tr('再来看看下标解析的示例'), (0, jsx_runtime_1.jsx)(jsx_to_md_1.CodeBlock, { code: `// ${tr('{0}为中文', (0, utils_1.getTranslationText)(true))}
const zh = '我叫{0}，今年{1}岁，来自{2}，是一名{3}'

// ${tr('通过百度翻译成英文')}
const zhToEn = \`My name is {0}. I'm {1} years old. I'm from {2}. I'm a {3}\`

// ${tr('通过百度翻译将上面的英文翻译成中文，不会出现上面参数匹配不上的问题')}
const enToZh = '我的名字是｛0｝。我是｛1｝岁。我来自｛2｝。我是｛3｝'` }), tr('虽然通过机器翻译本来就不能做到100%的准确率，但是这种方式可以尽量避免不必要的错误')] }));
}
function DateAndTime(props) {
    const { order } = props;
    return ((0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [(0, jsx_runtime_1.jsx)(Title, { order: order, title: tr('{0}类型{1}和{2}分开有必要吗？', (0, utils_1.getInterpolationVariable)(), `**${tr('日期')}**`, `**${tr('时间')}**`) }), tr('个人感觉其实是没有必要的，只是设计上已经实现了，大家可以酌情灵活选择使用，当然不排除有的业务场景这样分开处理会更方便')] }));
}
function SupportRichText(props) {
    const { order } = props;
    const richText1 = tr('hello {0}world{1}', '<b style="color:red;">', '</b>');
    return ((0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [(0, jsx_runtime_1.jsx)(Title, { order: order, title: tr('是否会支持富文本文案？') }), tr('不会支持，因为自动翻译是该库的核心功能，实现该功能的基本原则就是{0}需要为普通的纯文本，支持富文本与现有这一套实现逻辑上会存在冲突', (0, utils_1.getTranslationText)()), (0, jsx_runtime_1.jsx)("br", {}), (0, jsx_runtime_1.jsx)("br", {}), (0, jsx_runtime_1.jsx)(jsx_to_md_1.Bold, { children: tr('某些场景下，可以利用{0}来实现富文本的效果', (0, utils_1.getVariableInterpolation)()) }), (0, jsx_runtime_1.jsx)("br", {}), tr('例如这里的文案是{0}，页面上需要将{1}显示为红色粗体的样式', ' `hello world` ', ' `world` '), (0, jsx_runtime_1.jsx)("br", {}), (0, jsx_runtime_1.jsx)(jsx_to_md_1.Bold, { children: tr('方案一') }), (0, jsx_runtime_1.jsx)(jsx_to_md_1.CodeBlock, { code: `
t('hello {0}world{1}', '<b style="color:red;">', '</b>')

// ${tr('{0}函数执行后返回结果：{1}', 't ', richText1)}` }), (0, jsx_runtime_1.jsx)(jsx_to_md_1.Bold, { children: tr('方案二') }), (0, jsx_runtime_1.jsx)("br", {}), (0, jsx_runtime_1.jsx)(jsx_to_md_1.CodeBlock, { code: `
t('Hello {0}', \`<b style="color:red;">${"${t('world')}"}</b>\`)

// ${tr('{0}函数执行后返回结果：{1}', 't ', richText1)}` }), tr('针对上面两种方案，可以根据实际场景酌情考虑使用')] }));
}
function QAndA(props) {
    (0, utils_1.initI18n)(props);
    return ((0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [(0, jsx_runtime_1.jsx)(jsx_to_md_1.H1, { skip: true, children: "Q&A" }), (0, jsx_runtime_1.jsx)(jsx_to_md_1.TableOfContents, { text: tr('目录'), open: false }), (0, jsx_runtime_1.jsx)(BasePrinciple, { order: "1" }), (0, jsx_runtime_1.jsx)(VariableInterpolationAndInterpolationVariable, { order: "2" }), (0, jsx_runtime_1.jsx)(NonsupportObjectParamsResolve, { order: "3" }), (0, jsx_runtime_1.jsx)(DateAndTime, { order: "4" }), (0, jsx_runtime_1.jsx)(SupportRichText, { order: "5" })] }));
}
exports.default = QAndA;
