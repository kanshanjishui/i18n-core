"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const jsx_runtime_1 = require("jsx-to-md/jsx-runtime");
const jsx_to_md_1 = require("jsx-to-md");
const constants_1 = require("../constants");
const utils_1 = require("../utils");
function Vision() {
    return ((0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [(0, jsx_runtime_1.jsx)(jsx_to_md_1.H1, { children: tr('特性') }), (0, jsx_runtime_1.jsx)(jsx_to_md_1.List, { items: [
                    'U',
                    (0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [(0, jsx_runtime_1.jsx)(jsx_to_md_1.Bold, { children: tr('轻量') }), "\uFF1A", (0, jsx_runtime_1.jsx)(jsx_to_md_1.Link, { ...constants_1.linkObj.bundlesize, children: (0, jsx_runtime_1.jsx)(jsx_to_md_1.Image, { ...constants_1.imageObj.bundlesize }) })] }),
                    (0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [(0, jsx_runtime_1.jsx)(jsx_to_md_1.Bold, { children: tr('简单') }), "\uFF1A", tr('学习成本低，易上手')] }),
                    (0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [(0, jsx_runtime_1.jsx)(jsx_to_md_1.Bold, { children: tr('灵活') }), "\uFF1A", tr('支持{0}、以及独特的类型标记和格式化回调（数字、货币、日期、时间、复数）', (0, utils_1.getVariableInterpolation)())] }),
                    [
                        (0, jsx_to_md_1.render)((0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [(0, jsx_runtime_1.jsx)(jsx_to_md_1.Bold, { children: tr('自动翻译') }), "\uFF1A", tr('一个命令即可自动提取文案并翻译生成语言包')] })),
                        [
                            'U',
                            (0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [(0, jsx_runtime_1.jsx)(jsx_to_md_1.Bold, { children: tr('支持增量翻译模式') }), "\uFF1A", tr('只翻译新增文案，智能移除未使用文案')] }),
                            (0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [(0, jsx_runtime_1.jsx)(jsx_to_md_1.Bold, { children: tr('支持多翻译平台') }), "\uFF1A", `${tr('谷歌X')}、${tr('OpenAI')}、${tr('谷歌')}、${tr('微软')}、${tr('腾讯')}、${tr('阿里云')}、${tr('有道')}、${tr('百度')}`, "\uFF08", tr('除{0}外，其他平台需自行注册账号', tr('谷歌X')), "\uFF09"] }),
                            (0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [(0, jsx_runtime_1.jsx)(jsx_to_md_1.Bold, { children: tr('支持多种翻译日志') }), "\uFF1A", tr('多种类型翻译日志的输出，便于追踪与定位翻译问题')] }),
                        ],
                    ],
                    (0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [(0, jsx_runtime_1.jsx)(jsx_to_md_1.Bold, { children: "keyless" }), "\uFF1A", tr('无需手动定义key，{0}即key', (0, utils_1.getTranslationText)())] }),
                ] })] }));
}
exports.default = Vision;
