import type { RequestOptions } from 'node:http';
import { HttpsProxyAgentOptions } from '../type';
export default function fetch(url: string, options: {
    data: Record<string, unknown> | unknown;
    proxy?: HttpsProxyAgentOptions;
} & RequestOptions): Promise<unknown>;
