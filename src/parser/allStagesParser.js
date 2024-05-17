const { getImageFromRuleId } = require("../utils.js");

function parse(json, translation) {
    let data = {
        regular: [],
        ranked: [],
        xbattle: [],
        festSchedule: [],
    };

    json.data.regularSchedules.nodes.forEach((node, index) => {
        if (node.regularMatchSetting) {
            data.regular.push({
                start_time: node.startTime,
                end_time: node.endTime,
                stage1: {
                    name: translation.stages[node.regularMatchSetting.vsStages[0].id].name,
                    image: node.regularMatchSetting.vsStages[0].image.url
                },
                stage2: {
                    name: translation.stages[node.regularMatchSetting.vsStages[1].id].name,
                    image: node.regularMatchSetting.vsStages[1].image.url
                },
                rules: translation.rules[node.regularMatchSetting.vsRule.id].name,
                rulesImg: getImageFromRuleId(node.regularMatchSetting.vsRule.id)
            });
        } else {
            data.regular.push(null);
        }
    });

    json.data.bankaraSchedules.nodes.forEach((node, index) => {
        if (node.bankaraMatchSettings) {
            data.ranked.push({
                series: {
                    start_time: node.startTime,
                    end_time: node.endTime,
                    stage1: {
                        name: translation.stages[node.bankaraMatchSettings[0].vsStages[0].id].name,
                        image: node.bankaraMatchSettings[0].vsStages[0].image.url
                    },
                    stage2: {
                        name: translation.stages[node.bankaraMatchSettings[0].vsStages[1].id].name,
                        image: node.bankaraMatchSettings[0].vsStages[1].image.url
                    },
                    rules: translation.rules[node.bankaraMatchSettings[0].vsRule.id].name,
                    rulesImg: getImageFromRuleId(node.bankaraMatchSettings[0].vsRule.id)
                },
                open: {
                    start_time: node.startTime,
                    end_time: node.endTime,
                    stage1: {
                        name: translation.stages[node.bankaraMatchSettings[1].vsStages[0].id].name,
                        image: node.bankaraMatchSettings[1].vsStages[0].image.url
                    },
                    stage2: {
                        name: translation.stages[node.bankaraMatchSettings[1].vsStages[1].id].name,
                        image: node.bankaraMatchSettings[1].vsStages[1].image.url
                    },
                    rules: translation.rules[node.bankaraMatchSettings[1].vsRule.id].name,
                    rulesImg: getImageFromRuleId(node.bankaraMatchSettings[1].vsRule.id)
                }
            });
        } else {
            data.ranked.push(null);
        }
    });

    json.data.xSchedules.nodes.forEach((node, index) => {
        if (node.xMatchSetting) {
            data.xbattle.push({
                start_time: node.startTime,
                end_time: node.endTime,
                stage1: {
                    name: translation.stages[node.xMatchSetting.vsStages[0].id].name,
                    image: node.xMatchSetting.vsStages[0].image.url
                },
                stage2: {
                    name: translation.stages[node.xMatchSetting.vsStages[1].id].name,
                    image: node.xMatchSetting.vsStages[1].image.url
                },
                rules: translation.rules[node.xMatchSetting.vsRule.id].name,
                rulesImg: getImageFromRuleId(node.xMatchSetting.vsRule.id),
            });
        } else {
            data.xbattle.push(null);
        }
    });

    json.data.festSchedules.nodes.forEach((node, index) => {
        if (node.festMatchSettings) {
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

            data.festSchedule.push(returnObj);
        } else {
            data.festSchedule.push(null);
        }
    });

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