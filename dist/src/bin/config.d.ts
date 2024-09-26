import type { Config } from '../type';
export declare function initConfig(pathProp?: string): void;
export declare function readConfig(props?: {
    path: string;
    isFile?: boolean;
}): Config;
