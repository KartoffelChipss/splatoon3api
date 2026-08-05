import { Client } from '../src/client';

function buildScheduleResponse() {
    return {
        data: {
            regularSchedules: {
                nodes: [
                    {
                        startTime: new Date(Date.now() - 1000).toISOString(),
                        endTime: new Date(Date.now() + 3600_000).toISOString(),
                        regularMatchSetting: {
                            vsStages: [
                                { id: 'stage1', image: { url: 's1.png' } },
                                { id: 'stage2', image: { url: 's2.png' } },
                            ],
                            vsRule: { id: 'VnNSdWxlLTA=' },
                        },
                    },
                ],
            },
            bankaraSchedules: {
                nodes: [{ startTime: 't0', endTime: 't1', bankaraMatchSettings: null }],
            },
            xSchedules: { nodes: [{ startTime: 't0', endTime: 't1', xMatchSetting: null }] },
            festSchedules: { nodes: [{ startTime: 't0', endTime: 't1', festMatchSettings: null }] },
            currentFest: null,
        },
    };
}

function buildLocaleResponse(ruleName: string) {
    return {
        stages: { stage1: { name: 'Stage One' }, stage2: { name: 'Stage Two' } },
        rules: { 'VnNSdWxlLTA=': { name: ruleName } },
    };
}

function jsonResponse(body: any) {
    return Promise.resolve({ ok: true, json: () => Promise.resolve(body) });
}

describe('Client', () => {
    it('serves multiple languages from one instance without re-fetching the raw schedule data', async () => {
        const fetchMock = jest.fn((url: string) => {
            if (url.includes('/data/schedules.json')) return jsonResponse(buildScheduleResponse());
            if (url.includes('/locale/en-US.json'))
                return jsonResponse(buildLocaleResponse('Turf War'));
            if (url.includes('/locale/de-DE.json'))
                return jsonResponse(buildLocaleResponse('Revierkampf'));
            return Promise.reject(new Error(`Unexpected fetch: ${url}`));
        });
        global.fetch = fetchMock as any;

        const client = new Client();

        const en = await client.stages.getCurrent();
        const de = await client.stages.getCurrent({ lang: 'de-DE' });

        expect(en.regular?.rules).toBe('Turf War');
        expect(de.regular?.rules).toBe('Revierkampf');
        expect(en.regular?.ruleId).toBe(de.regular?.ruleId);

        const scheduleFetches = fetchMock.mock.calls.filter(([url]) =>
            url.includes('/data/schedules.json')
        );
        expect(scheduleFetches).toHaveLength(1);

        const localeFetches = fetchMock.mock.calls.filter(([url]) => url.includes('/locale/'));
        expect(localeFetches).toHaveLength(2);
    });

    it('shares one in-flight translation fetch across concurrent calls for the same language', async () => {
        const fetchMock = jest.fn((url: string) => {
            if (url.includes('/data/schedules.json')) return jsonResponse(buildScheduleResponse());
            if (url.includes('/locale/en-US.json'))
                return jsonResponse(buildLocaleResponse('Turf War'));
            return Promise.reject(new Error(`Unexpected fetch: ${url}`));
        });
        global.fetch = fetchMock as any;

        const client = new Client();

        const [current, next] = await Promise.all([
            client.stages.getCurrent(),
            client.stages.getNext(),
        ]);

        expect(current.regular?.rules).toBe('Turf War');
        expect(next.regular).toBeNull(); // fixture only has one schedule node, so index 1 doesn't exist

        const localeFetches = fetchMock.mock.calls.filter(([url]) => url.includes('/locale/'));
        expect(localeFetches).toHaveLength(1);
    });

    it('defaultLang is used when no per-call lang is given', async () => {
        const fetchMock = jest.fn((url: string) => {
            if (url.includes('/data/schedules.json')) return jsonResponse(buildScheduleResponse());
            if (url.includes('/locale/de-DE.json'))
                return jsonResponse(buildLocaleResponse('Revierkampf'));
            return Promise.reject(new Error(`Unexpected fetch: ${url}`));
        });
        global.fetch = fetchMock as any;

        const client = new Client({ defaultLang: 'de-DE' });
        const result = await client.stages.getCurrent();

        expect(result.regular?.rules).toBe('Revierkampf');
    });
});
