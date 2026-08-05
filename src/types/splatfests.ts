import { FestRegion } from './common';

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
};

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
};
