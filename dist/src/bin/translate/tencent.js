"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.translateByTencent = exports.sha256 = exports.setTencentConfig = void 0;
const node_crypto_1 = require("node:crypto");
const fetch_1 = __importDefault(require("../fetch"));
const utils_1 = require("./utils");
const config = {
    secretId: '',
    secretKey: '',
    projectId: undefined,
    region: '',
    from: '',
    to: [],
};
const ERROR_CODE_TIP_MAP = {
    'AuthFailure.SignatureFailure': t('secretId 或者 secretKey 配置不正确'),
};
const EXIT_ERROR_CODES = [
    'AuthFailure.SignatureFailure',
    'InternalError',
    'InvalidParameter',
    'MissingParameter',
    'InvalidParameterValue',
];
function setTencentConfig(configProp) {
    Object.entries(configProp).forEach(([key, value]) => {
        config[key] = value;
    });
}
exports.setTencentConfig = setTencentConfig;
function sha256(message, secret = '', encoding) {
    const hmac = (0, node_crypto_1.createHmac)('sha256', secret);
    return hmac.update(message).digest(encoding);
}
exports.sha256 = sha256;
function getUTCDate(date) {
    const year = date.getUTCFullYear();
    const month = ('0' + (date.getUTCMonth() + 1)).slice(-2);
    const day = ('0' + date.getUTCDate()).slice(-2);
    return `${year}-${month}-${day}`;
}
function getRequestInfo(props) {
    const { payload: payloadProp, secretId, secretKey, region, language } = props;
    const SECRET_ID = secretId;
    const SECRET_KEY = secretKey;
    const action = 'TextTranslateBatch';
    const version = '2018-03-21';
    const endpoint = 'tmt.tencentcloudapi.com';
    const service = 'tmt';
    const dateObj = new Date();
    const timestamp = Math.round(dateObj.getTime() / 1000);
    const date = getUTCDate(dateObj);
    const signedHeaders = 'content-type;host';
    const payload = JSON.stringify(payloadProp);
    const hashedRequestPayload = (0, utils_1.sha256)(payload);
    const httpRequestMethod = 'POST';
    const canonicalUri = '/';
    const canonicalQueryString = '';
    const canonicalHeaders = 'content-type:application/json; charset=utf-8\n' + 'host:' + endpoint + '\n';
    const canonicalRequest = httpRequestMethod +
        '\n' +
        canonicalUri +
        '\n' +
        canonicalQueryString +
        '\n' +
        canonicalHeaders +
        '\n' +
        signedHeaders +
        '\n' +
        hashedRequestPayload;
    const algorithm = 'TC3-HMAC-SHA256';
    const hashedCanonicalRequest = (0, utils_1.sha256)(canonicalRequest);
    const credentialScope = date + '/' + service + '/' + 'tc3_request';
    const stringToSign = algorithm +
        '\n' +
        timestamp +
        '\n' +
        credentialScope +
        '\n' +
        hashedCanonicalRequest;
    const kDate = sha256(date, 'TC3' + SECRET_KEY);
    const kService = sha256(service, kDate);
    const kSigning = sha256('tc3_request', kService);
    const signature = sha256(stringToSign, kSigning, 'hex');
    const authorization = algorithm +
        ' ' +
        'Credential=' +
        SECRET_ID +
        '/' +
        credentialScope +
        ', ' +
        'SignedHeaders=' +
        signedHeaders +
        ', ' +
        'Signature=' +
        signature;
    return {
        payload,
        host: endpoint,
        headers: {
            Authorization: authorization,
            'content-type': 'application/json; charset=utf-8',
            Host: endpoint,
            'X-TC-Action': action,
            'X-TC-Version': version,
            'X-TC-Timestamp': timestamp,
            'X-TC-Region': region,
            'X-TC-Language': language,
        },
    };
}
async function translateByTencent(props) {
    const { texts, from, to } = props;
    const { secretId, secretKey, projectId = 0, region, language = 'zh-CN', } = config;
    const TRANSLATOR_NAME = (0, utils_1.getTranslatorName)('tencent');
    const success = {};
    const error = {};
    const textErrorMsg = {};
    const { payload, host, headers } = getRequestInfo({
        payload: {
            SourceTextList: texts,
            Source: from,
            Target: to,
            ProjectId: projectId,
        },
        secretId,
        secretKey,
        region,
        language,
    });
    let errorCode;
    try {
        const res = await (0, fetch_1.default)(`https://${host}`, {
            method: 'POST',
            data: payload,
            headers,
        });
        errorCode = res?.Response?.Error?.Code;
        if (errorCode) {
            (0, utils_1.throwErrorByErrorCode)(errorCode, ERROR_CODE_TIP_MAP, TRANSLATOR_NAME, 'https://cloud.tencent.com/document/api/551/40566#6.-.E9.94.99.E8.AF.AF.E7.A0.81', res?.Response?.Error?.Message);
        }
        const srcDistMap = res?.Response?.TargetTextList?.reduce?.((res, item, index) => {
            res[texts[index]] = item;
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
exports.translateByTencent = translateByTencent;
