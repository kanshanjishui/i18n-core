"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.translateByBaidu = exports.setBaiduConfig = void 0;
const node_url_1 = require("node:url");
const constants_1 = require("../constants");
const fetch_1 = __importDefault(require("../fetch"));
const utils_1 = require("./utils");
const config = {
    appid: '',
    key: '',
    from: '',
    to: [],
    delay: 0,
};
const ERROR_CODE_TIP_MAP = {
    52003: t('appid 配置不正确'),
    54001: t('key 配置不正确'),
    54003: t('多个人同时使用了同一个APPID的执行翻译，建议注册个人账号来使用或者调整配置项{0}(具体可参考配置项文档说明)', 'baiduConfig.delay'),
};
const EXIT_ERROR_CODES = ['52003', '54001'];
function setBaiduConfig(configProp) {
    Object.entries(configProp).forEach(([key, value]) => {
        config[key] = value;
    });
}
exports.setBaiduConfig = setBaiduConfig;
async function translateByBaidu(props) {
    const { texts, from, to } = props;
    const { appid, key } = config;
    const TRANSLATOR_NAME = (0, utils_1.getTranslatorName)('baidu');
    const translateText = texts.join(constants_1.SEPARATOR_STR);
    const success = {};
    const error = {};
    const textErrorMsg = {};
    const q = translateText;
    const salt = Date.now();
    const sign = (0, utils_1.md5)(`${appid}${q}${salt}${key}`);
    const body = {
        q,
        from: from,
        to: to,
        appid,
        salt,
        sign,
    };
    let errorCode;
    try {
        const res = await (0, fetch_1.default)('https://api.fanyi.baidu.com/api/trans/vip/translate', {
            method: 'POST',
            data: new node_url_1.URLSearchParams(body).toString(),
            headers: {
                'content-type': 'application/x-www-form-urlencoded',
            },
        });
        errorCode = res.error_code;
        if (errorCode) {
            (0, utils_1.throwErrorByErrorCode)(errorCode, ERROR_CODE_TIP_MAP, TRANSLATOR_NAME, 'http://api.fanyi.baidu.com/doc/21', res.error_msg);
        }
        const srcDistMap = res?.trans_result?.reduce?.((res, item) => {
            const { src, dst } = item;
            res[src] = dst;
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
exports.translateByBaidu = translateByBaidu;
