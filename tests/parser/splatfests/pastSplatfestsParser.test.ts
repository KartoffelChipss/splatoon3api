import parsePastSplatfests from '../../../src/parser/splatfests/pastSplatfestsParser';
import { buildFestJson, buildFestRecord, buildTranslation } from '../../fixtures';

describe('parsePastSplatfests', () => {
    it('only includes CLOSED fests, resolving title/team names from the translation table', () => {
        const json = buildFestJson('JP', [
            buildFestRecord({ state: 'CLOSED' }),
            buildFestRecord({ state: 'SCHEDULED' }),
        ]);

        const result = parsePastSplatfests(json, buildTranslation());

        expect(result.JP).toHaveLength(1);
        expect(result.JP[0].title).toBe('Ketchup vs Mayo');
        expect(result.JP[0].teams[0]).toMatchObject({
            teamName: 'Ketchup',
            results: { isWinner: true, conchShellsRatio: 0.6 },
        });
    });
});
