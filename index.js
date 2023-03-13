const fetch = require('node-fetch/');
// If the above does not work, use this instead:
// const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));

const compatibleLanguages = ["en", "de", "nl", "fr", "es", "it", "ru", "jp"];

const schedulesURL = "https://splatoon3.ink/data/schedules.json";
const salmonGearURL = "https://splatoon3.ink/data/coop.json";
const gearURL = "https://splatoon3.ink/data/gear.json";
const festURL = "https://splatoon3.ink/data/festivals.json";

function RGBAToHexA(rgba, forceRemoveAlpha = false) {
    return "#" + rgba.replace(/^rgba?\(|\s+|\)$/g, '') // Get's rgba / rgb string values
        .split(',') // splits them at ","
        .filter((string, index) => !forceRemoveAlpha || index !== 3)
        .map(string => parseFloat(string)) // Converts them to numbers
        .map((number, index) => index === 3 ? Math.round(number * 255) : number) // Converts alpha to 255 number
        .map(number => number.toString(16)) // Converts numbers to hex
        .map(string => string.length === 1 ? "0" + string : string) // Adds 0 when length of one number is 1
        .join("") // Puts the array to togehter to a string
}

class Client {
	constructor(lang) {
		if(!lang) {lang = "en"}
		if(lang.toLowerCase() === "en" || !compatibleLanguages[lang]) {
			this.translation = require("./lang/en-GB.json");
		}
		if(lang.toLowerCase() === "de") {
			this.translation = require("./lang/de-DE.json");
		}
        if(lang.toLowerCase() === "nl") {
			this.translation = require("./lang/nl-NL.json");
		}
        if(lang.toLowerCase() === "fr") {
			this.translation = require("./lang/fr-FR.json");
		}
        if(lang.toLowerCase() === "es") {
			this.translation = require("./lang/es-ES.json");
		}
        if(lang.toLowerCase() === "it") {
			this.translation = require("./lang/it-IT.json");
		}
        if(lang.toLowerCase() === "ru") {
			this.translation = require("./lang/ru-RU.json");
		}
        if(lang.toLowerCase() === "jp") {
			this.translation = require("./lang/ja-JP.json");
		}
	}

	getCurrentStages(callback) {
		if(!callback) {return console.log("Splatoon3api - Please enter a function!")};
		fetch(schedulesURL)
			.catch(err => console.error(err))
		  	.then(res => res.json())
		  	.then(json => {
		  		let data = {};
		  		data.regular = {
		  			start_time: json.data.regularSchedules.nodes[0].startTime,
		  			end_time: json.data.regularSchedules.nodes[0].endTime,
		  			stage1: {
		  				name: this.translation.stages[json.data.regularSchedules.nodes[0].regularMatchSetting.vsStages[0].id].name,
		  				image: json.data.regularSchedules.nodes[0].regularMatchSetting.vsStages[0].image.url
		  			},
		  			stage2: {
						name: this.translation.stages[json.data.regularSchedules.nodes[0].regularMatchSetting.vsStages[1].id].name,
		  				image: json.data.regularSchedules.nodes[0].regularMatchSetting.vsStages[1].image.url
		  			},
		  			rules: this.translation.rules[json.data.regularSchedules.nodes[0].regularMatchSetting.vsRule.id].name
		  		}
		  		data.ranked = {
                    series: {
                        start_time: json.data.bankaraSchedules.nodes[0].startTime,
                        end_time: json.data.bankaraSchedules.nodes[0].endTime,
                        stage1: {
                            name: this.translation.stages[json.data.bankaraSchedules.nodes[0].bankaraMatchSettings[0].vsStages[0].id].name,
                            image: json.data.bankaraSchedules.nodes[0].bankaraMatchSettings[0].vsStages[0].image.url
                        },
                        stage2: {
                            name: this.translation.stages[json.data.bankaraSchedules.nodes[0].bankaraMatchSettings[0].vsStages[1].id].name,
                            image: json.data.bankaraSchedules.nodes[0].bankaraMatchSettings[0].vsStages[1].image.url
                        },
                        rules: this.translation.rules[json.data.bankaraSchedules.nodes[0].bankaraMatchSettings[0].vsRule.id].name
                    },
                    open: {
                        start_time: json.data.bankaraSchedules.nodes[0].startTime,
                        end_time: json.data.bankaraSchedules.nodes[0].endTime,
                        stage1: {
                            name: this.translation.stages[json.data.bankaraSchedules.nodes[0].bankaraMatchSettings[1].vsStages[0].id].name,
                            image: json.data.bankaraSchedules.nodes[0].bankaraMatchSettings[1].vsStages[0].image.url
                        },
                        stage2: {
                            name: this.translation.stages[json.data.bankaraSchedules.nodes[0].bankaraMatchSettings[1].vsStages[1].id].name,
                            image: json.data.bankaraSchedules.nodes[0].bankaraMatchSettings[1].vsStages[1].image.url
                        },
                        rules: this.translation.rules[json.data.bankaraSchedules.nodes[0].bankaraMatchSettings[1].vsRule.id].name
                    }
		  		}
                data.xbattle = {
                    start_time: json.data.xSchedules.nodes[0].startTime,
                    end_time: json.data.xSchedules.nodes[0].endTime,
                    stage1: {
                        name: this.translation.stages[json.data.xSchedules.nodes[0].xMatchSetting.vsStages[0].id].name,
                        image: json.data.xSchedules.nodes[0].xMatchSetting.vsStages[0].image.url
                    },
                    stage2: {
                      name: this.translation.stages[json.data.xSchedules.nodes[0].xMatchSetting.vsStages[1].id].name,
                        image: json.data.xSchedules.nodes[0].xMatchSetting.vsStages[1].image.url
                    },
                    rules: this.translation.rules[json.data.xSchedules.nodes[0].xMatchSetting.vsRule.id].name
                }
		  		return callback(data);
		  	});
	}

	getNextStages(callback) {
		if(!callback) {return console.log("Splatoon3api - Please enter a function!")};
		fetch(schedulesURL)
			.catch(err => console.error(err))
		  	.then(res => res.json())
		  	.then(json => {
                let data = {};
                data.regular = {
                    start_time: json.data.regularSchedules.nodes[1].startTime,
                    end_time: json.data.regularSchedules.nodes[1].endTime,
                    stage1: {
                        name: this.translation.stages[json.data.regularSchedules.nodes[1].regularMatchSetting.vsStages[0].id].name,
                        image: json.data.regularSchedules.nodes[1].regularMatchSetting.vsStages[0].image.url
                    },
                    stage2: {
                      name: this.translation.stages[json.data.regularSchedules.nodes[1].regularMatchSetting.vsStages[1].id].name,
                        image: json.data.regularSchedules.nodes[1].regularMatchSetting.vsStages[1].image.url
                    },
                    rules: this.translation.rules[json.data.regularSchedules.nodes[1].regularMatchSetting.vsRule.id].name
                }
                data.ranked = {
                  series: {
                      start_time: json.data.bankaraSchedules.nodes[1].startTime,
                      end_time: json.data.bankaraSchedules.nodes[1].endTime,
                      stage1: {
                          name: this.translation.stages[json.data.bankaraSchedules.nodes[1].bankaraMatchSettings[0].vsStages[0].id].name,
                          image: json.data.bankaraSchedules.nodes[1].bankaraMatchSettings[0].vsStages[0].image.url
                      },
                      stage2: {
                          name: this.translation.stages[json.data.bankaraSchedules.nodes[1].bankaraMatchSettings[0].vsStages[1].id].name,
                          image: json.data.bankaraSchedules.nodes[1].bankaraMatchSettings[0].vsStages[1].image.url
                      },
                      rules: this.translation.rules[json.data.bankaraSchedules.nodes[1].bankaraMatchSettings[0].vsRule.id].name
                  },
                  open: {
                      start_time: json.data.bankaraSchedules.nodes[1].startTime,
                      end_time: json.data.bankaraSchedules.nodes[1].endTime,
                      stage1: {
                          name: this.translation.stages[json.data.bankaraSchedules.nodes[1].bankaraMatchSettings[1].vsStages[0].id].name,
                          image: json.data.bankaraSchedules.nodes[1].bankaraMatchSettings[1].vsStages[0].image.url
                      },
                      stage2: {
                          name: this.translation.stages[json.data.bankaraSchedules.nodes[1].bankaraMatchSettings[1].vsStages[1].id].name,
                          image: json.data.bankaraSchedules.nodes[1].bankaraMatchSettings[1].vsStages[1].image.url
                      },
                      rules: this.translation.rules[json.data.bankaraSchedules.nodes[1].bankaraMatchSettings[1].vsRule.id].name
                  }
                }
                data.xbattle = {
                    start_time: json.data.xSchedules.nodes[1].startTime,
                    end_time: json.data.xSchedules.nodes[1].endTime,
                    stage1: {
                        name: this.translation.stages[json.data.xSchedules.nodes[1].xMatchSetting.vsStages[0].id].name,
                        image: json.data.xSchedules.nodes[1].xMatchSetting.vsStages[0].image.url
                    },
                    stage2: {
                      name: this.translation.stages[json.data.xSchedules.nodes[1].xMatchSetting.vsStages[1].id].name,
                        image: json.data.xSchedules.nodes[1].xMatchSetting.vsStages[1].image.url
                    },
                    rules: this.translation.rules[json.data.xSchedules.nodes[1].xMatchSetting.vsRule.id].name
                }
                return callback(data);
		  	});
	}

	getSalmonRun(callback) {
		if(!callback) {return console.log("Splatoon3api - Please enter a function!")};
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
                                name: this.translation.weapons[json.data.coopGroupingSchedule.regularSchedules.nodes[0].setting.weapons[0].__splatoon3ink_id].name,
                                image: json.data.coopGroupingSchedule.regularSchedules.nodes[0].setting.weapons[0].image.url
                            },
		  					1: {
                                name: this.translation.weapons[json.data.coopGroupingSchedule.regularSchedules.nodes[0].setting.weapons[1].__splatoon3ink_id].name,
                                image: json.data.coopGroupingSchedule.regularSchedules.nodes[0].setting.weapons[1].image.url
                            },
		  					2: {
                                name: this.translation.weapons[json.data.coopGroupingSchedule.regularSchedules.nodes[0].setting.weapons[2].__splatoon3ink_id].name,
                                image: json.data.coopGroupingSchedule.regularSchedules.nodes[0].setting.weapons[2].image.url
                            },
		  					3: {
                                name: this.translation.weapons[json.data.coopGroupingSchedule.regularSchedules.nodes[0].setting.weapons[3].__splatoon3ink_id].name,
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
                                name: this.translation.weapons[json.data.coopGroupingSchedule.regularSchedules.nodes[1].setting.weapons[0].__splatoon3ink_id].name,
                                image: json.data.coopGroupingSchedule.regularSchedules.nodes[1].setting.weapons[0].image.url
                            },
                            1: {
                                name: this.translation.weapons[json.data.coopGroupingSchedule.regularSchedules.nodes[1].setting.weapons[1].__splatoon3ink_id].name,
                                image: json.data.coopGroupingSchedule.regularSchedules.nodes[1].setting.weapons[1].image.url
                            },
                                2: {
                                name: this.translation.weapons[json.data.coopGroupingSchedule.regularSchedules.nodes[1].setting.weapons[2].__splatoon3ink_id].name,
                                image: json.data.coopGroupingSchedule.regularSchedules.nodes[1].setting.weapons[2].image.url
                            },
                                3: {
                                name: this.translation.weapons[json.data.coopGroupingSchedule.regularSchedules.nodes[1].setting.weapons[3].__splatoon3ink_id].name,
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
                fetch(salmonGearURL)
                    .catch(err => console.error(err))
                    .then(res => res.json())
                    .then(newJson => {
                        data.monthlyGear = {
                            name: this.translation.gear[newJson.data.coopResult.monthlyGear.__splatoon3ink_id].name,
                            type: this.translation.gearTypes[newJson.data.coopResult.monthlyGear.__typename],
                            image: newJson.data.coopResult.monthlyGear.image.url
                        }
                        
                        return callback(data);
                    });
            });
    }

    getSplatnetGear(callback) {
		if(!callback) {return console.log("Splatoon3api - Please enter a function!")};
		fetch(gearURL)
			.catch(err => console.error(err))
		  	.then(res => res.json())
		  	.then(json => {
                let data = {};
                data.featuredBrand = {
                    name: this.translation.brands[json.data.gesotown.pickupBrand.brand.id].name,
                    banner: json.data.gesotown.pickupBrand.image.url,
                    usualPower: {
                        name: this.translation.powers[json.data.gesotown.pickupBrand.brand.usualGearPower.__splatoon3ink_id].name,
                        image: json.data.gesotown.pickupBrand.brand.usualGearPower.image.url
                    },
                    saleEnd: json.data.gesotown.pickupBrand.saleEndTime,
                    brandGears: {
                        0: {
                            name: this.translation.gear[json.data.gesotown.pickupBrand.brandGears[0].gear.__splatoon3ink_id].name,
                            typ: this.translation.gearTypes[json.data.gesotown.pickupBrand.brandGears[0].gear.__typename],
                            image: json.data.gesotown.pickupBrand.brandGears[0].gear.image.url,
                            primaryGearPower: {
                                name: this.translation.powers[json.data.gesotown.pickupBrand.brandGears[0].gear.primaryGearPower.__splatoon3ink_id].name,
                                image: json.data.gesotown.pickupBrand.brandGears[0].gear.primaryGearPower.image.url
                            },
                            additionalGearPowers: [],
                            price: json.data.gesotown.pickupBrand.brandGears[0].price,
                            saleEnd: json.data.gesotown.pickupBrand.brandGears[0].saleEndTime,
                        },
                        1: {
                            name: this.translation.gear[json.data.gesotown.pickupBrand.brandGears[1].gear.__splatoon3ink_id].name,
                            typ: this.translation.gearTypes[json.data.gesotown.pickupBrand.brandGears[1].gear.__typename],
                            image: json.data.gesotown.pickupBrand.brandGears[1].gear.image.url,
                            primaryGearPower: {
                                name: this.translation.powers[json.data.gesotown.pickupBrand.brandGears[1].gear.primaryGearPower.__splatoon3ink_id].name,
                                image: json.data.gesotown.pickupBrand.brandGears[1].gear.primaryGearPower.image.url
                            },
                            additionalGearPowers: [],
                            price: json.data.gesotown.pickupBrand.brandGears[1].price,
                            saleEnd: json.data.gesotown.pickupBrand.brandGears[1].saleEndTime,
                        },
                        2: {
                            name: this.translation.gear[json.data.gesotown.pickupBrand.brandGears[2].gear.__splatoon3ink_id].name,
                            typ: this.translation.gearTypes[json.data.gesotown.pickupBrand.brandGears[2].gear.__typename],
                            image: json.data.gesotown.pickupBrand.brandGears[2].gear.image.url,
                            primaryGearPower: {
                                name: this.translation.powers[json.data.gesotown.pickupBrand.brandGears[2].gear.primaryGearPower.__splatoon3ink_id].name,
                                image: json.data.gesotown.pickupBrand.brandGears[2].gear.primaryGearPower.image.url
                            },
                            additionalGearPowers: [],
                            price: json.data.gesotown.pickupBrand.brandGears[2].price,
                            saleEnd: json.data.gesotown.pickupBrand.brandGears[2].saleEndTime,
                        }
                    }
                }

                json.data.gesotown.pickupBrand.brandGears[0].gear.additionalGearPowers.forEach(power => {//add Powers to gear 0
                    data.featuredBrand.brandGears[0].additionalGearPowers.unshift({
                        name: this.translation.powers[power.__splatoon3ink_id].name,
                        image: power.image.url
                    })
                });
                json.data.gesotown.pickupBrand.brandGears[1].gear.additionalGearPowers.forEach(power => {//add Powers to gear 1
                    data.featuredBrand.brandGears[1].additionalGearPowers.unshift({
                        name: this.translation.powers[power.__splatoon3ink_id].name,
                        image: power.image.url
                    })
                });
                json.data.gesotown.pickupBrand.brandGears[2].gear.additionalGearPowers.forEach(power => {//add Powers to gear 2
                    data.featuredBrand.brandGears[2].additionalGearPowers.unshift({
                        name: this.translation.powers[power.__splatoon3ink_id].name,
                        image: power.image.url
                    })
                });


                data.limitedGear = {
                    0: {
                        name: this.translation.gear[json.data.gesotown.limitedGears[0].gear.__splatoon3ink_id].name,
                        typ: this.translation.gearTypes[json.data.gesotown.limitedGears[0].gear.__typename],
                        image: json.data.gesotown.limitedGears[0].gear.image.url,
                        primaryGearPower: {
                            name: this.translation.powers[json.data.gesotown.limitedGears[0].gear.primaryGearPower.__splatoon3ink_id].name,
                            image: json.data.gesotown.limitedGears[0].gear.primaryGearPower.image.url
                        },
                        additionalGearPowers: [],
                        price: json.data.gesotown.limitedGears[0].price,
                        saleEnd: json.data.gesotown.limitedGears[0].saleEndTime,
                        brand: {
                            name: this.translation.brands[json.data.gesotown.limitedGears[0].gear.brand.id].name,
                            image: json.data.gesotown.limitedGears[0].gear.brand.image.url
                        }
                    },
                    1: {
                        name: this.translation.gear[json.data.gesotown.limitedGears[1].gear.__splatoon3ink_id].name,
                        typ: this.translation.gearTypes[json.data.gesotown.limitedGears[1].gear.__typename],
                        image: json.data.gesotown.limitedGears[1].gear.image.url,
                        primaryGearPower: {
                            name: this.translation.powers[json.data.gesotown.limitedGears[1].gear.primaryGearPower.__splatoon3ink_id].name,
                            image: json.data.gesotown.limitedGears[1].gear.primaryGearPower.image.url
                        },
                        additionalGearPowers: [],
                        price: json.data.gesotown.limitedGears[1].price,
                        saleEnd: json.data.gesotown.limitedGears[1].saleEndTime,
                        brand: {
                            name: this.translation.brands[json.data.gesotown.limitedGears[1].gear.brand.id].name,
                            image: json.data.gesotown.limitedGears[1].gear.brand.image.url
                        }
                    },
                    2: {
                        name: this.translation.gear[json.data.gesotown.limitedGears[2].gear.__splatoon3ink_id].name,
                        typ: this.translation.gearTypes[json.data.gesotown.limitedGears[2].gear.__typename],
                        image: json.data.gesotown.limitedGears[2].gear.image.url,
                        primaryGearPower: {
                            name: this.translation.powers[json.data.gesotown.limitedGears[2].gear.primaryGearPower.__splatoon3ink_id].name,
                            image: json.data.gesotown.limitedGears[2].gear.primaryGearPower.image.url
                        },
                        additionalGearPowers: [],
                        price: json.data.gesotown.limitedGears[2].price,
                        saleEnd: json.data.gesotown.limitedGears[2].saleEndTime,
                        brand: {
                            name: this.translation.brands[json.data.gesotown.limitedGears[2].gear.brand.id].name,
                            image: json.data.gesotown.limitedGears[2].gear.brand.image.url
                        }
                    },
                    3: {
                        name: this.translation.gear[json.data.gesotown.limitedGears[3].gear.__splatoon3ink_id].name,
                        typ: this.translation.gearTypes[json.data.gesotown.limitedGears[3].gear.__typename],
                        image: json.data.gesotown.limitedGears[3].gear.image.url,
                        primaryGearPower: {
                            name: this.translation.powers[json.data.gesotown.limitedGears[3].gear.primaryGearPower.__splatoon3ink_id].name,
                            image: json.data.gesotown.limitedGears[3].gear.primaryGearPower.image.url
                        },
                        additionalGearPowers: [],
                        price: json.data.gesotown.limitedGears[3].price,
                        saleEnd: json.data.gesotown.limitedGears[3].saleEndTime,
                        brand: {
                            name: this.translation.brands[json.data.gesotown.limitedGears[3].gear.brand.id].name,
                            image: json.data.gesotown.limitedGears[3].gear.brand.image.url
                        }
                    },
                    4: {
                        name: this.translation.gear[json.data.gesotown.limitedGears[4].gear.__splatoon3ink_id].name,
                        typ: this.translation.gearTypes[json.data.gesotown.limitedGears[4].gear.__typename],
                        image: json.data.gesotown.limitedGears[4].gear.image.url,
                        primaryGearPower: {
                            name: this.translation.powers[json.data.gesotown.limitedGears[4].gear.primaryGearPower.__splatoon3ink_id].name,
                            image: json.data.gesotown.limitedGears[4].gear.primaryGearPower.image.url
                        },
                        additionalGearPowers: [],
                        price: json.data.gesotown.limitedGears[4].price,
                        saleEnd: json.data.gesotown.limitedGears[4].saleEndTime,
                        brand: {
                            name: this.translation.brands[json.data.gesotown.limitedGears[4].gear.brand.id].name,
                            image: json.data.gesotown.limitedGears[4].gear.brand.image.url
                        }
                    },
                    5: {
                        name: this.translation.gear[json.data.gesotown.limitedGears[5].gear.__splatoon3ink_id].name,
                        typ: this.translation.gearTypes[json.data.gesotown.limitedGears[5].gear.__typename],
                        image: json.data.gesotown.limitedGears[5].gear.image.url,
                        primaryGearPower: {
                            name: this.translation.powers[json.data.gesotown.limitedGears[5].gear.primaryGearPower.__splatoon3ink_id].name,
                            image: json.data.gesotown.limitedGears[5].gear.primaryGearPower.image.url
                        },
                        additionalGearPowers: [],
                        price: json.data.gesotown.limitedGears[5].price,
                        saleEnd: json.data.gesotown.limitedGears[5].saleEndTime,
                        brand: {
                            name: this.translation.brands[json.data.gesotown.limitedGears[5].gear.brand.id].name,
                            image: json.data.gesotown.limitedGears[5].gear.brand.image.url
                        }
                    }
                }

                json.data.gesotown.limitedGears[0].gear.additionalGearPowers.forEach(power => {
                    data.limitedGear[0].additionalGearPowers.unshift({
                        name: this.translation.powers[power.__splatoon3ink_id].name,
                        image: power.image.url
                    })
                });
                json.data.gesotown.limitedGears[1].gear.additionalGearPowers.forEach(power => {
                    data.limitedGear[1].additionalGearPowers.unshift({
                        name: this.translation.powers[power.__splatoon3ink_id].name,
                        image: power.image.url
                    })
                });
                json.data.gesotown.limitedGears[2].gear.additionalGearPowers.forEach(power => {
                    data.limitedGear[2].additionalGearPowers.unshift({
                        name: this.translation.powers[power.__splatoon3ink_id].name,
                        image: power.image.url
                    })
                });
                json.data.gesotown.limitedGears[3].gear.additionalGearPowers.forEach(power => {
                    data.limitedGear[3].additionalGearPowers.unshift({
                        name: this.translation.powers[power.__splatoon3ink_id].name,
                        image: power.image.url
                    })
                });
                json.data.gesotown.limitedGears[4].gear.additionalGearPowers.forEach(power => {
                    data.limitedGear[4].additionalGearPowers.unshift({
                        name: this.translation.powers[power.__splatoon3ink_id].name,
                        image: power.image.url
                    })
                });
                json.data.gesotown.limitedGears[5].gear.additionalGearPowers.forEach(power => {
                    data.limitedGear[5].additionalGearPowers.unshift({
                        name: this.translation.powers[power.__splatoon3ink_id].name,
                        image: power.image.url
                    })
                });

                return callback(data);
		  	});
	}

    getUpcomingSplatfests(callback) {
		if(!callback) {return console.log("Splatoon3api - Please enter a function!")};
		fetch(festURL)
			.catch(err => console.error(err))
		  	.then(res => res.json())
		  	.then(json => {
                let data = {};

                Object.keys(json).forEach(region => {
                    data[region] = [];
                    json[region].data.festRecords.nodes.forEach(fest => {
                        if (fest.state !== "SCHEDULED") return;
    
                        data[region].push({
                            title: fest.title,
                            startTime: fest.startTime,
                            endTime: fest.endTime,
                            teams: {
                                0: {
                                    teamName: fest.teams[0].teamName,
                                    image: fest.teams[0].image.url,
                                    color: `rgba(${fest.teams[0].color.r * 255}, ${fest.teams[0].color.g * 255}, ${fest.teams[0].color.b * 255}, ${fest.teams[0].color.a})`,
                                    colorHEX: RGBAToHexA(`rgba(${Math.floor(fest.teams[0].color.r * 255)}, ${Math.floor(fest.teams[0].color.g * 255)}, ${Math.floor(fest.teams[0].color.b * 255)}, ${Math.floor(fest.teams[0].color.a)})`)
                                },
                                1: {
                                    teamName: fest.teams[1].teamName,
                                    image: fest.teams[1].image.url,
                                    color: `rgba(${fest.teams[1].color.r * 255}, ${fest.teams[1].color.g * 255}, ${fest.teams[1].color.b * 255}, ${fest.teams[1].color.a})`,
                                    colorHEX: RGBAToHexA(`rgba(${Math.floor(fest.teams[1].color.r * 255)}, ${Math.floor(fest.teams[1].color.g * 255)}, ${Math.floor(fest.teams[1].color.b * 255)}, ${Math.floor(fest.teams[1].color.a)})`)
                                },
                                2: {
                                    teamName: fest.teams[2].teamName,
                                    image: fest.teams[2].image.url,
                                    color: `rgba(${fest.teams[2].color.r * 255}, ${fest.teams[2].color.g * 255}, ${fest.teams[2].color.b * 255}, ${fest.teams[2].color.a})`,
                                    colorHEX: RGBAToHexA(`rgba(${Math.floor(fest.teams[2].color.r * 255)}, ${Math.floor(fest.teams[2].color.g * 255)}, ${Math.floor(fest.teams[2].color.b * 255)}, ${Math.floor(fest.teams[2].color.a)})`)
                                }
                            }
                        })
                    })
                })

                return callback(data);
            });
    }

    getPastSplatfests(callback) {
		if(!callback) {return console.log("Splatoon3api - Please enter a function!")};
		fetch(festURL)
			.catch(err => console.error(err))
		  	.then(res => res.json())
		  	.then(json => {
                let data = {};

                Object.keys(json).forEach(region => {
                    data[region] = [];
                    json[region].data.festRecords.nodes.forEach(fest => {
                        if (fest.state !== "CLOSED") return;
    
                        data[region].push({
                            title: fest.title,
                            startTime: fest.startTime,
                            endTime: fest.endTime,
                            teams: {
                                0: {
                                    teamName: fest.teams[0].teamName,
                                    image: fest.teams[0].image.url,
                                    color: `rgba(${fest.teams[0].color.r * 255}, ${fest.teams[0].color.g * 255}, ${fest.teams[0].color.b * 255}, ${fest.teams[0].color.a})`,
                                    colorHEX: RGBAToHexA(`rgba(${Math.floor(fest.teams[0].color.r * 255)}, ${Math.floor(fest.teams[0].color.g * 255)}, ${Math.floor(fest.teams[0].color.b * 255)}, ${Math.floor(fest.teams[0].color.a)})`),
                                    role: fest.teams[0].role,
                                    results: {
                                        isWinner: fest.teams[0].result.isWinner,
                                        conchShellsRatio: fest.teams[0].result.horagaiRatio,
                                        conchShellsTop: fest.teams[0].result.isHoragaiRatioTop,
                                        voteRatio: fest.teams[0].result.voteRatio,
                                        isVoteTop: fest.teams[0].result.isVoteRatioTop,
                                        regularContributionRatio: fest.teams[0].result.regularContributionRatio,
                                        isRegularContributionTop: fest.teams[0].result.isRegularContributionRatioTop,
                                        proModeContributionRatio: fest.teams[0].result.challengeContributionRatio,
                                        isProModeContributionTop: fest.teams[0].result.isChallengeContributionRatioTop,
                                    }
                                },
                                1: {
                                    teamName: fest.teams[1].teamName,
                                    image: fest.teams[1].image.url,
                                    color: `rgba(${fest.teams[1].color.r * 255}, ${fest.teams[1].color.g * 255}, ${fest.teams[1].color.b * 255}, ${fest.teams[1].color.a})`,
                                    colorHEX: RGBAToHexA(`rgba(${Math.floor(fest.teams[1].color.r * 255)}, ${Math.floor(fest.teams[1].color.g * 255)}, ${Math.floor(fest.teams[1].color.b * 255)}, ${Math.floor(fest.teams[1].color.a)})`),
                                    role: fest.teams[1].role,
                                    results: {
                                        isWinner: fest.teams[1].result.isWinner,
                                        conchShellsRatio: fest.teams[1].result.horagaiRatio,
                                        conchShellsTop: fest.teams[1].result.isHoragaiRatioTop,
                                        voteRatio: fest.teams[1].result.voteRatio,
                                        isVoteTop: fest.teams[1].result.isVoteRatioTop,
                                        regularContributionRatio: fest.teams[1].result.regularContributionRatio,
                                        isRegularContributionTop: fest.teams[1].result.isRegularContributionRatioTop,
                                        proModeContributionRatio: fest.teams[1].result.challengeContributionRatio,
                                        isProModeContributionTop: fest.teams[1].result.isChallengeContributionRatioTop,
                                    }
                                },
                                2: {
                                    teamName: fest.teams[2].teamName,
                                    image: fest.teams[2].image.url,
                                    color: `rgba(${fest.teams[2].color.r * 255}, ${fest.teams[2].color.g * 255}, ${fest.teams[2].color.b * 255}, ${fest.teams[2].color.a})`,
                                    colorHEX: RGBAToHexA(`rgba(${Math.floor(fest.teams[2].color.r * 255)}, ${Math.floor(fest.teams[2].color.g * 255)}, ${Math.floor(fest.teams[2].color.b * 255)}, ${Math.floor(fest.teams[2].color.a)})`),
                                    role: fest.teams[2].role,
                                    results: {
                                        isWinner: fest.teams[2].result.isWinner,
                                        conchShellsRatio: fest.teams[2].result.horagaiRatio,
                                        conchShellsTop: fest.teams[2].result.isHoragaiRatioTop,
                                        voteRatio: fest.teams[2].result.voteRatio,
                                        isVoteTop: fest.teams[2].result.isVoteRatioTop,
                                        regularContributionRatio: fest.teams[2].result.regularContributionRatio,
                                        isRegularContributionTop: fest.teams[2].result.isRegularContributionRatioTop,
                                        proModeContributionRatio: fest.teams[2].result.challengeContributionRatio,
                                        isProModeContributionTop: fest.teams[2].result.isChallengeContributionRatioTop,
                                    }
                                }
                            }
                        })
                    })
                })

                return callback(data);
            });
    }
}


module.exports = {Client: Client}