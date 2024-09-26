export declare function initI18n({ locale }: {
    locale: any;
}): void;
export declare function getDocHref(filename: string, anchorProp?: string, localeProp?: string): string;
export declare function getFileContent(filepath: string): any;
export declare function getIssueText(text: string, props?: {
    issue?: number | number[];
    by?: string;
}): string;
export declare function getTranslationText(normal?: boolean): string;
export declare function getVariableInterpolation(normal?: boolean): string;
export declare function getInterpolationVariable(normal?: boolean): string;
export declare function getTypeTagCode(): string;
export declare function renderLanguage(filename: string): any;
