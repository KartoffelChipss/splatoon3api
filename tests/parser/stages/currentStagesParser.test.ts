import parseCurrentStages from '../../../src/parser/stages/currentStagesParser';
import { buildTranslation, buildMatchSetting, buildScheduleJson, RULE_IDS } from '../../fixtures';

describe('parseCurrentStages', () => {
    it('does not throw and returns nulls when no node is currently active', () => {
        const json = buildScheduleJson();

        expect(() => parseCurrentStages(json, buildTranslation())).not.toThrow();

        const result = parseCurrentStages(json, buildTranslation());
        expect(result.regular).toBeNull();
        expect(result.ranked).toBeNull();
        expect(result.xbattle).toBeNull();
        expect(result.festSchedule).toBeNull();
    });

    it('picks the node whose time window contains now', () => {
        const now = Date.now();
        const past = {
            startTime: new Date(now - 7200_000).toISOString(),
            endTime: new Date(now - 3600_000).toISOString(),
            regularMatchSetting: buildMatchSetting(RULE_IDS.turfWar),
        };
        const active = {
            startTime: new Date(now - 1800_000).toISOString(),
            endTime: new Date(now + 1800_000).toISOString(),
            regularMatchSetting: buildMatchSetting(RULE_IDS.splatZones),
        };
        const json = buildScheduleJson({ regularSchedules: { nodes: [past, active] } });

        const result = parseCurrentStages(json, buildTranslation());
        expect(result.regular?.rules).toBe('Splat Zones');
    });
});
