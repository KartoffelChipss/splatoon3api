import {
    SalmonResult,
    SalmonRunWeapon,
    SalmonSchedule,
} from '../types/salmonRun';

function buildWeapon(weaponNode: any, translation: any): SalmonRunWeapon {
    return {
        id: weaponNode.__splatoon3ink_id,
        name: translation.weapons[weaponNode.__splatoon3ink_id]?.name,
        image: weaponNode.image.url,
    };
}

function buildSchedule(node: any, translation: any): SalmonSchedule {
    return {
        start_time: node.startTime,
        end_time: node.endTime,
        stage: {
            id: node.setting.coopStage.id,
            name: translation.stages[node.setting.coopStage.id]?.name,
            image: node.setting.coopStage.image.url,
        },
        weapons: node.setting.weapons.map((weapon: any) =>
            buildWeapon(weapon, translation),
        ),
        boss: translation.bosses[node.setting.boss.id]?.name,
    };
}

export default function parseSalmonRun(
    scheduleJson: any,
    gearJson: any,
    translation: any,
): SalmonResult {
    const regularSchedules =
        scheduleJson.data.coopGroupingSchedule.regularSchedules.nodes
            .filter((node: any) => node.setting)
            .map((node: any) => buildSchedule(node, translation));

    const bigRunSchedules =
        scheduleJson.data.coopGroupingSchedule.bigRunSchedules.nodes
            .filter((node: any) => node.setting)
            .map((node: any) => buildSchedule(node, translation));

    const monthlyGearNode = gearJson?.data?.coopResult?.monthlyGear;
    const monthlyGear = monthlyGearNode
        ? {
              id: monthlyGearNode.__splatoon3ink_id,
              name: translation.gear[monthlyGearNode.__splatoon3ink_id]?.name,
              type: translation.gearType[monthlyGearNode.__typename],
              typeId: monthlyGearNode.__typename,
              image: monthlyGearNode.image.url,
          }
        : null;

    return { regularSchedules, bigRunSchedules, monthlyGear };
}
