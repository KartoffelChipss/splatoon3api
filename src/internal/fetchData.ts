import { CacheStore, Options } from '../types/common';

/**
 * Fetch JSON from a URL, using the given cache store keyed by URL.
 */
export async function fetchJson(
    url: string,
    options: Options,
    cache: CacheStore,
): Promise<any> {
    const cachedData = await cache.get(url);
    if (cachedData !== undefined) {
        return cachedData;
    }

    const headers = new Headers();
    if (options.userAgent) headers.append('User-Agent', options.userAgent);

    const response = await fetch(url, { method: 'GET', headers });
    if (!response.ok) {
        throw new Error(`Network response was not ok for ${url}`);
    }
    const json = await response.json();

    if (options.cache && options.cache.enabled) {
        await cache.set(url, json, options.cache.ttl || 60);
    }

    return json;
}
