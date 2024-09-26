"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.translateImpl = exports.getTextFromFormatter = exports.getTargetRegExp = void 0;
const constants_1 = require("./constants");
function getTargetRegExp(regExp, index) {
    return new RegExp(regExp.source.replace('number', index + ''), 'i');
}
exports.getTargetRegExp = getTargetRegExp;
function getTextFromFormatter(props) {
    const { type, originText, matchTagRes, arg, text: textProp, state } = props;
    const { locale } = state;
    const [, matchTemplate, f, keyword = ''] = matchTagRes;
    const formatterName = constants_1.tagFormatterNameMap[f?.toLocaleLowerCase()];
    const formatter = state[formatterName];
    let text = textProp;
    if (typeof formatter !== 'function') {
        console.warn(`The dynamic parameter ${matchTemplate} in the translated text ${originText} is not configured with the corresponding format callback ${formatterName}`);
        return text.replace(matchTemplate, `${arg}${keyword}`);
    }
    if (typeof locale === 'undefined') {
        console.warn(`The locale is not currently configured and may affect the logic in the format callback ${formatterName}`);
    }
    try {
        const content = formatter({
            locale,
            payload: arg,
            t: translateImpl.bind(null, state),
            ...(() => {
                let res = {};
                if (type === 'plural') {
                    const newKeyword = keyword?.trim?.();
                    res = {
                        keyword: newKeyword,
                        text: `${arg}${keyword}`,
                    };
                }
                return res;
            })(),
        });
        text = text.replace(matchTemplate, content);
    }
    catch (error) {
        text = text.replace(matchTemplate, `${arg}${keyword}`);
        console.error(`An error occurred in calling the corresponding format callback ${formatterName} for dynamic parameter ${matchTemplate} in translated text ${originText}. The callback logic needs to be checked. The error message is as follows: `, error);
    }
    return text;
}
exports.getTextFromFormatter = getTextFromFormatter;
function translateImpl(i18nState, text, ...args) {
    const { locale, langs, beginIndex = 0 } = i18nState;
    const lang = langs?.[locale];
    let originText = text;
    if (lang && lang[text]) {
        text = lang[text];
        originText = text;
    }
    args.forEach((arg, index) => {
        const currentIndex = beginIndex + index;
        const currentInvalidPluralFormatterRegex = getTargetRegExp(constants_1.invalidPluralFormatterRegex, currentIndex);
        const invalidPluralMatchTagRes = text.match(currentInvalidPluralFormatterRegex);
        if (invalidPluralMatchTagRes) {
            console.warn(`The plural dynamic parameter ${invalidPluralMatchTagRes[1]} in the translated text ${originText} does not contain the text that needs to be plural, for example: t('I have {p0 apple}')`);
            return;
        }
        const currentCommonFormatterRegex = getTargetRegExp(constants_1.commonFormatterRegex, currentIndex);
        const currentPluralFormatterRegex = getTargetRegExp(constants_1.pluralFormatterRegex, currentIndex);
        const commonMatchTagRes = text.match(currentCommonFormatterRegex);
        const pluralMatchTagRes = text.match(currentPluralFormatterRegex);
        if (!commonMatchTagRes && !pluralMatchTagRes) {
            text = text.replace(`{${currentIndex}}`, `${arg}`);
            return;
        }
        text = getTextFromFormatter({
            type: pluralMatchTagRes ? 'plural' : 'normal',
            originText,
            matchTagRes: pluralMatchTagRes || commonMatchTagRes,
            index: currentIndex,
            arg,
            text,
            state: i18nState,
        });
    });
    return text;
}
exports.translateImpl = translateImpl;
