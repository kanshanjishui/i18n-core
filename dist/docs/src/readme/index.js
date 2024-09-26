"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsx_runtime_1 = require("jsx-to-md/jsx-runtime");
const utils_1 = require("../utils");
const jsx_to_md_1 = require("jsx-to-md");
const Top_1 = __importDefault(require("./Top"));
const Vision_1 = __importDefault(require("./Vision"));
const Feature_1 = __importDefault(require("./Feature"));
const LiveDemo_1 = __importDefault(require("./LiveDemo"));
const Principle_1 = __importDefault(require("./Principle"));
const HelpDoc_1 = __importDefault(require("./HelpDoc"));
const License_1 = __importDefault(require("./License"));
function Doc(props) {
    (0, utils_1.initI18n)(props);
    return ((0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [(0, jsx_runtime_1.jsx)(Top_1.default, {}), (0, jsx_runtime_1.jsx)(jsx_to_md_1.TableOfContents, { text: tr('目录'), open: false }), (0, jsx_runtime_1.jsx)(Vision_1.default, {}), (0, jsx_runtime_1.jsx)(Feature_1.default, {}), (0, jsx_runtime_1.jsx)(LiveDemo_1.default, {}), (0, jsx_runtime_1.jsx)(Principle_1.default, {}), (0, jsx_runtime_1.jsx)(HelpDoc_1.default, {}), (0, jsx_runtime_1.jsx)(License_1.default, {})] }));
}
exports.default = Doc;
