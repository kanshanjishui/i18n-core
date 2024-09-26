"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const node_https_1 = __importDefault(require("node:https"));
const https_proxy_agent_1 = __importDefault(require("https-proxy-agent"));
function fetch(url, options) {
    const { data, proxy, ...restOptions } = options;
    const agent = proxy ? (0, https_proxy_agent_1.default)(proxy) : undefined;
    return new Promise((resolve, reject) => {
        const req = node_https_1.default.request(url, {
            ...restOptions,
            agent,
        }, (reqs) => {
            let res = '';
            reqs.on('data', (d) => {
                res += d;
            });
            reqs.on('end', () => {
                try {
                    const content = JSON.parse(res);
                    resolve(content);
                }
                catch (error) {
                    reject(error);
                }
            });
        });
        req.on('error', (err) => {
            reject(err);
        });
        req.write(data);
        req.end();
    });
}
exports.default = fetch;
