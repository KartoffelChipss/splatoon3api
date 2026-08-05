import parseUpcomingSplatfests from '../../../src/parser/splatfests/upcomingSplatfestsParser';
import { buildFestJson, buildFestRecord } from '../../fixtures';

describe('parseUpcomingSplatfests', () => {
    it('only includes SCHEDULED fests, using the raw (untranslated) title and team names', () => {
        const json = buildFestJson('US', [
            buildFestRecord({ state: 'SCHEDULED', title: 'Ketchup vs Mayo' }),
            buildFestRecord({ state: 'CLOSED', title: 'Old Fest' }),
        ]);

        const result = parseUpcomingSplatfests(json);

        expect(result.US).toHaveLength(1);
        expect(result.US[0].title).toBe('Ketchup vs Mayo');
        expect(result.US[0].teams[0].teamName).toBe('Ketchup');
        expect(result.EU).toEqual([]);
    });
});
