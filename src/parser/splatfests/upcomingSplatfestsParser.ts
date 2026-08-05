import { FestData, FestTeam } from '../../types/splatfests';
import { isFestRegion } from '../../internal/festRegion';
import { buildFestTeams, computeTeamColor } from './shared';

function buildUpcomingTeam(team: any): FestTeam {
    const { color, colorHEX } = computeTeamColor(team.color);

    return {
        teamName: team.teamName,
        image: team.image.url,
        color,
        colorHEX,
    };
}

export default function parseUpcomingSplatfests(json: any): FestData {
    const data: FestData = { US: [], EU: [], JP: [], AP: [] };

    for (const region of Object.keys(json)) {
        if (!isFestRegion(region)) continue;

        data[region] = json[region].data.festRecords.nodes
            .filter((fest: any) => fest.state === 'SCHEDULED')
            .map((fest: any) => ({
                title: fest.title,
                startTime: fest.startTime,
                endTime: fest.endTime,
                teams: buildFestTeams(fest, buildUpcomingTeam),
            }));
    }

    return data;
}
