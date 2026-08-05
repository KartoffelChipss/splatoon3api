import { RuleID, SplatStage } from './common';

export interface ChallengeTimePeriod {
    startTime: string;
    endTime: string;
}

export interface SplatChallenge {
    id: string;
    name: string;
    desc: string;
    eventRule: string;
    gameRuleId: RuleID;
    gameRule: string;
    gameRuleImg: string;
    stages: SplatStage[];
    timePeriods: ChallengeTimePeriod[];
}
