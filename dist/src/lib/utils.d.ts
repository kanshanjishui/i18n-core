import { I18nState } from './type';
export declare function getTargetRegExp(regExp: RegExp, index: number): RegExp;
export declare function getTextFromFormatter(props: {
    type: 'normal' | 'plural';
    originText: string;
    matchTagRes: string[];
    index: number;
    arg: unknown;
    text: string;
    state: I18nState;
}): string;
export declare function translateImpl(i18nState: I18nState, text: any, ...args: Array<string | number | unknown>): any;
