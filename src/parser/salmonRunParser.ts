import { SalmonResult } from "../types";

export default async function parseSalmonrun(json: any, translation: any, salmonGearURL: any): Promise<SalmonResult> {
    let data: SalmonResult = {
        regularSchedules: [],
        bigRunSchedules: [],
        monthlyGear: null
    };

    json.data.coopGroupingSchedule.regularSchedules.nodes.forEach((node: any, index: number) => {
        if (json.data.coopGroupingSchedule.regularSchedules.nodes[index]) {
            data.regularSchedules![index] = {
                start_time: json.data.coopGroupingSchedule.regularSchedules.nodes[index].startTime,
                end_time: json.data.coopGroupingSchedule.regularSchedules.nodes[index].endTime,
                stage: {
                    name: translation.stages[json.data.coopGroupingSchedule.regularSchedules.nodes[index].setting.coopStage.id]?.name,
                    image: json.data.coopGroupingSchedule.regularSchedules.nodes[index].setting.coopStage.image.url
                },
                weapons: [],
                boss: translation.bosses[json.data.coopGroupingSchedule.regularSchedules.nodes[index].setting.boss.id]?.name
            }

            for (let i = 0; i < 4; i++) {
                data.regularSchedules![index].weapons.push({
                    name: translation.weapons[json.data.coopGroupingSchedule.regularSchedules.nodes[index].setting.weapons[i].__splatoon3ink_id]?.name,
                    image: json.data.coopGroupingSchedule.regularSchedules.nodes[index].setting.weapons[i].image.url
                });
            }
        }
    })

    json.data.coopGroupingSchedule.bigRunSchedules.nodes.forEach((node: any, index: number) => {
        if (json.data.coopGroupingSchedule.bigRunSchedules.nodes[index]) {
            data.bigRunSchedules![index] = {
                start_time: json.data.coopGroupingSchedule.bigRunSchedules.nodes[index].startTime,
                end_time: json.data.coopGroupingSchedule.bigRunSchedules.nodes[index].endTime,
                stage: {
                    name: translation.stages[json.data.coopGroupingSchedule.bigRunSchedules.nodes[index].setting.coopStage.id].name,
                    image: json.data.coopGroupingSchedule.bigRunSchedules.nodes[index].setting.coopStage.image.url
                },
                weapons: [],
                boss: translation.bosses[json.data.coopGroupingSchedule.bigRunSchedules.nodes[index].setting.boss.id]?.name
            }

            for (let i = 0; i < 4; i++) {
                data.bigRunSchedules![index].weapons.push({
                    name: translation.weapons[json.data.coopGroupingSchedule.bigRunSchedules.nodes[index].setting.weapons[i].__splatoon3ink_id]?.name,
                    image: json.data.coopGroupingSchedule.bigRunSchedules.nodes[index].setting.weapons[i].image.url
                });
            }
        }
    })

    return fetch(salmonGearURL)
        .then(res => res.json())
        .then(newJson => {
            data.monthlyGear = {
                name: translation.gear[newJson.data.coopResult.monthlyGear.__splatoon3ink_id]?.name,
                type: translation.gearType[newJson.data.coopResult.monthlyGear.__typename],
                image: newJson.data.coopResult.monthlyGear.image.url
            }
            return data;
        })
        .catch(err => {
            console.error(err);
            return data;
        });
};