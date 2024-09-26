import { Translator } from 'src/type';
export declare function md5(str: string): string;
export declare function sha256(str: string): string;
export declare function getURLStringFromObj(obj: Record<string, unknown>): string;
export declare function throwErrorByErrorCode(errorCode: string, errorCodeTipMap: Record<string | number, string>, translatorName: string, docUrl: string, errorMsg?: string): void;
export declare function collectRes(props: {
    from: string;
    to: string;
    texts: string[];
    srcDistMap: Record<string, string>;
    success: Record<string, string>;
    error: Record<string, string>;
    textErrorMsg: Record<string, string[]>;
    translatorName: string;
}): void;
export declare function handleTranslateFail(e: any, errorCode: string, exitCodes: Array<string | number>, texts: string[], error: Record<string, string>): void;
export declare function getTranslatorName(translator: Translator): string;
