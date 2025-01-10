export type Lang = 'de-DE' | 'en-GB' | 'en-US' | 'es-ES' | 'es-MX' | 'fr-FR' | 'fr-CA' | 'it-IT' | 'ja-JP' | 'ko-KR' | 'nl-NL' | 'ru-RU' | 'zh-CN' | 'zh-TW';

export type SplatRules = 'Turf War' | 'Splat Zones' | 'Rainmaker' | 'Clam Blitz';

export type FestRegion = 'US' | 'EU' | 'JP' | 'AP';

export type RuleID = 'VnNSdWxlLTQ=' | 'VnNSdWxlLTI=' | 'VnNSdWxlLTE=' | 'VnNSdWxlLTM=';

export type CacheOptions = {
    enabled?: boolean;
    ttl?: number;
}

export interface Options {
    schedulesURL: string;
    salmonGearURL: string;
    gearURL: string;
    festURL: string;
    userAgent: string | undefined;
    cache: CacheOptions;

    constructor: (options: any) => Options;
}

export class Options {
    schedulesURL: string = "https://splatoon3.ink/data/schedules.json";
    salmonGearURL: string = "https://splatoon3.ink/data/coop.json";
    gearURL: string = "https://splatoon3.ink/data/gear.json";
    festURL: string = "https://splatoon3.ink/data/festivals.json";
    userAgent: string | undefined = undefined;
    cache: CacheOptions = {
        enabled: true,
        ttl: 60
    };

    constructor(options?: any | undefined) {
        if (options) {
            if (options.schedulesURL) this.schedulesURL = options.schedulesURL;
            if (options.salmonGearURL) this.salmonGearURL = options.salmonGearURL;
            if (options.gearURL) this.gearURL = options.gearURL;
            if (options.festURL) this.festURL = options.festURL;
            if (options.userAgent) this.userAgent = options.userAgent;
            if (options.cache) this.cache = options.cache;
        }
    }
}

export interface GearTranslations {
    "en-GB": {
        HeadGear: string;
        ClothingGear: string;
        ShoesGear: string;
    };
    "en-US": {
        HeadGear: string;
        ClothingGear: string;
        ShoesGear: string;
    };
    "de-DE": {
        HeadGear: string;
        ClothingGear: string;
        ShoesGear: string;
    };
    "nl-NL": {
        HeadGear: string;
        ClothingGear: string;
        ShoesGear: string;
    };
    "fr-FR": {
        HeadGear: string;
        ClothingGear: string;
        ShoesGear: string;
    };
    "fr-CA": {
        HeadGear: string;
        ClothingGear: string;
        ShoesGear: string;
    };
    "es-ES": {
        HeadGear: string;
        ClothingGear: string;
        ShoesGear: string;
    };
    "es-MX": {
        HeadGear: string;
        ClothingGear: string;
        ShoesGear: string;
    };
    "it-IT": {
        HeadGear: string;
        ClothingGear: string;
        ShoesGear: string;
    };
    "ru-RU": {
        HeadGear: string;
        ClothingGear: string;
        ShoesGear: string;
    };
    "ko-KR": {
        HeadGear: string;
        ClothingGear: string;
        ShoesGear: string;
    };
    "zh-CN": {
        HeadGear: string;
        ClothingGear: string;
        ShoesGear: string;
    };
    "zh-TW": {
        HeadGear: string;
        ClothingGear: string;
        ShoesGear: string;
    };
    "ja-JP": {
        HeadGear: string;
        ClothingGear: string;
        ShoesGear: string;
    };
}

export interface SplatGearpower {
    name: string;
    image: string;
}

export interface SplatStage {
    name: string;
    image: string;
}

export interface SplatTricolorStage {
    start_time: string;
    end_time: string;
    name: string;
    image: string;
    rulesImg: string;
}

export interface SplatRotation {
    start_time: string;
    end_time: string;
    stage1: SplatStage;
    stage2: SplatStage;
    rules: SplatRules;
    rulesImg: string;
}

export interface FestMatchSetting {
    regular: FestRotation | null;
    challenge: FestRotation | null;
}

export interface FestRotation {
    start_time: string;
    end_time: string;
    stage1: SplatStage;
    stage2: SplatStage;
    rules: SplatRules;
    rulesImg: string;
    festMode: string;
}

export interface RankedModes {
    series: SplatRotation;
    open: SplatRotation;
}

export interface StagesResponse {
    regular: SplatRotation | null;
    ranked: RankedModes | null;
    xbattle: SplatRotation | null;
    festSchedule: FestMatchSetting | null;
    triColorStage: SplatTricolorStage | null;
    triColorStages: SplatTricolorStage[] | null;
}

/**
 * @callback StagesCallback
 * @param {StagesResponse} res - The response from the API
 */

export interface AllStagesResponse {
    regular: (null | SplatRotation)[];
    ranked: (null | RankedModes)[];
    xbattle: (null | SplatRotation)[];
    festSchedule: (null | FestMatchSetting)[];
    triColorStage: SplatTricolorStage | null;
    triColorStages: (null | SplatTricolorStage)[];
}

/**
 * @callback AllStagesCallback
 * @param {AllStagesResponse} res - The response from the API
 */

export interface ChallengeTimePeriod {
    startTime: string;
    endTime: string;
}

/**
 * @callback SplatChallengeCallback
 * @param {SplatChallenge[]} res - The response from the API
 */

export interface SplatChallenge {
    name: string;
    desc: string;
    eventRule: string;
    gameRule: SplatRules;
    gameRuleImg: string;
    stages: SplatStage[];
    timePeriods: ChallengeTimePeriod[];
}

export interface SalmonMonthlygear {
    name: string;
    type: string;
    image: string;
}

export interface SalmonRunWeapon {
    name: string;
    image: string;
}

export interface SalmonSchedule {
    start_time: string;
    end_time: string;
    stage: SplatStage;
    weapons: SalmonRunWeapon[];
}

export interface SalmonResult {
    regularSchedules: SalmonSchedule[];
    bigRunSchedules: SalmonSchedule[];
    monthlyGear: SalmonMonthlygear | null;
}

export interface SplatnetGearFeatured {
    name: string;
    type: string;
    image: string;
    primaryGearPower: SplatGearpower;
    additionalGearPowers: SplatGearpower[];
    price: number;
    saleEnd: string;
}

export interface Brand {
    name: string;
    image: string;
}

export interface SplatnetGear {
    name: string;
    type: string;
    image: string;
    primaryGearPower: SplatGearpower;
    additionalGearPowers: SplatGearpower[];
    price: number;
    saleEnd: string;
    brand: Brand;
}

export interface SplatnetFeaturedBrand {
    name: string;
    banner: string;
    usualPower: SplatGearpower;
    saleEnd: string;
    brandGears: SplatnetGearFeatured[];
}

export interface SplatnetResult {
    featuredBrand: SplatnetFeaturedBrand;
    limitedGear: SplatnetGear[];
}

export interface FestTeam {
    teamName: string;
    image: string;
    color: string;
    colorHEX: string;
}

export interface FestSchedule {
    title: string;
    startTime: string;
    endTime: string;
    teams: { [key: string]: FestTeam };
}

export type FestData = {
    [key in FestRegion]: FestSchedule[];
}

export interface PastFestTeamResults {
    isWinner: boolean;
    conchShellsRatio: number;
    conchShellsTop: boolean;
    voteRatio: number;
    isVoteTop: boolean;
    regularContributionRatio: number;
    isRegularContributionTop: boolean;
    proModeContributionRatio: number;
    isProModeContributionTop: boolean;
    tricolorContributionRatio: number;
    isTricolorContributionRatioTop: boolean;
}

export interface PastFestTeam {
    teamName: string;
    image: string;
    color: string;
    colorHEX: string;
    role: string;
    results: PastFestTeamResults;
}

export interface PastFestSchedule {
    title: string;
    startTime: string;
    endTime: string;
    teams: { [key: string]: PastFestTeam };
}

export type PastFestData = {
    [key in FestRegion]: PastFestSchedule[];
};

export interface RunningFestTeam {
    teamName: string;
    image: string;
    color: string;
    colorHEX: string;
    role: string;
}

export interface RunningFestSchedule {
    title: string;
    startTime: string;
    endTime: string;
    state: string;
    teams: { [key: string]: RunningFestTeam };
}

export type RunningFestData = {
    [key in FestRegion]: RunningFestSchedule[];
}