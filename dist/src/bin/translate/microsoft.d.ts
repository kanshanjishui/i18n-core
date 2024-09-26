import { BasicMicrosoftConfig } from '../../type';
declare const config: BasicMicrosoftConfig;
export declare function setMicrosoftConfig(configProp: typeof config): void;
export declare function translateByMicrosoft(props: {
    texts: string[];
    from: string;
    to: string;
}): Promise<{
    success: Record<string, string>;
    error: Record<string, string>;
    textErrorMsg: Record<string, string[]>;
}>;
export {};
