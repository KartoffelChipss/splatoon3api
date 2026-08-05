import {
    buildStage,
    buildRotation,
    buildRankedModes,
    buildFestMatchSetting,
    buildTricolorStage,
    buildTricolorStages,
} from '../../../src/parser/stages/shared';
import { buildTranslation, buildMatchSetting, buildStageNode, RULE_IDS } from '../../fixtures';

describe('buildStage', () => {
    it('resolves the translated name and keeps the raw id', () => {
        const stage = buildStage(buildStageNode('stage1'), buildTranslation());
        expect(stage).toEqual({
            id: 'stage1',
            name: 'Scorch Gorge',
            image: 'https://example.com/stage1.png',
        });
    });
});

describe('buildRotation', () => {
    it('resolves ruleId, the localized rules name, and the rule image together', () => {
        const rotation = buildRotation(
            '2024-01-01T00:00:00Z',
            '2024-01-01T02:00:00Z',
            buildMatchSetting(RULE_IDS.splatZones),
            buildTranslation()
        );

        expect(rotation.ruleId).toBe(RULE_IDS.splatZones);
        expect(rotation.rules).toBe('Splat Zones');
        expect(rotation.rulesImg).toContain('area');
        expect(rotation.stage1.id).toBe('stage1');
    });
});

describe('buildRankedModes', () => {
    it('builds series from index 0 and open from index 1', () => {
        const modes = buildRankedModes(
            't0',
            't1',
            [buildMatchSetting(RULE_IDS.splatZones), buildMatchSetting(RULE_IDS.towerControl)],
            buildTranslation()
        );

        expect(modes.series.rules).toBe('Splat Zones');
        expect(modes.open.rules).toBe('Tower Control');
    });
});

describe('buildFestMatchSetting', () => {
    it('assigns settings to regular/challenge by festMode', () => {
        const settings = [
            { ...buildMatchSetting(RULE_IDS.turfWar), festMode: 'REGULAR' },
            { ...buildMatchSetting(RULE_IDS.clamBlitz), festMode: 'CHALLENGE' },
        ];

        const result = buildFestMatchSetting('t0', 't1', settings, buildTranslation());

        expect(result.regular?.festMode).toBe('REGULAR');
        expect(result.regular?.rules).toBe('Turf War');
        expect(result.challenge?.rules).toBe('Clam Blitz');
    });
});

describe('buildTricolorStage / buildTricolorStages', () => {
    it('returns null when there is no current fest', () => {
        expect(buildTricolorStage(null, buildTranslation())).toBeNull();
        expect(buildTricolorStages(null, buildTranslation())).toBeNull();
    });

    it('builds the tricolor stage(s) from the current fest', () => {
        const currentFest = {
            startTime: 't0',
            endTime: 't1',
            tricolorStage: buildStageNode('stage1'),
            tricolorStages: [buildStageNode('stage1'), buildStageNode('stage2')],
        };

        expect(buildTricolorStage(currentFest, buildTranslation())?.name).toBe('Scorch Gorge');
        expect(buildTricolorStages(currentFest, buildTranslation())).toHaveLength(2);
    });
});
