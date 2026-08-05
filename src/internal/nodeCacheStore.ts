import NodeCache from 'node-cache';
import { CacheStore } from '../types/common';

/**
 * Default `CacheStore`, an in-memory cache scoped to a single `Client` instance.
 */
export class NodeCacheStore implements CacheStore {
    private readonly cache = new NodeCache();

    async get(key: string): Promise<unknown | undefined> {
        return this.cache.get(key);
    }

    async set(key: string, value: unknown, ttlSeconds?: number): Promise<void> {
        if (ttlSeconds !== undefined) {
            this.cache.set(key, value, ttlSeconds);
        } else {
            this.cache.set(key, value);
        }
    }
}
