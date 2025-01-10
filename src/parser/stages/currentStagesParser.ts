import { getImageFromRuleId } from "../../utils.js";
import { FestMatchSetting, StagesResponse } from "../../types.js";

export default function parseCurrentStages(json: any, translation: any): StagesResponse {
    let data: Partial<StagesResponse> = {};

    const getCurrentNode = (nodes: any[]) => {
        const now = new Date();
        return nodes.find(node => new Date(node.startTime) <= now && new Date(node.endTime) > now) || null;
    };

    const regularNode = getCurrentNode(json.data.regularSchedules.nodes);
    if (regularNode.regularMatchSetting) {
        data.regular = {
            start_time: regularNode.startTime,
            end_time: regularNode.endTime,
            stage1: {
                name: translation.stages[regularNode.regularMatchSetting.vsStages[0].id]?.name,
                image: regularNode.regularMatchSetting.vsStages[0].image.url
            },
            stage2: {
                name: translation.stages[regularNode.regularMatchSetting.vsStages[1].id]?.name,
                image: regularNode.regularMatchSetting.vsStages[1].image.url
            },
            rules: translation.rules[regularNode.regularMatchSetting.vsRule.id]?.name,
            rulesImg: getImageFromRuleId(regularNode.regularMatchSetting.vsRule.id)
        }
    } else {
        data.regular = null;
    }

    const bankaraNode = getCurrentNode(json.data.bankaraSchedules.nodes);
    if (bankaraNode.bankaraMatchSettings) {
        data.ranked = {
            series: {
                start_time: bankaraNode.startTime,
                end_time: bankaraNode.endTime,
                stage1: {
                    name: translation.stages[bankaraNode.bankaraMatchSettings[0].vsStages[0].id]?.name,
                    image: bankaraNode.bankaraMatchSettings[0].vsStages[0].image.url
                },
                stage2: {
                    name: translation.stages[bankaraNode.bankaraMatchSettings[0].vsStages[1].id]?.name,
                    image: bankaraNode.bankaraMatchSettings[0].vsStages[1].image.url
                },
                rules: translation.rules[bankaraNode.bankaraMatchSettings[0].vsRule.id]?.name,
                rulesImg: getImageFromRuleId(bankaraNode.bankaraMatchSettings[0].vsRule.id)
            },
            open: {
                start_time: bankaraNode.startTime,
                end_time: bankaraNode.endTime,
                stage1: {
                    name: translation.stages[bankaraNode.bankaraMatchSettings[1].vsStages[0].id]?.name,
                    image: bankaraNode.bankaraMatchSettings[1].vsStages[0].image.url
                },
                stage2: {
                    name: translation.stages[bankaraNode.bankaraMatchSettings[1].vsStages[1].id]?.name,
                    image: bankaraNode.bankaraMatchSettings[1].vsStages[1].image.url
                },
                rules: translation.rules[bankaraNode.bankaraMatchSettings[1].vsRule.id]?.name,
                rulesImg: getImageFromRuleId(bankaraNode.bankaraMatchSettings[1].vsRule.id)
            }
        }
    } else {
        data.ranked = null;
    }

    const xNode = getCurrentNode(json.data.xSchedules.nodes);
    if (xNode.xMatchSetting) {
        data.xbattle = {
            start_time: xNode.startTime,
            end_time: xNode.endTime,
            stage1: {
                name: translation.stages[xNode.xMatchSetting.vsStages[0].id]?.name,
                image: xNode.xMatchSetting.vsStages[0].image.url
            },
            stage2: {
                name: translation.stages[xNode.xMatchSetting.vsStages[1].id]?.name,
                image: xNode.xMatchSetting.vsStages[1].image.url
            },
            rules: translation.rules[xNode.xMatchSetting.vsRule.id]?.name,
            rulesImg: getImageFromRuleId(xNode.xMatchSetting.vsRule.id),
        }
    } else {
        data.xbattle = null;
    }

    const festNode = getCurrentNode(json.data.festSchedules.nodes);
    if (festNode.festMatchSettings) {
        let returnObj: FestMatchSetting = {
            regular: null,
            challenge: null
        };

        for (let setting of festNode.festMatchSettings) {
            returnObj[setting.festMode.toLowerCase() as keyof FestMatchSetting] = {
                start_time: festNode.startTime,
                end_time: festNode.endTime,
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

        data.festSchedule = returnObj;
    } else {
        data.festSchedule = null;
    }

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
        data.triColorStages = null
        data.triColorStage = null;
    }

    return data as StagesResponse;
}