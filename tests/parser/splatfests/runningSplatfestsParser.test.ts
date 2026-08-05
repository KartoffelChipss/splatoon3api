import parseRunningSplatfests from '../../../src/parser/splatfests/runningSplatfestsParser';
import {
    buildFestJson,
    buildFestRecord,
    buildTranslation,
} from '../../fixtures';

describe('parseRunningSplatfests', () => {
    it('excludes CLOSED fests and resolves team names from the translation table', () => {
        const json = buildFestJson('EU', [
            buildFestRecord({ state: 'FIRST_HALF' }),
            buildFestRecord({ state: 'CLOSED' }),
        ]);

        const result = parseRunningSplatfests(json, buildTranslation());

        expect(result.EU).toHaveLength(1);
        expect(result.EU[0].state).toBe('FIRST_HALF');
        expect(result.EU[0].teams[0]).toMatchObject({
            teamName: 'Ketchup',
            role: 'ATTACK',
        });
    });
});
