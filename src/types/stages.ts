import { RuleID, SplatStage } from './common';

export interface SplatRotation {
    start_time: string;
    end_time: string;
    stage1: SplatStage;
    stage2: SplatStage;
    ruleId: RuleID;
    rules: string;
    rulesImg: string;
}

export interface SplatTricolorStage {
    start_time: string;
    end_time: string;
    name: string;
    image: string;
}

export interface RankedModes {
    series: SplatRotation;
    open: SplatRotation;
}

export interface FestRotation extends SplatRotation {
    festMode: string;
}

export interface FestMatchSetting {
    regular: FestRotation | null;
    challenge: FestRotation | null;
}

export interface StagesResponse {
    regular: SplatRotation | null;
    ranked: RankedModes | null;
    xbattle: SplatRotation | null;
    festSchedule: FestMatchSetting | null;
    triColorStage: SplatTricolorStage | null;
    triColorStages: SplatTricolorStage[] | null;
}

export interface AllStagesResponse {
    regular: (null | SplatRotation)[];
    ranked: (null | RankedModes)[];
    xbattle: (null | SplatRotation)[];
    festSchedule: (null | FestMatchSetting)[];
    triColorStage: SplatTricolorStage | null;
    triColorStages: (null | SplatTricolorStage)[];
}
