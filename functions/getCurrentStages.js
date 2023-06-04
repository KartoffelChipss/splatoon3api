let f = function(translation) {
    fetch(schedulesURL)
        .catch(err => console.error(err))
        .then(res => res.json())
        .then(json => {
            let data = {};
            data.regular = {
                start_time: json.data.regularSchedules.nodes[0].startTime,
                end_time: json.data.regularSchedules.nodes[0].endTime,
                stage1: {
                    name: translation.stages[json.data.regularSchedules.nodes[0].regularMatchSetting.vsStages[0].id].name,
                    image: json.data.regularSchedules.nodes[0].regularMatchSetting.vsStages[0].image.url
                },
                stage2: {
                name: translation.stages[json.data.regularSchedules.nodes[0].regularMatchSetting.vsStages[1].id].name,
                    image: json.data.regularSchedules.nodes[0].regularMatchSetting.vsStages[1].image.url
                },
                rules: translation.rules[json.data.regularSchedules.nodes[0].regularMatchSetting.vsRule.id].name
            }
            data.ranked = {
                series: {
                    start_time: json.data.bankaraSchedules.nodes[0].startTime,
                    end_time: json.data.bankaraSchedules.nodes[0].endTime,
                    stage1: {
                        name: translation.stages[json.data.bankaraSchedules.nodes[0].bankaraMatchSettings[0].vsStages[0].id].name,
                        image: json.data.bankaraSchedules.nodes[0].bankaraMatchSettings[0].vsStages[0].image.url
                    },
                    stage2: {
                        name: translation.stages[json.data.bankaraSchedules.nodes[0].bankaraMatchSettings[0].vsStages[1].id].name,
                        image: json.data.bankaraSchedules.nodes[0].bankaraMatchSettings[0].vsStages[1].image.url
                    },
                    rules: translation.rules[json.data.bankaraSchedules.nodes[0].bankaraMatchSettings[0].vsRule.id].name
                },
                open: {
                    start_time: json.data.bankaraSchedules.nodes[0].startTime,
                    end_time: json.data.bankaraSchedules.nodes[0].endTime,
                    stage1: {
                        name: translation.stages[json.data.bankaraSchedules.nodes[0].bankaraMatchSettings[1].vsStages[0].id].name,
                        image: json.data.bankaraSchedules.nodes[0].bankaraMatchSettings[1].vsStages[0].image.url
                    },
                    stage2: {
                        name: translation.stages[json.data.bankaraSchedules.nodes[0].bankaraMatchSettings[1].vsStages[1].id].name,
                        image: json.data.bankaraSchedules.nodes[0].bankaraMatchSettings[1].vsStages[1].image.url
                    },
                    rules: translation.rules[json.data.bankaraSchedules.nodes[0].bankaraMatchSettings[1].vsRule.id].name
                }
                }
            data.xbattle = {
                start_time: json.data.xSchedules.nodes[0].startTime,
                end_time: json.data.xSchedules.nodes[0].endTime,
                stage1: {
                    name: translation.stages[json.data.xSchedules.nodes[0].xMatchSetting.vsStages[0].id].name,
                    image: json.data.xSchedules.nodes[0].xMatchSetting.vsStages[0].image.url
                },
                stage2: {
                    name: translation.stages[json.data.xSchedules.nodes[0].xMatchSetting.vsStages[1].id].name,
                    image: json.data.xSchedules.nodes[0].xMatchSetting.vsStages[1].image.url
                },
                rules: translation.rules[json.data.xSchedules.nodes[0].xMatchSetting.vsRule.id].name
            }

            return callback(data);
        });
}

module.exports = f;