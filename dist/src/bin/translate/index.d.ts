import { InnerConfig, Langs, TranslatorConfig, UnionTranslatorConfig } from '../../type';
export declare function setTranslateConfig(configProp: UnionTranslatorConfig, innerConfigProp?: InnerConfig): void;
export declare function getTranslateConfig(): TranslatorConfig;
export declare function translateTextsToLangsImpl(texts: string[], langsProp: Langs, incrementalMode: boolean): Promise<{
    success: {};
    error: {};
    langs: {};
    textErrorMsg: {};
}>;
