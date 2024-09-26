"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.STYLE_EOF = void 0;
exports.STYLE_EOF = '\u001b[0m';
const basic8Color = [
    'black',
    'red',
    'green',
    'yellow',
    'blue',
    'magenta',
    'cyan',
    'white',
];
const modifier = {
    bold: '\u001b[1m',
    italic: '\u001b[3m',
    underline: '\u001b[4m',
};
const basic8ColorWithBgAndBright = basic8Color.reduce((res, color, index) => {
    const prefix = '\u001b[3' + index;
    const bgPrefix = '\u001b[4' + index;
    const suffix = 'm';
    const brightKey = ';1';
    const baseBg = 'bg' + color.replace(/^(\w)(.+)/, (str, p, s) => p.toUpperCase() + s);
    res.push({
        operateType: color,
        style: `${prefix}${suffix}`,
    }, {
        operateType: color + 'Bright',
        style: `${prefix}${brightKey}${suffix}`,
    }, {
        operateType: baseBg,
        style: `${bgPrefix}${suffix}`,
    }, {
        operateType: baseBg + 'Bright',
        style: `${bgPrefix}${brightKey}${suffix}`,
    });
    return res;
}, []);
const modifierStyle = Object.entries(modifier).reduce((res, [key, value]) => {
    res.push({
        operateType: key,
        style: value,
    });
    return res;
}, []);
const styles = [...basic8ColorWithBgAndBright, ...modifierStyle];
const chalk = function (...res) {
    return res.join(' ');
};
function definedProperties(func, styleProp = '') {
    styles.forEach(({ operateType, style }) => {
        Object.defineProperty(func, operateType, {
            get() {
                return createNewChalk(styleProp + style);
            },
        });
    });
}
function createNewChalk(style) {
    const func = (...res) => {
        return `${style}${res.join(' ')}${exports.STYLE_EOF}`;
    };
    definedProperties(func, style);
    return func;
}
definedProperties(chalk);
exports.default = chalk;
