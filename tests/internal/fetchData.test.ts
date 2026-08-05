import NodeCache from 'node-cache';
import { fetchJson } from '../../src/internal/fetchData';
import { Options } from '../../src/types/common';

function mockFetchOnce(body: any, ok = true) {
    return jest.fn().mockResolvedValue({
        ok,
        json: () => Promise.resolve(body),
    });
}

describe('fetchJson', () => {
    let cache: NodeCache;

    beforeEach(() => {
        cache = new NodeCache();
    });

    afterEach(() => {
        cache.flushAll();
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
        expect(cache.get('https://example.com/data.json')).toEqual({
            hello: 'world',
        });
    });

    it('serves from cache without calling fetch again', async () => {
        cache.set('https://example.com/data.json', { cached: true });
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

        expect(cache.get('https://example.com/data.json')).toBeUndefined();
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
});
