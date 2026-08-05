import { StagesResponse } from '../../types/stages';
import {
    buildFestMatchSetting,
    buildRankedModes,
    buildRotation,
    buildTricolorStage,
    buildTricolorStages,
} from './shared';

function getCurrentNode(nodes: any[]): any | null {
    const now = new Date();
    return (
        nodes.find((node) => new Date(node.startTime) <= now && new Date(node.endTime) > now) ??
        null
    );
}

export default function parseCurrentStages(json: any, translation: any): StagesResponse {
    const regularNode = getCurrentNode(json.data.regularSchedules.nodes);
    const bankaraNode = getCurrentNode(json.data.bankaraSchedules.nodes);
    const xNode = getCurrentNode(json.data.xSchedules.nodes);
    const festNode = getCurrentNode(json.data.festSchedules.nodes);

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
