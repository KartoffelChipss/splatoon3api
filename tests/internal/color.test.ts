import { RGBAtoHEX } from '../../src/internal/color';

describe('RGBAtoHEX', () => {
    it('converts an opaque color', () => {
        expect(RGBAtoHEX('rgba(56, 148, 198, 1)')).toBe('#3894c6ff');
    });

    it('keeps a fractional alpha instead of flooring it to fully transparent', () => {
        expect(RGBAtoHEX('rgba(255, 0, 0, 0.8)')).toBe('#ff0000cc');
    });

    it('can drop the alpha channel entirely', () => {
        expect(RGBAtoHEX('rgba(255, 0, 0, 0.8)', true)).toBe('#ff0000');
    });
});
