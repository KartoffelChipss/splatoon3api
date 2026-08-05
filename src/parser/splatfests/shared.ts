import { RGBAtoHEX } from '../../internal/color';

interface RawColor {
    r: number;
    g: number;
    b: number;
    a: number;
}

export function computeTeamColor(rawColor: RawColor): {
    color: string;
    colorHEX: string;
} {
    const r = Math.round(rawColor.r * 255);
    const g = Math.round(rawColor.g * 255);
    const b = Math.round(rawColor.b * 255);
    const a = rawColor.a;

    const rgba = `rgba(${r}, ${g}, ${b}, ${a})`;
    return { color: rgba, colorHEX: RGBAtoHEX(rgba) };
}

export function buildFestTeams<T>(
    fest: any,
    mapTeam: (team: any, index: number) => T,
): { [key: string]: T } {
    const teams: { [key: string]: T } = {};
    fest.teams.forEach((team: any, index: number) => {
        teams[index] = mapTeam(team, index);
    });
    return teams;
}
