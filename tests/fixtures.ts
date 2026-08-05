export const RULE_IDS = {
    turfWar: 'VnNSdWxlLTA=',
    splatZones: 'VnNSdWxlLTE=',
    towerControl: 'VnNSdWxlLTI=',
    rainmaker: 'VnNSdWxlLTM=',
    clamBlitz: 'VnNSdWxlLTQ=',
} as const;

export function buildTranslation(overrides: any = {}): any {
    return {
        stages: {
            stage1: { name: 'Scorch Gorge' },
            stage2: { name: 'Eeltail Alley' },
        },
        rules: {
            [RULE_IDS.turfWar]: { name: 'Turf War' },
            [RULE_IDS.splatZones]: { name: 'Splat Zones' },
            [RULE_IDS.towerControl]: { name: 'Tower Control' },
            [RULE_IDS.rainmaker]: { name: 'Rainmaker' },
            [RULE_IDS.clamBlitz]: { name: 'Clam Blitz' },
        },
        events: {
            event1: {
                name: 'Event Name',
                desc: 'Event description',
                regulation: 'Regulation text',
            },
        },
        bosses: { boss1: { name: 'Big Shot' } },
        weapons: { weapon1: { name: 'Splattershot' } },
        gear: { gear1: { name: 'Cool Cap' } },
        gearType: {
            HeadGear: 'Headgear',
            ClothingGear: 'Clothing',
            ShoesGear: 'Shoes',
        },
        powers: { power1: { name: 'Ink Saver (Main)' } },
        brands: { brand1: { name: 'Zekko' } },
        festivals: {
            fest1: {
                title: 'Ketchup vs Mayo',
                teams: [{ teamName: 'Ketchup' }, { teamName: 'Mayo' }],
            },
        },
        ...overrides,
    };
}

export function buildStageNode(id = 'stage1') {
    return { id, image: { url: `https://example.com/${id}.png` } };
}

export function buildMatchSetting(ruleId: string = RULE_IDS.turfWar) {
    return {
        vsStages: [buildStageNode('stage1'), buildStageNode('stage2')],
        vsRule: { id: ruleId },
    };
}

export function buildScheduleJson(overrides: any = {}) {
    return {
        data: {
            regularSchedules: { nodes: [] },
            bankaraSchedules: { nodes: [] },
            xSchedules: { nodes: [] },
            festSchedules: { nodes: [] },
            currentFest: null,
            ...overrides,
        },
    };
}

export function buildFestRecord(overrides: any = {}) {
    return {
        __splatoon3ink_id: 'fest1',
        state: 'SCHEDULED',
        title: 'Ketchup vs Mayo (raw)',
        startTime: 't0',
        endTime: 't1',
        teams: [
            {
                teamName: 'Ketchup',
                image: { url: 'ketchup.png' },
                color: { r: 1, g: 0, b: 0, a: 1 },
                role: 'ATTACK',
                result: {
                    isWinner: true,
                    horagaiRatio: 0.6,
                    isHoragaiRatioTop: true,
                    voteRatio: 0.5,
                    isVoteRatioTop: true,
                    regularContributionRatio: 0.4,
                    isRegularContributionRatioTop: true,
                    challengeContributionRatio: 0.3,
                    isChallengeContributionRatioTop: false,
                    tricolorContributionRatio: 0.2,
                    isTricolorContributionRatioTop: false,
                },
            },
            {
                teamName: 'Mayo',
                image: { url: 'mayo.png' },
                color: { r: 1, g: 1, b: 1, a: 1 },
                role: 'DEFENSE',
                result: {
                    isWinner: false,
                    horagaiRatio: 0.4,
                    isHoragaiRatioTop: false,
                    voteRatio: 0.5,
                    isVoteRatioTop: false,
                    regularContributionRatio: 0.6,
                    isRegularContributionRatioTop: false,
                    challengeContributionRatio: 0.7,
                    isChallengeContributionRatioTop: true,
                    tricolorContributionRatio: 0.8,
                    isTricolorContributionRatioTop: true,
                },
            },
        ],
        ...overrides,
    };
}

export function buildFestJson(region: string, fests: any[]) {
    return { [region]: { data: { festRecords: { nodes: fests } } } };
}
