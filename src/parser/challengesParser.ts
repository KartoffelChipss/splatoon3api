import { SplatChallenge } from '../types/challenges';
import { getImageFromRuleId } from '../internal/ruleImages';
import { buildStage } from './stages/shared';

export default function parseChallenges(
    json: any,
    translation: any,
): SplatChallenge[] {
    return json.data.eventSchedules.nodes.map((event: any) => {
        const eventId = event.leagueMatchSetting.leagueMatchEvent.id;
        const ruleId = event.leagueMatchSetting.vsRule.id;

        return {
            id: eventId,
            name: translation.events[eventId]?.name,
            desc: translation.events[eventId]?.desc,
            eventRule: translation.events[eventId]?.regulation,
            gameRuleId: ruleId,
            gameRule: translation.rules[ruleId]?.name,
            gameRuleImg: getImageFromRuleId(ruleId),
            stages: event.leagueMatchSetting.vsStages.map((stage: any) =>
                buildStage(stage, translation),
            ),
            timePeriods: event.timePeriods.map((period: any) => ({
                startTime: period.startTime,
                endTime: period.endTime,
            })),
        };
    });
}
