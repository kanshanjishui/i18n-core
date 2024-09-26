import { I18nState, SetI18n, Translate, WithI18n } from './type';
export { Langs, I18nState, SetI18n, Translate, WithI18n } from './type';
export declare function initI18n(stateProp: I18nState): {
    setI18n: SetI18n;
    t: Translate;
    withI18n: WithI18n;
};
