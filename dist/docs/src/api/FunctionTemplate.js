"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const jsx_runtime_1 = require("jsx-to-md/jsx-runtime");
const jsx_to_md_1 = require("jsx-to-md");
function TypeCode(props) {
    const { content } = props;
    return (0, jsx_runtime_1.jsx)("pre", { children: content });
}
function FunctionTemplate(props) {
    const { name, description, type, props: propsProp, returns } = props;
    const typeText = tr('类型');
    const propsText = tr('参数说明');
    const getId = (title) => `${name}-${title}`;
    return ((0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [(0, jsx_runtime_1.jsx)(jsx_to_md_1.H3, { children: name }), description, (0, jsx_runtime_1.jsx)(jsx_to_md_1.H4, { id: getId(typeText), children: typeText }), (0, jsx_runtime_1.jsx)(TypeCode, { content: type }), (0, jsx_runtime_1.jsx)(jsx_to_md_1.Break, {}), (0, jsx_runtime_1.jsx)(jsx_to_md_1.H4, { id: getId(propsText), children: propsText }), (0, jsx_runtime_1.jsxs)("table", { children: [(0, jsx_runtime_1.jsxs)("tr", { children: [(0, jsx_runtime_1.jsx)("th", { children: tr('参数名') }), (0, jsx_runtime_1.jsx)("th", { children: tr('说明') })] }), (0, jsx_runtime_1.jsx)("tr", { children: Object.entries(propsProp).map(([key, desc]) => {
                            return ((0, jsx_runtime_1.jsxs)("tr", { children: [(0, jsx_runtime_1.jsx)("td", { children: key }), (0, jsx_runtime_1.jsx)("td", { children: desc })] }));
                        }) })] }), (0, jsx_runtime_1.jsx)(jsx_to_md_1.Break, {}), returns && ((0, jsx_runtime_1.jsx)(jsx_runtime_1.Fragment, { children: (0, jsx_runtime_1.jsx)(jsx_to_md_1.H4, { children: tr('返回值') }) }))] }));
}
exports.default = FunctionTemplate;
