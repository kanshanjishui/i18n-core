"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const jsx_runtime_1 = require("jsx-to-md/jsx-runtime");
const jsx_to_md_1 = require("jsx-to-md");
function LiveDemo() {
    const localeSuffixMap = {
        zh: 'zh-CN',
        en: '',
    };
    const suffix = localeSuffixMap[global.docLocale];
    const filename = `README${suffix ? `_${suffix}` : ''}.md`;
    return ((0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [(0, jsx_runtime_1.jsx)(jsx_to_md_1.H1, { children: "Live Demo" }), (0, jsx_runtime_1.jsxs)(jsx_to_md_1.UnorderedList, { children: [(0, jsx_runtime_1.jsx)(jsx_to_md_1.ListItem, { children: (0, jsx_runtime_1.jsx)(jsx_to_md_1.Link, { href: `https://codesandbox.io/p/github/i18n-pro/core-demo/main?file=${filename}`, children: "Open in CodeSandbox" }) }), (0, jsx_runtime_1.jsx)(jsx_to_md_1.ListItem, { children: (0, jsx_runtime_1.jsx)(jsx_to_md_1.Link, { href: `https://stackblitz.com/github/i18n-pro/core-demo?file=${filename}`, children: (0, jsx_runtime_1.jsx)(jsx_to_md_1.Image, { alt: "Open in StackBlitz", title: "Open in StackBlitz", src: "https://developer.stackblitz.com/img/open_in_stackblitz_small.svg" }) }) })] })] }));
}
exports.default = LiveDemo;
