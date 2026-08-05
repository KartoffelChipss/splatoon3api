import { SplatStage } from '../../types/common';
import {
    FestMatchSetting,
    FestRotation,
    RankedModes,
    SplatRotation,
    SplatTricolorStage,
} from '../../types/stages';
import { getImageFromRuleId } from '../../internal/ruleImages';

export function buildStage(stageNode: any, translation: any): SplatStage {
    return {
        id: stageNode.id,
        name: translation.stages[stageNode.id]?.name,
        image: stageNode.image.url,
    };
}

export function buildRotation(
    startTime: string,
    endTime: string,
    matchSetting: any,
    translation: any,
): SplatRotation {
    const ruleId = matchSetting.vsRule.id;
    return {
        start_time: startTime,
        end_time: endTime,
        stage1: buildStage(matchSetting.vsStages[0], translation),
        stage2: buildStage(matchSetting.vsStages[1], translation),
        ruleId,
        rules: translation.rules[ruleId]?.name,
        rulesImg: getImageFromRuleId(ruleId),
    };
}

export function buildFestRotation(
    startTime: string,
    endTime: string,
    matchSetting: any,
    translation: any,
): FestRotation {
    return {
        ...buildRotation(startTime, endTime, matchSetting, translation),
        festMode: matchSetting.festMode,
    };
}

export function buildRankedModes(
    startTime: string,
    endTime: string,
    bankaraMatchSettings: any[],
    translation: any,
): RankedModes {
    return {
        series: buildRotation(
            startTime,
            endTime,
            bankaraMatchSettings[0],
            translation,
        ),
        open: buildRotation(
            startTime,
            endTime,
            bankaraMatchSettings[1],
            translation,
        ),
    };
}

export function buildFestMatchSetting(
    startTime: string,
    endTime: string,
    festMatchSettings: any[],
    translation: any,
): FestMatchSetting {
    const result: FestMatchSetting = { regular: null, challenge: null };
    for (const setting of festMatchSettings) {
        const key = setting.festMode.toLowerCase() as keyof FestMatchSetting;
        result[key] = buildFestRotation(
            startTime,
            endTime,
            setting,
            translation,
        );
    }
    return result;
}

export function buildTricolorStage(
    currentFest: any,
    translation: any,
): SplatTricolorStage | null {
    if (!currentFest?.tricolorStage) return null;
    return {
        start_time: currentFest.startTime,
        end_time: currentFest.endTime,
        name: translation.stages[currentFest.tricolorStage.id]?.name,
        image: currentFest.tricolorStage.image.url,
    };
}

export function buildTricolorStages(
    currentFest: any,
    translation: any,
): SplatTricolorStage[] | null {
    if (!currentFest?.tricolorStages) return null;
    return currentFest.tricolorStages.map((stage: any) => ({
        start_time: currentFest.startTime,
        end_time: currentFest.endTime,
        name: translation.stages[stage.id]?.name,
        image: stage.image.url,
    }));
}
