import { BasicBaiduConfig } from '../../type';
export declare function setBaiduConfig(configProp: BasicBaiduConfig): void;
export declare function translateByBaidu(props: {
    texts: string[];
    from: string;
    to: string;
}): Promise<{
    success: Record<string, string>;
    error: Record<string, string>;
    textErrorMsg: Record<string, string[]>;
}>;
