"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.initI18n = void 0;
const utils_1 = require("./utils");
let state = {};
function getCurrentState(namespace) {
    return state[namespace] || {};
}
function setI18n(namespace, stateProp) {
    const currentState = getCurrentState(namespace);
    const newState = Object.entries(stateProp || {}).reduce((res, [key, value]) => {
        switch (key) {
            case 'langs':
                {
                    const currentLangs = currentState['langs'] || {};
                    const mergeLangs = Object.entries(value).reduce((res, [langCode, lang]) => {
                        res[langCode] = {
                            ...(currentLangs[langCode] || {}),
                            ...lang,
                        };
                        return res;
                    }, {});
                    res[key] = {
                        ...currentLangs,
                        ...mergeLangs,
                    };
                }
                break;
            default:
                res[key] = value;
                break;
        }
        return res;
    }, {});
    const newCurrentState = {
        ...currentState,
        ...newState,
    };
    state = {
        ...state,
        [namespace]: newCurrentState,
    };
    return newCurrentState;
}
function translate(namespace, text, ...args) {
    return (0, utils_1.translateImpl)(getCurrentState(namespace), text, ...args);
}
function withI18n(namespace, props) {
    const { locale } = props;
    return {
        t: utils_1.translateImpl.bind(null, {
            ...getCurrentState(namespace),
            locale,
        }),
    };
}
function initI18n(stateProp) {
    const { namespace = 'default' } = stateProp;
    if (typeof stateProp.namespace == 'undefined') {
        console.warn('No namespace is set, and using with other libraries can cause bugs');
    }
    if (typeof state[namespace] != 'undefined') {
        console.error(`A configuration with the same namespace '${namespace}' already exists, so you may need to redefine one`);
    }
    if (stateProp?.beginIndex && typeof stateProp.beginIndex !== 'number') {
        console.error('beginIndex must be a number');
        delete stateProp.beginIndex;
    }
    state = {
        ...state,
        [namespace]: {
            ...(stateProp || {}),
        },
    };
    return {
        setI18n: setI18n.bind(null, namespace),
        t: translate.bind(null, namespace),
        withI18n: withI18n.bind(null, namespace),
    };
}
exports.initI18n = initI18n;
