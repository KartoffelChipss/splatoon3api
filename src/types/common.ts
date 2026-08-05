export const SUPPORTED_LANGUAGES = [
    'de-DE',
    'en-GB',
    'en-US',
    'es-ES',
    'es-MX',
    'fr-FR',
    'fr-CA',
    'it-IT',
    'ja-JP',
    'ko-KR',
    'nl-NL',
    'ru-RU',
    'zh-CN',
    'zh-TW',
] as const;

export type Lang = (typeof SUPPORTED_LANGUAGES)[number];

export type FestRegion = 'US' | 'EU' | 'JP' | 'AP';

export type RuleID =
    'VnNSdWxlLTQ=' | 'VnNSdWxlLTI=' | 'VnNSdWxlLTE=' | 'VnNSdWxlLTM=';

/**
 * Per-call language override. Falls back to the client's `defaultLang` when omitted.
 */
export interface CallOptions {
    lang?: Lang;
}

export interface SplatStage {
    id: string;
    name: string;
    image: string;
}

export interface SplatGearpower {
    id: string;
    name: string;
    image: string;
}

export type CacheOptions = {
    enabled?: boolean;
    ttl?: number;
};

export interface CacheStore {
    get(key: string): Promise<unknown | undefined>;
    set(key: string, value: unknown, ttlSeconds?: number): Promise<void>;
}

export interface OptionsInput {
    schedulesURL?: string;
    salmonGearURL?: string;
    gearURL?: string;
    festURL?: string;
    userAgent?: string;
    defaultLang?: Lang;
    cache?: CacheOptions;
    cacheStore?: CacheStore;
}

export class Options {
    schedulesURL: string = 'https://splatoon3.ink/data/schedules.json';
    salmonGearURL: string = 'https://splatoon3.ink/data/coop.json';
    gearURL: string = 'https://splatoon3.ink/data/gear.json';
    festURL: string = 'https://splatoon3.ink/data/festivals.json';
    userAgent: string | undefined = undefined;
    defaultLang: Lang = 'en-US';
    cache: CacheOptions = {
        enabled: true,
        ttl: 60,
    };
    cacheStore: CacheStore | undefined = undefined;

    constructor(options?: OptionsInput) {
        if (!options) return;
        if (options.schedulesURL) this.schedulesURL = options.schedulesURL;
        if (options.salmonGearURL) this.salmonGearURL = options.salmonGearURL;
        if (options.gearURL) this.gearURL = options.gearURL;
        if (options.festURL) this.festURL = options.festURL;
        if (options.userAgent) this.userAgent = options.userAgent;
        if (options.defaultLang) this.defaultLang = options.defaultLang;
        if (options.cache) this.cache = options.cache;
        if (options.cacheStore) this.cacheStore = options.cacheStore;
    }
}
