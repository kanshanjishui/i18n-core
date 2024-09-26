"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.tagFormatterNameMap = exports.invalidPluralFormatterRegex = exports.pluralFormatterRegex = exports.commonFormatterRegex = void 0;
exports.commonFormatterRegex = /(\{([ncdt])number\})/;
exports.pluralFormatterRegex = /(\{(p)number([^}]+)\})/;
exports.invalidPluralFormatterRegex = /(\{(p)number\})/;
exports.tagFormatterNameMap = {
    n: 'formatNumber',
    c: 'formatCurrency',
    d: 'formatDate',
    t: 'formatTime',
    p: 'formatPlural',
};
