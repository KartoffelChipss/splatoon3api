import { SplatChallenge } from "../types";
import { getImageFromRuleId } from "../utils";

export default function parseChallenges(json: any, translation: any): SplatChallenge[] {
    let data: SplatChallenge[] = [];

    json.data.eventSchedules.nodes.forEach((event: any) => {
        let eventData: SplatChallenge = {
            name: translation.events[event.leagueMatchSetting.leagueMatchEvent.id]?.name,
            desc: translation.events[event.leagueMatchSetting.leagueMatchEvent.id]?.desc,
            eventRule: translation.events[event.leagueMatchSetting.leagueMatchEvent.id]?.regulation,
            gameRule: translation.rules[event.leagueMatchSetting.vsRule.id]?.name,
            gameRuleImg: getImageFromRuleId(event.leagueMatchSetting.vsRule.id),
            stages: [],
            timePeriods: [],
        }

        event.leagueMatchSetting.vsStages.forEach((stage: any) => {
            eventData.stages.push({
                name: translation.stages[stage.id]?.name,
                image: stage.image.url,
            });
        });

        event.timePeriods.forEach((period: any) => {
            eventData.timePeriods.push({
                startTime: period.startTime,
                endTime: period.endTime,
            });
        });

        data.push(eventData)
    });

    return data;
};