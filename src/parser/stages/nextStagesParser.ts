import { StagesResponse } from '../../types/stages';
import {
    buildFestMatchSetting,
    buildRankedModes,
    buildRotation,
    buildTricolorStage,
    buildTricolorStages,
} from './shared';

export default function parseNextStages(json: any, translation: any): StagesResponse {
    const regularNode = json.data.regularSchedules.nodes[1];
    const bankaraNode = json.data.bankaraSchedules.nodes[1];
    const xNode = json.data.xSchedules.nodes[1];
    const festNode = json.data.festSchedules.nodes[1];

    return {
        regular: regularNode?.regularMatchSetting
            ? buildRotation(
                  regularNode.startTime,
                  regularNode.endTime,
                  regularNode.regularMatchSetting,
                  translation
              )
            : null,
        ranked: bankaraNode?.bankaraMatchSettings
            ? buildRankedModes(
                  bankaraNode.startTime,
                  bankaraNode.endTime,
                  bankaraNode.bankaraMatchSettings,
                  translation
              )
            : null,
        xbattle: xNode?.xMatchSetting
            ? buildRotation(xNode.startTime, xNode.endTime, xNode.xMatchSetting, translation)
            : null,
        festSchedule: festNode?.festMatchSettings
            ? buildFestMatchSetting(
                  festNode.startTime,
                  festNode.endTime,
                  festNode.festMatchSettings,
                  translation
              )
            : null,
        triColorStage: buildTricolorStage(json.data.currentFest, translation),
        triColorStages: buildTricolorStages(json.data.currentFest, translation),
    };
}
