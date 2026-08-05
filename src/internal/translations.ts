import { Lang, SUPPORTED_LANGUAGES } from '../types/common';
import GearTypes from '../gearTypeLang';

const ALT_LANG_CODES = new Map<string, Lang>([
    ['en', 'en-US'],
    ['de', 'de-DE'],
    ['nl', 'nl-NL'],
    ['fr', 'fr-FR'],
    ['es', 'es-ES'],
    ['it', 'it-IT'],
    ['ru', 'ru-RU'],
    ['jp', 'ja-JP'],
]);

/**
 * Normalize a language input (e.g. "en", "de-de") into one of the supported `Lang` values,
 * defaulting to "en-US" for anything unrecognized.
 */
export function formatLang(lang: Lang | string | undefined): Lang {
    if (!lang || typeof lang !== 'string') return 'en-US';

    let normalized: string = lang;

    if (ALT_LANG_CODES.has(normalized))
        normalized = ALT_LANG_CODES.get(normalized)!;

    if (normalized.includes('-')) {
        const [language, region] = normalized.split('-');
        normalized = `${language.toLowerCase()}-${region.toUpperCase()}`;
    }

    return (SUPPORTED_LANGUAGES as readonly string[]).includes(normalized)
        ? (normalized as Lang)
        : 'en-US';
}

/**
 * Lazily fetch (and memoize) the merged translation table for a language.
 * Concurrent calls for the same never-before-seen language share a single fetch.
 */
export function getTranslation(
    translationCache: Map<Lang, Promise<any>>,
    lang: Lang,
): Promise<any> {
    const cached = translationCache.get(lang);
    if (cached) return cached;

    const promise = fetch(`https://splatoon3.ink/data/locale/${lang}.json`)
        .then((res) => {
            if (!res || !res.ok)
                throw new Error(
                    `Network response was not ok while loading lang file for ${lang}`,
                );
            return res.json();
        })
        .then((json: any) => ({ ...json, gearType: GearTypes[lang] }))
        .catch((err) => {
            translationCache.delete(lang);
            throw err;
        });

    translationCache.set(lang, promise);
    return promise;
}
