import type { BasicAliyunConfig } from '../../type';
declare const config: BasicAliyunConfig;
export declare function setAliyunConfig(configProp: typeof config): void;
export declare const mockClientUtil: {
    getClient(): Client;
    setClient(clientProp: Client): void;
};
export declare function translateByAliyun(props: {
    texts: string[];
    from: string;
    to: string;
}): Promise<{
    success: Record<string, string>;
    error: Record<string, string>;
    textErrorMsg: Record<string, string[]>;
}>;
export {};
