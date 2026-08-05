import parseAllStages from '../../../src/parser/stages/allStagesParser';
import {
    buildTranslation,
    buildMatchSetting,
    buildScheduleJson,
} from '../../fixtures';

describe('parseAllStages', () => {
    it('maps a node to null when its match setting is absent', () => {
        const json = buildScheduleJson({
            regularSchedules: {
                nodes: [
                    {
                        startTime: 't0',
                        endTime: 't1',
                        regularMatchSetting: null,
                    },
                ],
            },
        });

        const result = parseAllStages(json, buildTranslation());
        expect(result.regular).toEqual([null]);
    });

    it('maps a present match setting to a full rotation', () => {
        const json = buildScheduleJson({
            regularSchedules: {
                nodes: [
                    {
                        startTime: 't0',
                        endTime: 't1',
                        regularMatchSetting: buildMatchSetting(),
                    },
                ],
            },
        });

        const result = parseAllStages(json, buildTranslation());
        expect(result.regular[0]?.stage1.id).toBe('stage1');
    });

    it('falls back to a single-null array for triColorStages when there is no current fest', () => {
        const json = buildScheduleJson();
        const result = parseAllStages(json, buildTranslation());

        expect(result.triColorStages).toEqual([null]);
        expect(result.triColorStage).toBeNull();
    });
});
