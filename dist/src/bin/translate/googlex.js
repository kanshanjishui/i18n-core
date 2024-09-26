"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.translateByGooglex = exports.proxyObject = exports.translateImpl = exports.setGooglexConfig = void 0;
const google_translate_api_x_1 = __importDefault(require("google-translate-api-x"));
const utils_1 = require("./utils");
const node_fetch_1 = __importDefault(require("node-fetch"));
const config = {
    from: '',
    to: [],
};
const ERROR_CODE_TIP_MAP = {};
const EXIT_ERROR_CODES = Object.keys(ERROR_CODE_TIP_MAP);
function setGooglexConfig(configProp) {
    Object.entries(configProp).forEach(([key, value]) => {
        config[key] = value;
    });
}
exports.setGooglexConfig = setGooglexConfig;
async function translateImpl(props) {
    const { texts, from, to, proxy } = props;
    let agent = null;
    global.fetch = node_fetch_1.default;
    if (proxy) {
        const createHttpsProxyAgent = require('https-proxy-agent');
        agent = createHttpsProxyAgent(proxy);
    }
    return (0, google_translate_api_x_1.default)(texts, {
        from,
        to,
        requestOptions: {
            agent,
        },
    });
}
exports.translateImpl = translateImpl;
exports.proxyObject = {
    translate: translateImpl,
};
async function translateByGooglex(props) {
    const { texts, from, to } = props;
    const TRANSLATOR_NAME = (0, utils_1.getTranslatorName)('googlex');
    const success = {};
    const error = {};
    const textErrorMsg = {};
    let errorCode;
    try {
        console.log(t('翻译中...'));
        const res = await exports.proxyObject.translate({
            ...props,
            proxy: config.proxy,
        });
        const srcDistMap = res.reduce?.((res, item, index) => {
            res[texts[index]] = item.text;
            return res;
        }, {});
        (0, utils_1.collectRes)({
            from,
            to,
            texts,
            srcDistMap,
            success,
            error,
            textErrorMsg,
            translatorName: TRANSLATOR_NAME,
        });
    }
    catch (e) {
        (0, utils_1.handleTranslateFail)(e, errorCode, EXIT_ERROR_CODES, texts, error);
    }
    return {
        success,
        error,
        textErrorMsg,
    };
}
exports.translateByGooglex = translateByGooglex;
