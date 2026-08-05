import { CacheStore } from '../../src/types/common';
import { fetchJson } from '../../src/internal/fetchData';
import { Options } from '../../src/types/common';

function mockFetchOnce(body: any, ok = true) {
    return jest.fn().mockResolvedValue({
        ok,
        json: () => Promise.resolve(body),
    });
}

function createFakeStore(): CacheStore & { data: Map<string, unknown> } {
    const data = new Map<string, unknown>();
    return {
        data,
        async get(key) {
            return data.get(key);
        },
        async set(key, value) {
            data.set(key, value);
        },
    };
}

describe('fetchJson', () => {
    let cache: ReturnType<typeof createFakeStore>;

    beforeEach(() => {
        cache = createFakeStore();
    });

    it('fetches and caches on a cache miss', async () => {
        const fetchMock = mockFetchOnce({ hello: 'world' });
        global.fetch = fetchMock as any;

        const result = await fetchJson(
            'https://example.com/data.json',
            new Options(),
            cache,
        );

        expect(result).toEqual({ hello: 'world' });
        expect(fetchMock).toHaveBeenCalledTimes(1);
        expect(cache.data.get('https://example.com/data.json')).toEqual({
            hello: 'world',
        });
    });

    it('serves from cache without calling fetch again', async () => {
        cache.data.set('https://example.com/data.json', { cached: true });
        const fetchMock = jest.fn();
        global.fetch = fetchMock as any;

        const result = await fetchJson(
            'https://example.com/data.json',
            new Options(),
            cache,
        );

        expect(result).toEqual({ cached: true });
        expect(fetchMock).not.toHaveBeenCalled();
    });

    it('does not write to the cache when caching is disabled', async () => {
        const fetchMock = mockFetchOnce({ hello: 'world' });
        global.fetch = fetchMock as any;

        const options = new Options({ cache: { enabled: false } });
        await fetchJson('https://example.com/data.json', options, cache);

        expect(cache.data.get('https://example.com/data.json')).toBeUndefined();
    });

    it('sends the configured User-Agent header', async () => {
        const fetchMock = mockFetchOnce({});
        global.fetch = fetchMock as any;

        const options = new Options({ userAgent: 'MyApp/1.0' });
        await fetchJson('https://example.com/data.json', options, cache);

        const [, init] = fetchMock.mock.calls[0];
        expect((init.headers as Headers).get('User-Agent')).toBe('MyApp/1.0');
    });

    it('rejects when the response is not ok', async () => {
        const fetchMock = mockFetchOnce({}, false);
        global.fetch = fetchMock as any;

        await expect(
            fetchJson('https://example.com/data.json', new Options(), cache),
        ).rejects.toThrow();
    });

    it('passes the configured ttl through to the cache store', async () => {
        const fetchMock = mockFetchOnce({ hello: 'world' });
        global.fetch = fetchMock as any;

        const setSpy = jest.spyOn(cache, 'set');
        const options = new Options({ cache: { enabled: true, ttl: 120 } });
        await fetchJson('https://example.com/data.json', options, cache);

        expect(setSpy).toHaveBeenCalledWith(
            'https://example.com/data.json',
            { hello: 'world' },
            120,
        );
    });
});
