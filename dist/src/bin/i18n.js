"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.setI18n = exports.t = void 0;
const lib_1 = require("../lib");
const { t: tr, setI18n: _setI18n } = (0, lib_1.initI18n)({
    namespace: 't-pro-bin',
});
exports.t = tr;
exports.setI18n = _setI18n;
