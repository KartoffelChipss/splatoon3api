import { isFestRegion } from '../../src/internal/festRegion';

describe('isFestRegion', () => {
    it.each(['US', 'EU', 'JP', 'AP'])('accepts %s', (region) => {
        expect(isFestRegion(region)).toBe(true);
    });

    it('rejects anything that is not a known region', () => {
        expect(isFestRegion('data')).toBe(false);
        expect(isFestRegion(undefined)).toBe(false);
        expect(isFestRegion('us')).toBe(false);
    });
});
