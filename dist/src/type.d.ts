import type { HttpsProxyAgentOptions as OriginHttpsProxyAgentOptions } from 'https-proxy-agent';
export type TranslatorConfig = {
    from: string;
    to: string[];
    codeLocaleMap?: Record<string, string>;
    delay?: number;
};
export type Translator = 'baidu' | 'youdao' | 'tencent' | 'aliyun' | 'microsoft' | 'google' | 'googlex' | 'openai';
type BasicConfig = {
    funcName: string;
    entry?: string;
    fileRegExp?: RegExp;
    input?: string | string[];
    output: {
        path: string;
        langType: 'single' | 'multiple';
        indentSize: number;
    };
    translator?: Translator;
    [key: string]: unknown;
};
type DefineTranslatorConfig<T extends Translator, C extends object> = {
    translator: T;
} & Record<`${T}Config`, C>;
export type BasicBaiduConfig = {
    appid: string;
    key: string;
} & TranslatorConfig;
export type BaiduConfig = DefineTranslatorConfig<'baidu', BasicBaiduConfig>;
export type BasicYoudaoConfig = {
    appKey: string;
    key: string;
} & TranslatorConfig;
export type YoudaoConfig = DefineTranslatorConfig<'youdao', BasicYoudaoConfig>;
export type BasicTencentConfig = {
    secretId: string;
    secretKey: string;
    region: string;
    projectId?: string;
    language?: string;
} & TranslatorConfig;
export type TencentConfig = DefineTranslatorConfig<'tencent', BasicTencentConfig>;
export type BasicAliyunConfig = {
    accessKeyId: string;
    accessKeySecret: string;
    scene?: string;
    apiType?: string;
    endpoint?: string;
} & TranslatorConfig;
export type AliyunConfig = DefineTranslatorConfig<'aliyun', BasicAliyunConfig>;
export type BasicMicrosoftConfig = {
    key: string;
    location: string;
} & TranslatorConfig;
export type MicrosoftConfig = DefineTranslatorConfig<'microsoft', BasicMicrosoftConfig>;
export type BasicGoogleConfig = {
    projectId: string;
    location?: string;
} & TranslatorConfig;
export type GoogleConfig = DefineTranslatorConfig<'google', BasicGoogleConfig>;
export type BasicGooglexConfig = {
    proxy?: HttpsProxyAgentOptions;
} & TranslatorConfig;
export type GooglexConfig = Omit<DefineTranslatorConfig<'googlex', BasicGooglexConfig>, 'translator'> & {
    translator?: 'googlex';
};
export type HttpsProxyAgentOptions = OriginHttpsProxyAgentOptions;
export type BasicOpenAIConfig = {
    key: string;
    root: string;
    model?: string;
    proxy?: HttpsProxyAgentOptions;
} & TranslatorConfig;
export type OpenAIConfig = DefineTranslatorConfig<'openai', BasicOpenAIConfig>;
export type UnionBasicTranslatorConfig = BasicBaiduConfig | BasicYoudaoConfig | BasicTencentConfig | BasicAliyunConfig | BasicMicrosoftConfig | BasicGoogleConfig | BasicGooglexConfig | BasicOpenAIConfig;
export type UnionTranslatorConfig = BaiduConfig | YoudaoConfig | TencentConfig | AliyunConfig | MicrosoftConfig | GoogleConfig | GooglexConfig | OpenAIConfig;
export type Config = BasicConfig & UnionTranslatorConfig;
export type Langs = Partial<Record<string, Record<string, string>>>;
export type MaxLengthType = 'allStrLength' | 'strLengthAndArrLength' | 'allStrLengthAndArrLength' | 'allTokenLength';
export type MaxLengthConfig = {
    maxLengthType: MaxLengthType;
    maxLength: number;
    maxArrayLength?: number;
    separator?: string;
};
export type MaxLengthConfigMap = Record<Config['translator'], MaxLengthConfig>;
export type InnerConfig = {
    maxLengthConfig: MaxLengthConfig;
};
export {};
