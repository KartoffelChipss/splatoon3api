import parseNextStages from '../../../src/parser/stages/nextStagesParser';
import { buildTranslation, buildMatchSetting, buildScheduleJson, RULE_IDS } from '../../fixtures';

describe('parseNextStages', () => {
    it('does not throw when nodes[1] is missing', () => {
        const json = buildScheduleJson({
            regularSchedules: {
                nodes: [
                    { startTime: 't0', endTime: 't1', regularMatchSetting: buildMatchSetting() },
                ],
            },
        });

        expect(() => parseNextStages(json, buildTranslation())).not.toThrow();
        expect(parseNextStages(json, buildTranslation()).regular).toBeNull();
    });

    it('reads the rotation at index 1, not index 0', () => {
        const json = buildScheduleJson({
            regularSchedules: {
                nodes: [
                    {
                        startTime: 't0',
                        endTime: 't1',
                        regularMatchSetting: buildMatchSetting(RULE_IDS.turfWar),
                    },
                    {
                        startTime: 't1',
                        endTime: 't2',
                        regularMatchSetting: buildMatchSetting(RULE_IDS.clamBlitz),
                    },
                ],
            },
        });

        expect(parseNextStages(json, buildTranslation()).regular?.rules).toBe('Clam Blitz');
    });
});
