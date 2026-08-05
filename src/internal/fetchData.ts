import NodeCache from 'node-cache';
import { Options } from '../types/common';

/**
 * Fetch JSON from a URL, using the given cache instance keyed by URL.
 */
export function fetchJson(url: string, options: Options, cache: NodeCache): Promise<any> {
    return new Promise((resolve, reject) => {
        const cachedData = cache.get(url);

        if (cachedData !== undefined) {
            resolve(cachedData);
            return;
        }

        const headers = new Headers();
        if (options.userAgent) headers.append('User-Agent', options.userAgent);

        fetch(url, { method: 'GET', headers })
            .then((response) => {
                if (!response.ok) {
                    throw new Error(`Network response was not ok for ${url}`);
                }
                return response.json();
            })
            .then((json) => {
                if (options.cache && options.cache.enabled)
                    cache.set(url, json, options.cache.ttl || 60);
                resolve(json);
            })
            .catch(reject);
    });
}
