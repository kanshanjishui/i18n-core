"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fs = require('fs');
const path = require('path');
function requireJsonFile(dirpath, filename) {
    let res = {};
    try {
        const filePath = path.join(dirpath, `${filename}.json`);
        const stat = fs.statSync(filePath);
        if (stat.isFile()) {
            res = require(filePath);
        }
    }
    catch (error) { }
    return res;
}
function extraLangs(props) {
    let langs = {};
    const { langType, path: dirpath, to, codeLocaleMap = {} } = props;
    if (langType === 'single') {
        langs = requireJsonFile(dirpath, 'langs');
    }
    else {
        to.forEach((langCode) => {
            const locale = codeLocaleMap[langCode] || langCode;
            const lang = requireJsonFile(dirpath, locale);
            if (Object.keys(lang).length > 0) {
                langs[locale] = lang;
            }
        });
    }
    return langs;
}
exports.default = extraLangs;
