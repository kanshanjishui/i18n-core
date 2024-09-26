import { BasicGoogleConfig } from '../../type';
declare const config: BasicGoogleConfig;
export declare function setGoogleConfig(configProp: typeof config): void;
export declare const translationClientForTest: any;
export declare function translateByGoogle(props: {
    texts: string[];
    from: string;
    to: string;
}): Promise<{
    success: Record<string, string>;
    error: Record<string, string>;
    textErrorMsg: Record<string, string[]>;
}>;
export {};
