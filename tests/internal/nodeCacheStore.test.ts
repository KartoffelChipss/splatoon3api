import { NodeCacheStore } from '../../src/internal/nodeCacheStore';

describe('NodeCacheStore', () => {
    it('returns undefined for a key that was never set', async () => {
        const store = new NodeCacheStore();
        expect(await store.get('missing')).toBeUndefined();
    });

    it('round-trips a value through set/get', async () => {
        const store = new NodeCacheStore();
        await store.set('key', { hello: 'world' });
        expect(await store.get('key')).toEqual({ hello: 'world' });
    });

    it('keeps separate instances isolated from each other', async () => {
        const storeA = new NodeCacheStore();
        const storeB = new NodeCacheStore();

        await storeA.set('key', 'a');
        await storeB.set('key', 'b');

        expect(await storeA.get('key')).toBe('a');
        expect(await storeB.get('key')).toBe('b');
    });
});
