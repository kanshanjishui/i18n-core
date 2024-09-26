import { BasicOpenAIConfig } from '../../type';
export declare function setOpenAIConfig(configProp: BasicOpenAIConfig): void;
export declare function translateByOpenAI(props: {
    texts: string[];
    from: string;
    to: string;
    tokens: number;
}): Promise<{
    success: Record<string, string>;
    error: Record<string, string>;
    textErrorMsg: Record<string, string[]>;
}>;
