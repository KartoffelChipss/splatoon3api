import parseChallenges from '../../src/parser/challengesParser';
import { buildTranslation, buildStageNode, RULE_IDS } from '../fixtures';

describe('parseChallenges', () => {
    it('resolves the event name/desc/rule and keeps the raw ids', () => {
        const json = {
            data: {
                eventSchedules: {
                    nodes: [
                        {
                            leagueMatchSetting: {
                                leagueMatchEvent: { id: 'event1' },
                                vsRule: { id: RULE_IDS.clamBlitz },
                                vsStages: [buildStageNode('stage1'), buildStageNode('stage2')],
                            },
                            timePeriods: [{ startTime: 't0', endTime: 't1' }],
                        },
                    ],
                },
            },
        };

        const [challenge] = parseChallenges(json, buildTranslation());

        expect(challenge.id).toBe('event1');
        expect(challenge.name).toBe('Event Name');
        expect(challenge.gameRuleId).toBe(RULE_IDS.clamBlitz);
        expect(challenge.gameRule).toBe('Clam Blitz');
        expect(challenge.stages).toHaveLength(2);
        expect(challenge.timePeriods).toEqual([{ startTime: 't0', endTime: 't1' }]);
    });
});
