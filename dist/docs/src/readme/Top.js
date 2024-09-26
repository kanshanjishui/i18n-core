"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const jsx_runtime_1 = require("jsx-to-md/jsx-runtime");
const jsx_to_md_1 = require("jsx-to-md");
const constants_1 = require("../constants");
const utils_1 = require("../utils");
function Top() {
    const props = {
        align: 'center',
    };
    return ((0, jsx_runtime_1.jsxs)("div", { ...props, children: [(0, jsx_runtime_1.jsx)(jsx_to_md_1.Break, {}), (0, jsx_runtime_1.jsx)(jsx_to_md_1.Link, { ...constants_1.linkObj['github'], children: (0, jsx_runtime_1.jsx)(jsx_to_md_1.Image, { ...constants_1.imageObj['logo'] }) }), (0, jsx_runtime_1.jsx)(jsx_to_md_1.Break, {}), (0, utils_1.renderLanguage)('README'), (0, jsx_runtime_1.jsx)("p", { style: { fontSize: 18 }, children: tr('适用于 JavaScript 的轻量、简单、灵活、自动翻译的国际化工具') }), (0, jsx_runtime_1.jsx)(jsx_to_md_1.Break, {}), (0, jsx_runtime_1.jsx)(jsx_to_md_1.Break, {}), (0, jsx_runtime_1.jsx)(jsx_to_md_1.Link, { ...constants_1.linkObj['npm'], children: (0, jsx_runtime_1.jsx)(jsx_to_md_1.Image, { ...constants_1.imageObj['npm-version'] }) }), (0, jsx_runtime_1.jsx)(jsx_to_md_1.Break, {}), (0, jsx_runtime_1.jsx)(jsx_to_md_1.Link, { ...constants_1.linkObj.npm, children: (0, jsx_runtime_1.jsx)(jsx_to_md_1.Image, { ...constants_1.imageObj['npm-download'] }) }), (0, jsx_runtime_1.jsx)(jsx_to_md_1.Break, {}), (0, jsx_runtime_1.jsx)(jsx_to_md_1.Break, {}), (0, jsx_runtime_1.jsx)(jsx_to_md_1.Link, { ...constants_1.linkObj['github-stars'], children: (0, jsx_runtime_1.jsx)(jsx_to_md_1.Image, { ...constants_1.imageObj['github-stars'] }) }), (0, jsx_runtime_1.jsx)(jsx_to_md_1.Break, {}), (0, jsx_runtime_1.jsx)(jsx_to_md_1.Link, { ...constants_1.linkObj['last-commit'], children: (0, jsx_runtime_1.jsx)(jsx_to_md_1.Image, { ...constants_1.imageObj['last-commit'] }) }), (0, jsx_runtime_1.jsx)(jsx_to_md_1.Break, {}), (0, jsx_runtime_1.jsx)(jsx_to_md_1.Link, { ...constants_1.linkObj['github-issues'], children: (0, jsx_runtime_1.jsx)(jsx_to_md_1.Image, { ...constants_1.imageObj['github-issues'] }) }), (0, jsx_runtime_1.jsx)(jsx_to_md_1.Break, {}), (0, jsx_runtime_1.jsx)(jsx_to_md_1.Link, { ...constants_1.linkObj.codecov, children: (0, jsx_runtime_1.jsx)(jsx_to_md_1.Image, { ...constants_1.imageObj.codecov }) }), (0, jsx_runtime_1.jsx)(jsx_to_md_1.Break, {}), (0, jsx_runtime_1.jsx)(jsx_to_md_1.Break, {}), (0, jsx_runtime_1.jsx)(jsx_to_md_1.Image, { alt: "demo", src: "https://s3.bmp.ovh/imgs/2023/06/06/c3261b545825fc71.gif" }), (0, jsx_runtime_1.jsx)(jsx_to_md_1.Break, {})] }));
}
exports.default = Top;
