async function parse(json, translation, salmonGearURL, callback) {
    let data = {};
    data.regularSchedules = {};

    json.data.coopGroupingSchedule.regularSchedules.nodes.forEach((node, index) => {
        if (json.data.coopGroupingSchedule.regularSchedules.nodes[index]) {
            data.regularSchedules[index] = {
                start_time: json.data.coopGroupingSchedule.regularSchedules.nodes[index].startTime,
                end_time: json.data.coopGroupingSchedule.regularSchedules.nodes[index].endTime,
                stage: {
                    name: translation.stages[json.data.coopGroupingSchedule.regularSchedules.nodes[index].setting.coopStage.id].name,
                    image: json.data.coopGroupingSchedule.regularSchedules.nodes[index].setting.coopStage.image.url
                },
                weapons: {
                    0: {
                        name: translation.weapons[json.data.coopGroupingSchedule.regularSchedules.nodes[index].setting.weapons[0].__splatoon3ink_id].name,
                        image: json.data.coopGroupingSchedule.regularSchedules.nodes[index].setting.weapons[0].image.url
                    },
                    1: {
                        name: translation.weapons[json.data.coopGroupingSchedule.regularSchedules.nodes[index].setting.weapons[1].__splatoon3ink_id].name,
                        image: json.data.coopGroupingSchedule.regularSchedules.nodes[index].setting.weapons[1].image.url
                    },
                    2: {
                        name: translation.weapons[json.data.coopGroupingSchedule.regularSchedules.nodes[index].setting.weapons[2].__splatoon3ink_id].name,
                        image: json.data.coopGroupingSchedule.regularSchedules.nodes[index].setting.weapons[2].image.url
                    },
                    3: {
                        name: translation.weapons[json.data.coopGroupingSchedule.regularSchedules.nodes[index].setting.weapons[3].__splatoon3ink_id].name,
                        image: json.data.coopGroupingSchedule.regularSchedules.nodes[index].setting.weapons[3].image.url
                    }
                }
            }
        }
    })

    data.bigRunSchedules = {};

    json.data.coopGroupingSchedule.bigRunSchedules.nodes.forEach((node, index) => {
        if (json.data.coopGroupingSchedule.bigRunSchedules.nodes[index]) {
            data.bigRunSchedules[index] = {
                start_time: json.data.coopGroupingSchedule.bigRunSchedules.nodes[index].startTime,
                end_time: json.data.coopGroupingSchedule.bigRunSchedules.nodes[index].endTime,
                stage: {
                    name: translation.stages[json.data.coopGroupingSchedule.bigRunSchedules.nodes[index].setting.coopStage.id].name,
                    image: json.data.coopGroupingSchedule.bigRunSchedules.nodes[index].setting.coopStage.image.url
                },
                weapons: {
                    0: {
                        name: translation.weapons[json.data.coopGroupingSchedule.bigRunSchedules.nodes[index].setting.weapons[0].__splatoon3ink_id].name,
                        image: json.data.coopGroupingSchedule.bigRunSchedules.nodes[index].setting.weapons[0].image.url
                    },
                    1: {
                        name: translation.weapons[json.data.coopGroupingSchedule.bigRunSchedules.nodes[index].setting.weapons[1].__splatoon3ink_id].name,
                        image: json.data.coopGroupingSchedule.bigRunSchedules.nodes[index].setting.weapons[1].image.url
                    },
                    2: {
                        name: translation.weapons[json.data.coopGroupingSchedule.bigRunSchedules.nodes[index].setting.weapons[2].__splatoon3ink_id].name,
                        image: json.data.coopGroupingSchedule.bigRunSchedules.nodes[index].setting.weapons[2].image.url
                    },
                    3: {
                        name: translation.weapons[json.data.coopGroupingSchedule.bigRunSchedules.nodes[index].setting.weapons[3].__splatoon3ink_id].name,
                        image: json.data.coopGroupingSchedule.bigRunSchedules.nodes[index].setting.weapons[3].image.url
                    }
                }
            }
        }
    })

    fetch(salmonGearURL)
        .catch(err => console.error(err))
        .then(res => res.json())
        .then(newJson => {
            data.monthlyGear = {
                name: translation.gear[newJson.data.coopResult.monthlyGear.__splatoon3ink_id].name,
                type: translation.gearType[newJson.data.coopResult.monthlyGear.__typename],
                image: newJson.data.coopResult.monthlyGear.image.url
            }

            return callback(data);
        });
};

module.exports = parse;