import { PastFestData, PastFestTeam } from '../../types/splatfests';
import { isFestRegion } from '../../internal/festRegion';
import { buildFestTeams, computeTeamColor } from './shared';

function buildPastTeam(team: any, festId: string, index: number, translation: any): PastFestTeam {
    const { color, colorHEX } = computeTeamColor(team.color);
    const result = team.result;

    return {
        teamName: translation.festivals[festId]?.teams[index]?.teamName ?? '',
        image: team.image.url,
        color,
        colorHEX,
        role: team.role,
        results: {
            isWinner: result.isWinner,
            conchShellsRatio: result.horagaiRatio,
            conchShellsTop: result.isHoragaiRatioTop,
            voteRatio: result.voteRatio,
            isVoteTop: result.isVoteRatioTop,
            regularContributionRatio: result.regularContributionRatio,
            isRegularContributionTop: result.isRegularContributionRatioTop,
            proModeContributionRatio: result.challengeContributionRatio,
            isProModeContributionTop: result.isChallengeContributionRatioTop,
            tricolorContributionRatio: result.tricolorContributionRatio,
            isTricolorContributionRatioTop: result.isTricolorContributionRatioTop,
        },
    };
}

export default function parsePastSplatfests(json: any, translation: any): PastFestData {
    const data: PastFestData = { US: [], EU: [], JP: [], AP: [] };

    for (const region of Object.keys(json)) {
        if (!isFestRegion(region)) continue;

        data[region] = json[region].data.festRecords.nodes
            .filter((fest: any) => fest.state === 'CLOSED')
            .map((fest: any) => ({
                title: translation.festivals[fest.__splatoon3ink_id]?.title ?? '',
                startTime: fest.startTime,
                endTime: fest.endTime,
                teams: buildFestTeams(fest, (team, index) =>
                    buildPastTeam(team, fest.__splatoon3ink_id, index, translation)
                ),
            }));
    }

    return data;
}
