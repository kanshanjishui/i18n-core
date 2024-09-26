export declare const logSuccess: any;
export declare const logError: any;
export declare const logWarning: any;
export declare function writeFilesSync(props: {
    filepath: string;
    fileContent: string[] | object;
    showName: string;
    indentSize: number;
}): void;
export declare function getLocale(args: string[]): string;
export declare function fixErrorTranslateText(text: string): string;
export declare function getParamsNotEqualMsgs(src: string, dist: string): any[];
export declare function transferArgsToObj(args: string[]): Record<string, string | boolean>;
export declare function getTransResultLength(record: Record<string, Record<string, string>>): number;
