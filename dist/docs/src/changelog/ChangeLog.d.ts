import { List } from 'jsx-to-md';
type Items = Parameters<typeof List>[0]['items'];
type BusinessType = 'commandLine' | 'api' | 'docs';
type ChangeType = 'added' | 'changed' | 'deprecated' | 'removed' | 'fixed' | 'security';
export declare const ChangeTypeImpl: ({ type }: {
    type: ChangeType;
}) => any;
export type ChangeTypeItemsType = Partial<Record<ChangeType, Items>>;
export type BusinessRecordType = Record<BusinessType, ChangeTypeItemsType>;
export interface ChangeLogProps extends Partial<BusinessRecordType> {
    version: string;
    date: string;
}
export default function ChangeLog(props: ChangeLogProps): any;
export {};
