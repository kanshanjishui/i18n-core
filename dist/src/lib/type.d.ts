import { Langs } from '../type';
export { Langs } from '../type';
type BaseFormatProps<T> = {
    locale: string;
    payload: number | string | unknown | T;
    t: Translate;
};
type DateFormatProps<T> = BaseFormatProps<T> & {
    payload: BaseFormatProps<T>['payload'] | Date;
};
export type I18nState = {
    namespace: string;
    locale?: string;
    langs?: Langs;
    beginIndex?: number;
    formatNumber?: <T>(props: BaseFormatProps<T>) => string | number;
    formatCurrency?: <T>(props: BaseFormatProps<T>) => string | number;
    formatDate?: <T>(props: DateFormatProps<T>) => string;
    formatTime?: <T>(props: DateFormatProps<T>) => string;
    formatPlural?: <T>(props: BaseFormatProps<T> & {
        keyword: string;
        text: string;
    }) => string;
};
export type SetI18n = (stateProp: Pick<I18nState, 'locale' | 'langs'>) => I18nState;
export type Translate = (text: string, ...args: Array<string | number | unknown>) => string;
export type WithI18n = (props: {
    locale: string;
}) => {
    t: Translate;
};
