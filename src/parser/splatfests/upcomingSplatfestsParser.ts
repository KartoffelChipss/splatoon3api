import { FestData } from "../../types";
import { RGBAtoHEX, isFestRegion } from "../../utils.js";

export default function parseUpcomingSplatfests(json: any, translation: any): FestData {
    let data: FestData = {
        US: [],
        EU: [],
        JP: [],
        AP: []
    };

    Object.keys(json).forEach(region => {
        if (!isFestRegion(region)) return;
        data[region] = [];
        json[region].data.festRecords.nodes.forEach((fest: any) => {
            if (fest.state !== "SCHEDULED") return;

            data[region].push({
                title: fest.title,
                startTime: fest.startTime,
                endTime: fest.endTime,
                teams: {
                    0: {
                        teamName: fest.teams[0].teamName,
                        image: fest.teams[0].image.url,
                        color: `rgba(${fest.teams[0].color.r * 255}, ${fest.teams[0].color.g * 255}, ${fest.teams[0].color.b * 255}, ${fest.teams[0].color.a})`,
                        colorHEX: RGBAtoHEX(`rgba(${Math.floor(fest.teams[0].color.r * 255)}, ${Math.floor(fest.teams[0].color.g * 255)}, ${Math.floor(fest.teams[0].color.b * 255)}, ${Math.floor(fest.teams[0].color.a)})`)
                    },
                    1: {
                        teamName: fest.teams[1].teamName,
                        image: fest.teams[1].image.url,
                        color: `rgba(${fest.teams[1].color.r * 255}, ${fest.teams[1].color.g * 255}, ${fest.teams[1].color.b * 255}, ${fest.teams[1].color.a})`,
                        colorHEX: RGBAtoHEX(`rgba(${Math.floor(fest.teams[1].color.r * 255)}, ${Math.floor(fest.teams[1].color.g * 255)}, ${Math.floor(fest.teams[1].color.b * 255)}, ${Math.floor(fest.teams[1].color.a)})`)
                    },
                    2: {
                        teamName: fest.teams[2].teamName,
                        image: fest.teams[2].image.url,
                        color: `rgba(${fest.teams[2].color.r * 255}, ${fest.teams[2].color.g * 255}, ${fest.teams[2].color.b * 255}, ${fest.teams[2].color.a})`,
                        colorHEX: RGBAtoHEX(`rgba(${Math.floor(fest.teams[2].color.r * 255)}, ${Math.floor(fest.teams[2].color.g * 255)}, ${Math.floor(fest.teams[2].color.b * 255)}, ${Math.floor(fest.teams[2].color.a)})`)
                    }
                }
            })
        })
    })
    return data;
};