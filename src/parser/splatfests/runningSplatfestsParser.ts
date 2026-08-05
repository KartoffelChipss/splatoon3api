import { RunningFestData, RunningFestTeam } from '../../types/splatfests';
import { isFestRegion } from '../../internal/festRegion';
import { buildFestTeams, computeTeamColor } from './shared';

function buildRunningTeam(
    team: any,
    festId: string,
    index: number,
    translation: any,
): RunningFestTeam {
    const { color, colorHEX } = computeTeamColor(team.color);

    return {
        teamName: translation.festivals[festId]?.teams[index]?.teamName ?? '',
        image: team.image.url,
        color,
        colorHEX,
        role: team.role,
    };
}

export default function parseRunningSplatfests(
    json: any,
    translation: any,
): RunningFestData {
    const data: RunningFestData = { US: [], EU: [], JP: [], AP: [] };

    for (const region of Object.keys(json)) {
        if (!isFestRegion(region)) continue;

        data[region] = json[region].data.festRecords.nodes
            .filter((fest: any) => fest.state !== 'CLOSED')
            .map((fest: any) => ({
                title:
                    translation.festivals[fest.__splatoon3ink_id]?.title ?? '',
                startTime: fest.startTime,
                endTime: fest.endTime,
                state: fest.state,
                teams: buildFestTeams(fest, (team, index) =>
                    buildRunningTeam(
                        team,
                        fest.__splatoon3ink_id,
                        index,
                        translation,
                    ),
                ),
            }));
    }

    return data;
}
