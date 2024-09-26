export declare const STYLE_EOF = "\u001B[0m";
declare const basic8Color: readonly ["black", "red", "green", "yellow", "blue", "magenta", "cyan", "white"];
declare const modifier: {
    bold: string;
    italic: string;
    underline: string;
};
type UnionType<T extends string, R extends typeof modifier> = T | `${T}Bright` | `bg${Capitalize<T>}` | `bg${Capitalize<T>}Bright` | keyof R;
type OperateType = UnionType<typeof basic8Color[number], typeof modifier>;
interface Chalk extends Record<OperateType, Chalk> {
    (...res: Array<string | number>): string;
}
declare const chalk: Chalk;
export default chalk;
