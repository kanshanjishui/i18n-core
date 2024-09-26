import { BasicYoudaoConfig } from '../../type';
declare const config: BasicYoudaoConfig;
export declare function setYoudaoConfig(configProp: typeof config): void;
export declare function translateByYoudao(props: {
    texts: string[];
    from: string;
    to: string;
}): Promise<{
    success: Record<string, string>;
    error: Record<string, string>;
    textErrorMsg: Record<string, string[]>;
}>;
export {};
