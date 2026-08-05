import { computeTeamColor, buildFestTeams } from '../../../src/parser/splatfests/shared';

describe('computeTeamColor', () => {
    it('encodes a fully opaque color correctly', () => {
        const { color, colorHEX } = computeTeamColor({
            r: 56 / 255,
            g: 148 / 255,
            b: 198 / 255,
            a: 1,
        });
        expect(color).toBe('rgba(56, 148, 198, 1)');
        expect(colorHEX).toBe('#3894c6ff');
    });

    it('keeps a fractional alpha instead of flooring it to fully transparent', () => {
        const { colorHEX } = computeTeamColor({ r: 1, g: 0, b: 0, a: 0.8 });
        expect(colorHEX).toBe('#ff0000cc');
    });
});

describe('buildFestTeams', () => {
    it('walks however many teams the fest actually has, not just indices 0-2', () => {
        const fest = { teams: [{ id: 'a' }, { id: 'b' }, { id: 'c' }, { id: 'd' }] };
        const teams = buildFestTeams(fest, (team, index) => ({ index, id: team.id }));

        expect(Object.keys(teams)).toEqual(['0', '1', '2', '3']);
        expect(teams[1]).toEqual({ index: 1, id: 'b' });
    });
});
