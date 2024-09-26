import { BinaryToTextEncoding } from 'node:crypto';
import { BasicTencentConfig } from '../../type';
declare const config: BasicTencentConfig;
export declare function setTencentConfig(configProp: typeof config): void;
export declare function sha256(message: any, secret?: string, encoding?: BinaryToTextEncoding): any;
export declare function translateByTencent(props: {
    texts: string[];
    from: string;
    to: string;
}): Promise<{
    success: Record<string, string>;
    error: Record<string, string>;
    textErrorMsg: Record<string, string[]>;
}>;
export {};
