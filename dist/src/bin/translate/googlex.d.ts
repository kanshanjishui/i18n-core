import { googleTranslateApi } from 'google-translate-api-x';
import { BasicGooglexConfig } from '../../type';
declare const config: BasicGooglexConfig;
export declare function setGooglexConfig(configProp: typeof config): void;
export declare function translateImpl(props: Pick<typeof config, 'from' | 'proxy'> & {
    texts: string[];
    to: string;
}): Promise<googleTranslateApi.TranslationResponse[]>;
export declare const proxyObject: {
    translate: typeof translateImpl;
};
export declare function translateByGooglex(props: {
    texts: string[];
    from: string;
    to: string;
}): Promise<{
    success: Record<string, string>;
    error: Record<string, string>;
    textErrorMsg: Record<string, string[]>;
}>;
export {};
