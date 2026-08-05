import { AllStagesResponse } from '../../types/stages';
import {
    buildFestMatchSetting,
    buildRankedModes,
    buildRotation,
    buildTricolorStage,
    buildTricolorStages,
} from './shared';

export default function parseAllStages(
    json: any,
    translation: any,
): AllStagesResponse {
    const regular = json.data.regularSchedules.nodes.map((node: any) =>
        node.regularMatchSetting
            ? buildRotation(
                  node.startTime,
                  node.endTime,
                  node.regularMatchSetting,
                  translation,
              )
            : null,
    );

    const ranked = json.data.bankaraSchedules.nodes.map((node: any) =>
        node.bankaraMatchSettings
            ? buildRankedModes(
                  node.startTime,
                  node.endTime,
                  node.bankaraMatchSettings,
                  translation,
              )
            : null,
    );

    const xbattle = json.data.xSchedules.nodes.map((node: any) =>
        node.xMatchSetting
            ? buildRotation(
                  node.startTime,
                  node.endTime,
                  node.xMatchSetting,
                  translation,
              )
            : null,
    );

    const festSchedule = json.data.festSchedules.nodes.map((node: any) =>
        node.festMatchSettings
            ? buildFestMatchSetting(
                  node.startTime,
                  node.endTime,
                  node.festMatchSettings,
                  translation,
              )
            : null,
    );

    return {
        regular,
        ranked,
        xbattle,
        festSchedule,
        triColorStage: buildTricolorStage(json.data.currentFest, translation),
        triColorStages: buildTricolorStages(
            json.data.currentFest,
            translation,
        ) ?? [null],
    };
}
