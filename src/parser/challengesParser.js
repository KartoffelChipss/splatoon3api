const { getImageFromRuleId } = require("../utils.js");

function parse(json, translation) {
    let data = [];

    json.data.eventSchedules.nodes.forEach((event, index) => {
        let eventData = {
            name: translation.events[event.leagueMatchSetting.leagueMatchEvent.id]?.name,
            desc: translation.events[event.leagueMatchSetting.leagueMatchEvent.id]?.desc,
            eventRule: translation.events[event.leagueMatchSetting.leagueMatchEvent.id]?.regulation,
            gameRule: translation.rules[event.leagueMatchSetting.vsRule.id]?.name,
            gameRuleImg: getImageFromRuleId(event.leagueMatchSetting.vsRule.id),
            stages: [],
            timePeriods: [],
        }

        event.leagueMatchSetting.vsStages.forEach((stage, index) => {
            eventData.stages.push({
                name: translation.stages[stage.id]?.name,
                image: stage.image.url,
            });
        });

        event.timePeriods.forEach((period, index) => {
            eventData.timePeriods.push({
                startTime: period.startTime,
                endTime: period.endTime,
            });
        });

        data.push(eventData)
    });

    return data;
};

module.exports = parse;