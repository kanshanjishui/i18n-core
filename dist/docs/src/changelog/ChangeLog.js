"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ChangeTypeImpl = void 0;
const jsx_runtime_1 = require("jsx-to-md/jsx-runtime");
const jsx_to_md_1 = require("jsx-to-md");
const ChangeTypeImpl = ({ type }) => ((0, jsx_runtime_1.jsx)(jsx_to_md_1.H4, { children: type }));
exports.ChangeTypeImpl = ChangeTypeImpl;
function ChangeLogDetail(props) {
    const { idPrefix, type, items } = props;
    const titleId = `${idPrefix}-${type}`;
    if (!items)
        return null;
    return ((0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [(0, jsx_runtime_1.jsx)(jsx_to_md_1.H4, { id: titleId, children: type[0].toUpperCase() + type.slice(1) }), (0, jsx_runtime_1.jsx)(jsx_to_md_1.List, { items: items })] }));
}
function Business(props) {
    const typeTextMap = {
        commandLine: tr('命令行工具'),
        api: 'API',
        docs: tr('文档'),
    };
    const { type, version, changeTypeItemsType } = props;
    const title = typeTextMap[type];
    const titleId = `${version}-${title}`;
    if (!changeTypeItemsType)
        return null;
    const changeTypeOrders = [
        'changed',
        'added',
        'fixed',
        'removed',
        'deprecated',
        'security',
    ];
    return ((0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [(0, jsx_runtime_1.jsx)(jsx_to_md_1.H3, { id: titleId, children: title }), changeTypeOrders.map((changeType) => ((0, jsx_runtime_1.jsx)(ChangeLogDetail, { idPrefix: titleId, type: changeType, items: changeTypeItemsType[changeType] })))] }));
}
function ChangeLog(props) {
    const { version, date } = props;
    const businessTypeOrders = ['commandLine', 'api', 'docs'];
    return ((0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [(0, jsx_runtime_1.jsx)(jsx_to_md_1.H2, { children: `[${version}] - ${date}` }), businessTypeOrders.map((businessType) => ((0, jsx_runtime_1.jsx)(Business, { type: businessType, version: version, changeTypeItemsType: props[businessType] })))] }));
}
exports.default = ChangeLog;
