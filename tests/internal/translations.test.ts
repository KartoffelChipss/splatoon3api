import { formatLang } from '../../src/internal/translations';

describe('formatLang', () => {
    it('defaults to en-US for empty input', () => {
        expect(formatLang(undefined)).toBe('en-US');
        expect(formatLang('')).toBe('en-US');
    });

    it('maps short alt codes to the full locale', () => {
        expect(formatLang('de')).toBe('de-DE');
        expect(formatLang('jp')).toBe('ja-JP');
    });

    it('normalizes the casing of language/region tags', () => {
        expect(formatLang('en-us')).toBe('en-US');
        expect(formatLang('DE-de')).toBe('de-DE');
    });

    it('falls back to en-US for unsupported languages', () => {
        expect(formatLang('xx-XX')).toBe('en-US');
    });

    it('passes through already-correct values', () => {
        expect(formatLang('fr-CA')).toBe('fr-CA');
    });
});
