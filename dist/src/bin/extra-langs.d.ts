import { Config, TranslatorConfig } from '../type';
export default function extraLangs(props: Pick<Config['output'], 'langType' | 'path'> & Pick<TranslatorConfig, 'to' | 'codeLocaleMap'>): Partial<Record<string, Record<string, string>>>;
