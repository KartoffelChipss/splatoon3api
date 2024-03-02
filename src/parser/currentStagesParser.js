const { getImageFromRuleId } = require("../utils.js");

function parse(json, translation) {
    let data = {};

    if (json.data.regularSchedules.nodes[0].regularMatchSetting) {
        data.regular = {
            start_time: json.data.regularSchedules.nodes[0].startTime,
            end_time: json.data.regularSchedules.nodes[0].endTime,
            stage1: {
                name: translation.stages[json.data.regularSchedules.nodes[0].regularMatchSetting.vsStages[0].id].name,
                image: json.data.regularSchedules.nodes[0].regularMatchSetting.vsStages[0].image.url
            },
            stage2: {
                name: translation.stages[json.data.regularSchedules.nodes[0].regularMatchSetting.vsStages[1].id].name,
                image: json.data.regularSchedules.nodes[0].regularMatchSetting.vsStages[1].image.url
            },
            rules: translation.rules[json.data.regularSchedules.nodes[0].regularMatchSetting.vsRule.id].name,
            rulesImg: getImageFromRuleId(json.data.regularSchedules.nodes[0].regularMatchSetting.vsRule.id)
        }
    } else {
        data.regular = null;
    }

    if (json.data.bankaraSchedules.nodes[0].bankaraMatchSettings) {
        data.ranked = {
            series: {
                start_time: json.data.bankaraSchedules.nodes[0].startTime,
                end_time: json.data.bankaraSchedules.nodes[0].endTime,
                stage1: {
                    name: translation.stages[json.data.bankaraSchedules.nodes[0].bankaraMatchSettings[0].vsStages[0].id].name,
                    image: json.data.bankaraSchedules.nodes[0].bankaraMatchSettings[0].vsStages[0].image.url
                },
                stage2: {
                    name: translation.stages[json.data.bankaraSchedules.nodes[0].bankaraMatchSettings[0].vsStages[1].id].name,
                    image: json.data.bankaraSchedules.nodes[0].bankaraMatchSettings[0].vsStages[1].image.url
                },
                rules: translation.rules[json.data.bankaraSchedules.nodes[0].bankaraMatchSettings[0].vsRule.id].name,
                rulesImg: getImageFromRuleId(json.data.bankaraSchedules.nodes[0].bankaraMatchSettings[0].vsRule.id)
            },
            open: {
                start_time: json.data.bankaraSchedules.nodes[0].startTime,
                end_time: json.data.bankaraSchedules.nodes[0].endTime,
                stage1: {
                    name: translation.stages[json.data.bankaraSchedules.nodes[0].bankaraMatchSettings[1].vsStages[0].id].name,
                    image: json.data.bankaraSchedules.nodes[0].bankaraMatchSettings[1].vsStages[0].image.url
                },
                stage2: {
                    name: translation.stages[json.data.bankaraSchedules.nodes[0].bankaraMatchSettings[1].vsStages[1].id].name,
                    image: json.data.bankaraSchedules.nodes[0].bankaraMatchSettings[1].vsStages[1].image.url
                },
                rules: translation.rules[json.data.bankaraSchedules.nodes[0].bankaraMatchSettings[1].vsRule.id].name,
                rulesImg: getImageFromRuleId(json.data.bankaraSchedules.nodes[0].bankaraMatchSettings[1].vsRule.id)
            }
        }
    } else {
        data.ranked = null;
    }

    if (json.data.xSchedules.nodes[0].xMatchSetting) {
        data.xbattle = {
            start_time: json.data.xSchedules.nodes[0].startTime,
            end_time: json.data.xSchedules.nodes[0].endTime,
            stage1: {
                name: translation.stages[json.data.xSchedules.nodes[0].xMatchSetting.vsStages[0].id].name,
                image: json.data.xSchedules.nodes[0].xMatchSetting.vsStages[0].image.url
            },
            stage2: {
                name: translation.stages[json.data.xSchedules.nodes[0].xMatchSetting.vsStages[1].id].name,
                image: json.data.xSchedules.nodes[0].xMatchSetting.vsStages[1].image.url
            },
            rules: translation.rules[json.data.xSchedules.nodes[0].xMatchSetting.vsRule.id].name,
            rulesImg: getImageFromRuleId(json.data.xSchedules.nodes[0].xMatchSetting.vsRule.id),
        }
    } else {
        data.xbattle = null;
    }

    if (json.data.festSchedules.nodes[0].festMatchSettings) {
        let node = json.data.festSchedules.nodes[0];
        let returnObj = {};

        for (let setting of node.festMatchSettings) {
            returnObj[setting.festMode.toLowerCase()] = {
                start_time: node.startTime,
                end_time: node.endTime,
                stage1: {
                    name: translation.stages[setting.vsStages[0].id].name,
                    image: setting.vsStages[0].image.url
                },
                stage2: {
                    name: translation.stages[setting.vsStages[1].id].name,
                    image: setting.vsStages[1].image.url
                },
                rules: translation.rules[setting.vsRule.id].name,
                rulesImg: getImageFromRuleId(setting.vsRule.id),
                festMode: setting.festMode,
            }
        }

        data.festSchedule = returnObj;
    } else {
        data.festSchedule = null;
    }

    if (json.data.currentFest) {
        data.triColorStage = {
            start_time: json.data.currentFest.startTime,
            end_time: json.data.currentFest.endTime,
            name: translation.stages[json.data.currentFest.tricolorStage.id]?.name,
            image: json.data.currentFest.tricolorStage.image.url,
            rulesImg: "https://file.strassburger.org/tricolor.svg",
        }
    } else {
        data.triColorStage = null;
    }

    return data;
}

module.exports = parse;