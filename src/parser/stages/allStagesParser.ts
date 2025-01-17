import { AllStagesResponse, FestMatchSetting } from "../../types.js";
import { getImageFromRuleId } from "../../utils.js";

export default function parseAllStages(json: any, translation: any): AllStagesResponse {
    let data: AllStagesResponse = {
        regular: [],
        ranked: [],
        xbattle: [],
        festSchedule: [],
        triColorStage: null,
        triColorStages: []
    };

    json.data.regularSchedules.nodes.forEach((node: any, index: number) => {
        if (node.regularMatchSetting) {
            data.regular.push({
                start_time: node.startTime,
                end_time: node.endTime,
                stage1: {
                    name: translation.stages[node.regularMatchSetting.vsStages[0].id]?.name,
                    image: node.regularMatchSetting.vsStages[0].image.url
                },
                stage2: {
                    name: translation.stages[node.regularMatchSetting.vsStages[1].id]?.name,
                    image: node.regularMatchSetting.vsStages[1].image.url
                },
                rules: translation.rules[node.regularMatchSetting.vsRule.id]?.name,
                rulesImg: getImageFromRuleId(node.regularMatchSetting.vsRule.id)
            });
        } else {
            data.regular.push(null);
        }
    });

    json.data.bankaraSchedules.nodes.forEach((node: any, index: number) => {
        if (node.bankaraMatchSettings) {
            data.ranked.push({
                series: {
                    start_time: node.startTime,
                    end_time: node.endTime,
                    stage1: {
                        name: translation.stages[node.bankaraMatchSettings[0].vsStages[0].id]?.name,
                        image: node.bankaraMatchSettings[0].vsStages[0].image.url
                    },
                    stage2: {
                        name: translation.stages[node.bankaraMatchSettings[0].vsStages[1].id]?.name,
                        image: node.bankaraMatchSettings[0].vsStages[1].image.url
                    },
                    rules: translation.rules[node.bankaraMatchSettings[0].vsRule.id]?.name,
                    rulesImg: getImageFromRuleId(node.bankaraMatchSettings[0].vsRule.id)
                },
                open: {
                    start_time: node.startTime,
                    end_time: node.endTime,
                    stage1: {
                        name: translation.stages[node.bankaraMatchSettings[1].vsStages[0].id]?.name,
                        image: node.bankaraMatchSettings[1].vsStages[0].image.url
                    },
                    stage2: {
                        name: translation.stages[node.bankaraMatchSettings[1].vsStages[1].id]?.name,
                        image: node.bankaraMatchSettings[1].vsStages[1].image.url
                    },
                    rules: translation.rules[node.bankaraMatchSettings[1].vsRule.id]?.name,
                    rulesImg: getImageFromRuleId(node.bankaraMatchSettings[1].vsRule.id)
                }
            });
        } else {
            data.ranked.push(null);
        }
    });

    json.data.xSchedules.nodes.forEach((node: any, index: number) => {
        if (node.xMatchSetting) {
            data.xbattle.push({
                start_time: node.startTime,
                end_time: node.endTime,
                stage1: {
                    name: translation.stages[node.xMatchSetting.vsStages[0].id]?.name,
                    image: node.xMatchSetting.vsStages[0].image.url
                },
                stage2: {
                    name: translation.stages[node.xMatchSetting.vsStages[1].id]?.name,
                    image: node.xMatchSetting.vsStages[1].image.url
                },
                rules: translation.rules[node.xMatchSetting.vsRule.id]?.name,
                rulesImg: getImageFromRuleId(node.xMatchSetting.vsRule.id),
            });
        } else {
            data.xbattle.push(null);
        }
    });

    json.data.festSchedules.nodes.forEach((node: any, index: number) => {
        if (node.festMatchSettings) {
            let returnObj: FestMatchSetting = {
                regular: null,
                challenge: null
            };

            for (let setting of node.festMatchSettings) {
                returnObj[setting.festMode.toLowerCase() as keyof FestMatchSetting] = {
                    start_time: node.startTime,
                    end_time: node.endTime,
                    stage1: {
                        name: translation.stages[setting.vsStages[0].id]?.name,
                        image: setting.vsStages[0].image.url
                    },
                    stage2: {
                        name: translation.stages[setting.vsStages[1].id]?.name,
                        image: setting.vsStages[1].image.url
                    },
                    rules: translation.rules[setting.vsRule.id]?.name,
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
        data.triColorStages = json.data.currentFest.tricolorStages ? json.data.currentFest.tricolorStages.map((stage: any) => ({
            start_time: json.data.currentFest.startTime,
            end_time: json.data.currentFest.endTime,
            name: translation.stages[stage.id]?.name,
            image: stage.image.url,
            rulesImg: "https://file.strassburger.org/tricolor.svg",
        })) : null;
        data.triColorStage = json.data.currentFest.tricolorStage ? {
            start_time: json.data.currentFest.startTime,
            end_time: json.data.currentFest.endTime,
            name: translation.stages[json.data.currentFest.tricolorStage.id]?.name,
            image: json.data.currentFest.tricolorStage.image.url,
            rulesImg: "https://file.strassburger.org/tricolor.svg",
        } : null;

    } else {
        data.triColorStages.push(null);
        data.triColorStage = null;
    }

    return data;
}