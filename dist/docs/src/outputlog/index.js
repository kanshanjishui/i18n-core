"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const jsx_runtime_1 = require("jsx-to-md/jsx-runtime");
const jsx_to_md_1 = require("jsx-to-md");
const utils_1 = require("../utils");
function getColumns() {
    return [
        {
            title: tr('文件名'),
            fieldName: 'filename',
        },
        {
            title: tr('说明'),
            fieldName: 'description',
        },
    ];
}
function OutputLog(props) {
    (0, utils_1.initI18n)(props);
    const data = [
        {
            filename: 'filepaths.json',
            description: tr('匹配到的文件路径列表'),
        },
        {
            filename: 'texts-error.json',
            description: ((0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [tr('提取到所有不符合要求的{0}', (0, utils_1.getTranslationText)()), (0, jsx_runtime_1.jsx)("br", {}), (0, jsx_runtime_1.jsx)("br", {}), "\uD83D\uDCE2\uD83D\uDCE2\uD83D\uDCE2\uFF1A", tr('不包含使用变量、{0}语句等场景', ' `JavaScript` ')] })),
        },
        {
            filename: 'texts.json',
            description: tr('提取到所有符合要求的{0}', (0, utils_1.getTranslationText)()),
        },
        {
            filename: 'translate-fail.json',
            description: tr('翻译失败的文案列表'),
        },
        {
            filename: 'translate-error.json',
            description: ((0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [tr('翻译有误的文案列表'), (0, jsx_runtime_1.jsx)("br", {}), (0, jsx_runtime_1.jsx)("br", {}), tr('当前可以识别出{0}翻译后丢失的异常', (0, utils_1.getInterpolationVariable)())] })),
        },
        {
            filename: 'translate-success.json',
            description: ((0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [tr('翻译成功的文案列表'), (0, jsx_runtime_1.jsx)("br", {}), (0, jsx_runtime_1.jsx)("br", {}), "\uD83D\uDCE2\uD83D\uDCE2\uD83D\uDCE2\uFF1A", tr('增量翻译模式下，只会包含本次翻译的文案，原来已翻译过的文案不会包含在其中')] })),
        },
        {
            filename: 'langCode.json',
            description: ((0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [tr('某个目标语言独立的语言包'), (0, jsx_runtime_1.jsx)("br", {}), (0, jsx_runtime_1.jsx)("br", {}), tr('当{0}时，会在日志目录下生成目标语言单个的语言包', " `output.langType == 'single'` ")] })),
        },
        {
            filename: 'langs.json',
            description: ((0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [tr('聚合的语言包'), (0, jsx_runtime_1.jsx)("br", {}), (0, jsx_runtime_1.jsx)("br", {}), tr('当{0}时，会在日志目录下生成聚合的语言包', " `output.langType == 'multiple'` ")] })),
        },
    ];
    return ((0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [(0, jsx_runtime_1.jsx)(jsx_to_md_1.H1, { skip: true, children: tr('翻译日志') }), (0, jsx_runtime_1.jsx)(jsx_to_md_1.TableOfContents, { text: tr('目录'), open: false }), tr('为了方便追踪与定位问题，整个翻译过程中会有一些必要的日志输出，翻译命令执行完全后会在{0}目录下生成一个{1}的日志目录，所有的日志是以独立文件的形式呈现，包含日志类型如下', ' `output.path` ', ' `.log` '), "\uFF1A", (0, jsx_runtime_1.jsx)(jsx_to_md_1.Table, { columns: getColumns(), data: data })] }));
}
exports.default = OutputLog;
