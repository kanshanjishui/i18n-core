"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const jsx_runtime_1 = require("jsx-to-md/jsx-runtime");
const jsx_to_md_1 = require("jsx-to-md");
const utils_1 = require("../utils");
function DocLink() {
    return ((0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [(0, jsx_runtime_1.jsx)(jsx_to_md_1.H1, { children: tr('帮助文档') }), (0, jsx_runtime_1.jsx)(jsx_to_md_1.List, { items: [
                    'U',
                    (0, jsx_runtime_1.jsx)(jsx_to_md_1.Link, { href: (0, utils_1.getDocHref)('USAGE'), children: tr('快速上手') }),
                    (0, jsx_runtime_1.jsx)(jsx_to_md_1.Link, { href: (0, utils_1.getDocHref)('COMMAND_LINE'), children: tr('命令行') }),
                    (0, jsx_runtime_1.jsx)(jsx_to_md_1.Link, { href: (0, utils_1.getDocHref)('API'), children: tr('API') }),
                    (0, jsx_runtime_1.jsx)(jsx_to_md_1.Link, { href: (0, utils_1.getDocHref)('MATCH_RULE'), children: tr('匹配规则') }),
                    (0, jsx_runtime_1.jsx)(jsx_to_md_1.Link, { href: (0, utils_1.getDocHref)('OUTPUT_LOG'), children: tr('翻译日志') }),
                    (0, jsx_runtime_1.jsx)(jsx_to_md_1.Link, { href: (0, utils_1.getDocHref)('Q&A'), children: "Q&A" }),
                    (0, jsx_runtime_1.jsx)(jsx_to_md_1.Link, { href: (0, utils_1.getDocHref)('CONTRIBUTION_GUIDELINES'), children: tr('贡献指南') }),
                    (0, jsx_runtime_1.jsx)(jsx_to_md_1.Link, { href: (0, utils_1.getDocHref)('CHANGELOG'), children: tr('更新日志') }),
                ] })] }));
}
exports.default = DocLink;
