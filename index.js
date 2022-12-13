//const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));
const fetch = require('node-fetch/');
const compatibleLanguages = ["en", "de"];

const schedulesURL   = "https://splatoon3.ink/data/schedules.json";

class Client {
	constructor(lang) {
		if(!lang) {lang = "en"}
		if(lang.toLowerCase() === "en" || !compatibleLanguages[lang]) {
			this.translation = require("./lang/english.json");
		}
		if(lang.toLowerCase() === "de") {
			this.translation = require("./lang/german.json");
		}
	}

	getCurrentStages(callback) {
		if(!callback) {return console.log("Splatoon2api - Please enter a function!")};
		fetch(schedulesURL)
			.catch(err => console.error(err))
		  	.then(res => res.json())
		  	.then(json => {
		  		let data = {};
		  		data.regular = {
		  			start_time: json.data.regularSchedules.nodes[0].startTime,
		  			end_time: json.data.regularSchedules.nodes[0].endTime,
		  			stage1: {
		  				name: this.translation.stages[json.data.regularSchedules.nodes[0].regularMatchSetting.vsStages[0].vsStageId].name,
		  				image: json.data.regularSchedules.nodes[0].regularMatchSetting.vsStages[0].image.url
		  			},
		  			stage2: {
						name: this.translation.stages[json.data.regularSchedules.nodes[0].regularMatchSetting.vsStages[1].vsStageId].name,
		  				image: json.data.regularSchedules.nodes[0].regularMatchSetting.vsStages[1].image.url
		  			},
		  			rules: this.translation.rules[json.data.regularSchedules.nodes[0].regularMatchSetting.vsRule.rule].name
		  		}
		  		data.ranked = {
                    series: {
                        start_time: json.data.bankaraSchedules.nodes[0].startTime,
                        end_time: json.data.bankaraSchedules.nodes[0].endTime,
                        stage1: {
                            name: this.translation.stages[json.data.bankaraSchedules.nodes[0].bankaraMatchSettings[0].vsStages[0].vsStageId].name,
                            image: json.data.bankaraSchedules.nodes[0].bankaraMatchSettings[0].vsStages[0].image.url
                        },
                        stage2: {
                            name: this.translation.stages[json.data.bankaraSchedules.nodes[0].bankaraMatchSettings[0].vsStages[1].vsStageId].name,
                            image: json.data.bankaraSchedules.nodes[0].bankaraMatchSettings[0].vsStages[1].image.url
                        },
                        rules: this.translation.rules[json.data.bankaraSchedules.nodes[0].bankaraMatchSettings[0].vsRule.rule].name
                    },
                    open: {
                        start_time: json.data.bankaraSchedules.nodes[0].startTime,
                        end_time: json.data.bankaraSchedules.nodes[0].endTime,
                        stage1: {
                            name: this.translation.stages[json.data.bankaraSchedules.nodes[0].bankaraMatchSettings[1].vsStages[0].vsStageId].name,
                            image: json.data.bankaraSchedules.nodes[0].bankaraMatchSettings[1].vsStages[0].image.url
                        },
                        stage2: {
                            name: this.translation.stages[json.data.bankaraSchedules.nodes[0].bankaraMatchSettings[1].vsStages[1].vsStageId].name,
                            image: json.data.bankaraSchedules.nodes[0].bankaraMatchSettings[1].vsStages[1].image.url
                        },
                        rules: this.translation.rules[json.data.bankaraSchedules.nodes[0].bankaraMatchSettings[1].vsRule.rule].name
                    }
		  		}
                data.xbattle = {
                    start_time: json.data.xSchedules.nodes[0].startTime,
                    end_time: json.data.xSchedules.nodes[0].endTime,
                    stage1: {
                        name: this.translation.stages[json.data.xSchedules.nodes[0].xMatchSetting.vsStages[0].vsStageId].name,
                        image: json.data.xSchedules.nodes[0].xMatchSetting.vsStages[0].image.url
                    },
                    stage2: {
                      name: this.translation.stages[json.data.xSchedules.nodes[0].xMatchSetting.vsStages[1].vsStageId].name,
                        image: json.data.xSchedules.nodes[0].xMatchSetting.vsStages[1].image.url
                    },
                    rules: this.translation.rules[json.data.xSchedules.nodes[0].xMatchSetting.vsRule.rule].name
                }
		  		return callback(data);
		  	});
	}

	getNextStages(callback) {
		if(!callback) {return console.log("Splatoon2api - Please enter a function!")};
		fetch(schedulesURL)
			.catch(err => console.error(err))
		  	.then(res => res.json())
		  	.then(json => {
                let data = {};
                data.regular = {
                    start_time: json.data.regularSchedules.nodes[1].startTime,
                    end_time: json.data.regularSchedules.nodes[1].endTime,
                    stage1: {
                        name: this.translation.stages[json.data.regularSchedules.nodes[1].regularMatchSetting.vsStages[0].vsStageId].name,
                        image: json.data.regularSchedules.nodes[1].regularMatchSetting.vsStages[0].image.url
                    },
                    stage2: {
                      name: this.translation.stages[json.data.regularSchedules.nodes[1].regularMatchSetting.vsStages[1].vsStageId].name,
                        image: json.data.regularSchedules.nodes[1].regularMatchSetting.vsStages[1].image.url
                    },
                    rules: this.translation.rules[json.data.regularSchedules.nodes[1].regularMatchSetting.vsRule.rule].name
                }
                data.ranked = {
                  series: {
                      start_time: json.data.bankaraSchedules.nodes[1].startTime,
                      end_time: json.data.bankaraSchedules.nodes[1].endTime,
                      stage1: {
                          name: this.translation.stages[json.data.bankaraSchedules.nodes[1].bankaraMatchSettings[0].vsStages[0].vsStageId].name,
                          image: json.data.bankaraSchedules.nodes[1].bankaraMatchSettings[0].vsStages[0].image.url
                      },
                      stage2: {
                          name: this.translation.stages[json.data.bankaraSchedules.nodes[1].bankaraMatchSettings[0].vsStages[1].vsStageId].name,
                          image: json.data.bankaraSchedules.nodes[1].bankaraMatchSettings[0].vsStages[1].image.url
                      },
                      rules: this.translation.rules[json.data.bankaraSchedules.nodes[1].bankaraMatchSettings[0].vsRule.rule].name
                  },
                  open: {
                      start_time: json.data.bankaraSchedules.nodes[1].startTime,
                      end_time: json.data.bankaraSchedules.nodes[1].endTime,
                      stage1: {
                          name: this.translation.stages[json.data.bankaraSchedules.nodes[1].bankaraMatchSettings[1].vsStages[0].vsStageId].name,
                          image: json.data.bankaraSchedules.nodes[1].bankaraMatchSettings[1].vsStages[0].image.url
                      },
                      stage2: {
                          name: this.translation.stages[json.data.bankaraSchedules.nodes[1].bankaraMatchSettings[1].vsStages[1].vsStageId].name,
                          image: json.data.bankaraSchedules.nodes[1].bankaraMatchSettings[1].vsStages[1].image.url
                      },
                      rules: this.translation.rules[json.data.bankaraSchedules.nodes[1].bankaraMatchSettings[1].vsRule.rule].name
                  }
                }
                data.xbattle = {
                    start_time: json.data.xSchedules.nodes[1].startTime,
                    end_time: json.data.xSchedules.nodes[1].endTime,
                    stage1: {
                        name: this.translation.stages[json.data.xSchedules.nodes[1].xMatchSetting.vsStages[0].vsStageId].name,
                        image: json.data.xSchedules.nodes[1].xMatchSetting.vsStages[0].image.url
                    },
                    stage2: {
                      name: this.translation.stages[json.data.xSchedules.nodes[1].xMatchSetting.vsStages[1].vsStageId].name,
                        image: json.data.xSchedules.nodes[1].xMatchSetting.vsStages[1].image.url
                    },
                    rules: this.translation.rules[json.data.xSchedules.nodes[1].xMatchSetting.vsRule.rule].name
                }
                return callback(data);
		  	});
	}

	getSalmonRun(callback) {
		if(!callback) {return console.log("Splatoon2api - Please enter a function!")};
		fetch(schedulesURL)
			.catch(err => console.error(err))
		  	.then(res => res.json())
		  	.then(json => {
		  		let data = {};
		  		data.details = {
		  			0: {
		  				start_time: json.data.coopGroupingSchedule.regularSchedules.nodes[0].startTime,
		  				end_time:  json.data.coopGroupingSchedule.regularSchedules.nodes[0].endTime,
		  				stage: {
		  					name: this.translation.coop_stages[json.data.coopGroupingSchedule.regularSchedules.nodes[0].setting.coopStage.name].name,
		  					image: json.data.coopGroupingSchedule.regularSchedules.nodes[0].setting.coopStage.image.url
		  				},
		  				weapons: {
		  					0: {
                                name: json.data.coopGroupingSchedule.regularSchedules.nodes[0].setting.weapons[0].name,
                                image: json.data.coopGroupingSchedule.regularSchedules.nodes[0].setting.weapons[0].image.url
                            },
		  					1: {
                                name: json.data.coopGroupingSchedule.regularSchedules.nodes[0].setting.weapons[1].name,
                                image: json.data.coopGroupingSchedule.regularSchedules.nodes[0].setting.weapons[1].image.url
                            },
		  					2: {
                                name: json.data.coopGroupingSchedule.regularSchedules.nodes[0].setting.weapons[2].name,
                                image: json.data.coopGroupingSchedule.regularSchedules.nodes[0].setting.weapons[2].image.url
                            },
		  					3: {
                                name: json.data.coopGroupingSchedule.regularSchedules.nodes[0].setting.weapons[3].name,
                                image: json.data.coopGroupingSchedule.regularSchedules.nodes[0].setting.weapons[3].image.url
                            }
		  				}
		  			},
		  			1: {
                        start_time: json.data.coopGroupingSchedule.regularSchedules.nodes[1].startTime,
                        end_time:  json.data.coopGroupingSchedule.regularSchedules.nodes[1].endTime,
		  				stage: {
		  					name: this.translation.coop_stages[json.data.coopGroupingSchedule.regularSchedules.nodes[1].setting.coopStage.name].name,
		  					image: json.data.coopGroupingSchedule.regularSchedules.nodes[1].setting.coopStage.image.url
		  				},
		  				weapons: {
                            0: {
                                name: json.data.coopGroupingSchedule.regularSchedules.nodes[1].setting.weapons[0].name,
                                image: json.data.coopGroupingSchedule.regularSchedules.nodes[1].setting.weapons[0].image.url
                            },
                            1: {
                                name: json.data.coopGroupingSchedule.regularSchedules.nodes[1].setting.weapons[1].name,
                                image: json.data.coopGroupingSchedule.regularSchedules.nodes[1].setting.weapons[1].image.url
                            },
                                2: {
                                name: json.data.coopGroupingSchedule.regularSchedules.nodes[1].setting.weapons[2].name,
                                image: json.data.coopGroupingSchedule.regularSchedules.nodes[1].setting.weapons[2].image.url
                            },
                                3: {
                                name: json.data.coopGroupingSchedule.regularSchedules.nodes[1].setting.weapons[3].name,
                                image: json.data.coopGroupingSchedule.regularSchedules.nodes[1].setting.weapons[3].image.url
                            }
                        }
		  			}
		  		}
		  		data.next = {
		  			0: {
                        start_time: json.data.coopGroupingSchedule.regularSchedules.nodes[0].startTime,
                        end_time:  json.data.coopGroupingSchedule.regularSchedules.nodes[0].endTime,
		  			},
		  			1: {
                        start_time: json.data.coopGroupingSchedule.regularSchedules.nodes[1].startTime,
                        end_time:  json.data.coopGroupingSchedule.regularSchedules.nodes[1].endTime,
		  			},
		  			2: {
                        start_time: json.data.coopGroupingSchedule.regularSchedules.nodes[2].startTime,
                        end_time:  json.data.coopGroupingSchedule.regularSchedules.nodes[2].endTime,
		  			},
		  			3: {
                        start_time: json.data.coopGroupingSchedule.regularSchedules.nodes[3].startTime,
                        end_time:  json.data.coopGroupingSchedule.regularSchedules.nodes[3].endTime,
		  			},
		  			4: {
                        start_time: json.data.coopGroupingSchedule.regularSchedules.nodes[4].startTime,
                        end_time:  json.data.coopGroupingSchedule.regularSchedules.nodes[4].endTime,
		  			}
		  		}

				return callback(data);
		  	});
	}
}

module.exports = {Client: Client}