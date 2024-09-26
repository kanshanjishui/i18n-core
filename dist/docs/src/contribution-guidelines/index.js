"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const jsx_runtime_1 = require("jsx-to-md/jsx-runtime");
const jsx_to_md_1 = require("jsx-to-md");
const utils_1 = require("../utils");
function OutputLog(props) {
    (0, utils_1.initI18n)(props);
    return ((0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [(0, jsx_runtime_1.jsx)(jsx_to_md_1.H1, { skip: true, children: tr('贡献指南') }), tr('首先，对各位想要参与到本项目来表示热烈欢迎{0}', '👏🏻👏🏻👏🏻'), (0, jsx_runtime_1.jsx)(jsx_to_md_1.Break, {}), (0, jsx_runtime_1.jsx)(jsx_to_md_1.Break, {}), tr('但是抱歉的是，当前文档还在规划完善中...（也许你可以从该文档开始，写文档绝不是一件容易的事😂）'), (0, jsx_runtime_1.jsx)(jsx_to_md_1.Break, {}), (0, jsx_runtime_1.jsx)(jsx_to_md_1.Break, {}), tr('最后，请不要丢失你的热情，请持续保持关注！')] }));
}
exports.default = OutputLog;
