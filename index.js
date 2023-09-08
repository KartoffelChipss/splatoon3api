const fetch = require('node-fetch/');
// If the above does not work, use this instead:
// const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));

const compatibleLanguages = ["de-DE", "en-GB", "en-US", "es-ES", "es-MX", "fr-FR", "fr-CA", "it-IT", "ja-JP", "ko-KR", "nl-NL", "ru-RU", "zh-CN", "zh-TW"];
const oldCompatibleLanguages = ["en", "de", "nl", "fr", "es", "it", "ru", "jp"];

const schedulesURL = "https://splatoon3.ink/data/schedules.json";
const salmonGearURL = "https://splatoon3.ink/data/coop.json";
const gearURL = "https://splatoon3.ink/data/gear.json";
const festURL = "https://splatoon3.ink/data/festivals.json";

const lennyWeaponsURL = "https://leanny.github.io/data/Mush/latest/WeaponInfo_Main.json";

const gearTypeLang = require("./lang/gearTypeLang.json");

const ruleImg_turfwar = "https://splatoon3.ink/assets/regular.81d2e9e4.svg";
const ruleImg_rainmaker = "https://splatoon3.ink/assets/hoko.e3dce940.svg";
const ruleImg_clamblitz = "https://splatoon3.ink/assets/asari.83043125.svg";
const ruleImg_splatzones = "https://splatoon3.ink/assets/area.02968ae6.svg";
const ruleImg_towercontrol = "https://splatoon3.ink/assets/yagura.3d64cf2c.svg";

function getImageFromRuleId(ruleId) {
    if (ruleId === "VnNSdWxlLTQ=") return ruleImg_clamblitz;
    else if (ruleId === "VnNSdWxlLTI=") return ruleImg_towercontrol;
    else if (ruleId === "VnNSdWxlLTE=") return ruleImg_splatzones;
    else if (ruleId === "VnNSdWxlLTM=") return ruleImg_rainmaker;
    else return ruleImg_turfwar;
}

// https://stackoverflow.com/a/73401564
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

var wait = (ms) => {
    const start = Date.now();
    let now = start;
    while (now - start < ms) {
        now = Date.now();
    }
}

function getLennyLangString(lang) {
    switch(lang.toLowerCase()) {
        case "en-us":
            return "USen";
            break;
        case "en-GB":
            return "EUen"
            break;
        case "nl-nl":
            return "EUnl"
            break;
        case "de-de":
            return "EUde"
            break;
        case "fr-fr":
            return "EUfr"
            break;
        case "fr-ca":
            return "USfr"
            break;
        case "es-es":
            return "EUes"
            break;
        case "es-mx":
            return "USes"
            break;
        case "it-it":
            return "EUit"
            break;
        case "ru-ru":
            return "EUru"
            break;
        case "ja-jp":
            return "JPja"
            break;
        case "ko-kr":
            return "EUen"
            break;
        case "zh-cn":
            return "EUen"
            break;
        case "zh-tw":
            return "EUen"
            break;
        default:
            return "EUen"
            break;
    }
}

class Client {
	constructor(lang) {
		if(!lang || typeof lang != 'string' || !lang.includes("-")) lang = "en-GB";

        lang = lang.split("-")[0].toLowerCase() + "-" + lang.split("-")[1].toUpperCase()

        this.lennyLang = "EUen";

        if (!compatibleLanguages.includes(lang)) {
            switch(lang.toLowerCase()) {
                case "en":
                    lang = "en-GB";
                    break;
                case "de":
                    lang = "de-DE";
                    break;
                case "nl":
                    lang = "nl-NL";
                    break;
                case "fr":
                    lang = "fr-FR"
                    break;
                case "es":
                    lang = "es-ES";
                    break;
                case "it":
                    lang = "it-IT";
                    break;
                case "ru":
                    lang = "ru-RU";
                    break;
                case "jp":
                    lang = "ja-JP";
                    break;
                default:
                    lang = "en-GB";
                    break;
            }
        }

        this.lang = lang;

        this.lennyLang = getLennyLangString(lang)
    
        this.langIsResolved = false;
        this.lennyLangIsResolved = false;

        this.langPromise = new Promise((resolve, reject) => {
            fetch(`https://splatoon3.ink/data/locale/${lang}.json`)
                .catch(err => console.error(err))
                .then(res => res.json())
                .then(json => {
                    this.langIsResolved = true;
                    this.translation = json;
                    resolve(json);
                })
        })

        // fetch(`https://leanny.github.io/data/Languages/lang_dict_${this.lennyLang}.json`)
        //         .catch(err => console.error(err))
        //         .then(res => res.json())
        //         .then(json => {
        //             this.lennyLangIsResolved = true;
        //             this.lennyTranslation = json;
        //         })
	}

    // getWeapons(callback) {
	// 	if(!callback) {return console.log("Splatoon3api - Please enter a function!")};
    //     let timeOutTime = 0;
    //     if (!this.lennyLangIsResolved) timeOutTime = 500;
    //     setTimeout(() => {
    //         fetch(lennyWeaponsURL)
    //             .catch(err => console.error(err))
    //             .then(res => res.json())
    //             .then(json => {
    //                 let translation = this.lennyTranslation
    //                 let data = []

    //                 json.forEach((weapon, index) => {
    //                     let weaponObject = {
    //                         name: this.lennyTranslation[weapon.Name],
    //                         image: `https://leanny.github.io/splat3/images/weapon_flat/Path_Wst_${weapon.Name}.webp`,
    //                         sub: {
    //                             name: this.lennyTranslation[weapon.Sub],
    //                             image: `https://leanny.github.io/splat3/images/subspe/Wsb_${weapon.Sub}00.webp`,
    //                         },
    //                         special: {
    //                             name: this.lennyTranslation[weapon.Special],
    //                             image: weapon.Special,
    //                         }
    //                     }

    //                     data.push(weaponObject)
    //                 })
    //                 return callback(data);
    //             })
    //     }, timeOutTime)
    // }

    getStages(callback) {
		if(!callback) {return console.log("Splatoon3api - Please enter a function!")};
        this.langPromise.then((langData) => {
            fetch(schedulesURL)
                .catch(err => console.error(err))
                .then(res => res.json())
                .then(json => {
                    let translation = this.translation
                    let data = {
                        regular: [],
                        ranked: [],
                        xbattle: [],
                        festSchedule: [],
                    };

                    json.data.regularSchedules.nodes.forEach((node, index) => {
                        if (node.regularMatchSetting) {
                            data.regular.push({
                                start_time: node.startTime,
                                end_time: node.endTime,
                                stage1: {
                                    name: translation.stages[node.regularMatchSetting.vsStages[0].id].name,
                                    image: node.regularMatchSetting.vsStages[0].image.url
                                },
                                stage2: {
                                name: translation.stages[node.regularMatchSetting.vsStages[1].id].name,
                                    image: node.regularMatchSetting.vsStages[1].image.url
                                },
                                rules: translation.rules[node.regularMatchSetting.vsRule.id].name,
                                rulesImg: getImageFromRuleId(node.regularMatchSetting.vsRule.id)
                            });
                        } else {
                            data.regular.push(null);
                        }
                    });

                    json.data.bankaraSchedules.nodes.forEach((node, index) => {
                        if (node.bankaraMatchSettings) {
                            data.ranked.push({
                                series: {
                                    start_time: node.startTime,
                                    end_time: node.endTime,
                                    stage1: {
                                        name: translation.stages[node.bankaraMatchSettings[0].vsStages[0].id].name,
                                        image: node.bankaraMatchSettings[0].vsStages[0].image.url
                                    },
                                    stage2: {
                                        name: translation.stages[node.bankaraMatchSettings[0].vsStages[1].id].name,
                                        image: node.bankaraMatchSettings[0].vsStages[1].image.url
                                    },
                                    rules: translation.rules[node.bankaraMatchSettings[0].vsRule.id].name,
                                    rulesImg: getImageFromRuleId(node.bankaraMatchSettings[0].vsRule.id)
                                },
                                open: {
                                    start_time: node.startTime,
                                    end_time: node.endTime,
                                    stage1: {
                                        name: translation.stages[node.bankaraMatchSettings[1].vsStages[0].id].name,
                                        image: node.bankaraMatchSettings[1].vsStages[0].image.url
                                    },
                                    stage2: {
                                        name: translation.stages[node.bankaraMatchSettings[1].vsStages[1].id].name,
                                        image: node.bankaraMatchSettings[1].vsStages[1].image.url
                                    },
                                    rules: translation.rules[node.bankaraMatchSettings[1].vsRule.id].name,
                                    rulesImg: getImageFromRuleId(node.bankaraMatchSettings[1].vsRule.id)
                                }
                            });
                        } else {
                            data.ranked.push(null);
                        }
                    });

                    json.data.xSchedules.nodes.forEach((node, index) => {
                        if (node.xMatchSetting) {
                            data.xbattle.push({
                                start_time: node.startTime,
                                end_time: node.endTime,
                                stage1: {
                                    name: translation.stages[node.xMatchSetting.vsStages[0].id].name,
                                    image: node.xMatchSetting.vsStages[0].image.url
                                },
                                stage2: {
                                    name: translation.stages[node.xMatchSetting.vsStages[1].id].name,
                                    image: node.xMatchSetting.vsStages[1].image.url
                                },
                                rules: translation.rules[node.xMatchSetting.vsRule.id].name,
                                rulesImg: getImageFromRuleId(node.xMatchSetting.vsRule.id),
                            });
                        } else {
                            data.xbattle.push(null);
                        }
                    });

                    json.data.festSchedules.nodes.forEach((node, index) => {
                        if (node.festMatchSetting) {
                            data.festSchedule.push({
                                start_time: node.startTime,
                                end_time: node.endTime,
                                stage1: {
                                    name: translation.stages[node.festMatchSetting.vsStages[0].id].name,
                                    image: node.festMatchSetting.vsStages[0].image.url
                                },
                                stage2: {
                                    name: translation.stages[node.festMatchSetting.vsStages[1].id].name,
                                    image: node.festMatchSetting.vsStages[1].image.url
                                },
                                rules: translation.rules[node.festMatchSetting.vsRule.id].name,
                                rulesImg: getImageFromRuleId(node.festMatchSetting.vsRule.id),
                            });
                        } else {
                            data.festSchedule.push(null);
                        }
                    });

                    if (json.data.currentFest) {
                        data.triColorStage = {
                            start_time: json.data.currentFest.startTime,
                            end_time: json.data.currentFest.endTime,
                            name: this.translation.stages[json.data.currentFest.tricolorStage.id]?.name,
                            image: json.data.currentFest.tricolorStage.image.url,
                            rulesImg: "https://file.strassburger.org/tricolor.svg",
                        }
                    } else {
                        data.triColorStage = null;
                    }

                    return callback(data);
                });
        });
	}

	getCurrentStages(callback) {
		if(!callback) {return console.log("Splatoon3api - Please enter a function!")};
        this.langPromise.then((langData) => {
            fetch(schedulesURL)
                .catch(err => console.error(err))
                .then(res => res.json())
                .then(json => {
                    let translation = this.translation
                    let data = {};

                    if (json.data.regularSchedules.nodes[0].regularMatchSetting) {
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
                            rules: translation.rules[json.data.regularSchedules.nodes[0].regularMatchSetting.vsRule.id].name,
                            rulesImg: getImageFromRuleId(json.data.regularSchedules.nodes[0].regularMatchSetting.vsRule.id)
                        }
                    } else {
                        data.regular = null;
                    }

                    if (json.data.bankaraSchedules.nodes[0].bankaraMatchSettings) {
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
                                rules: translation.rules[json.data.bankaraSchedules.nodes[0].bankaraMatchSettings[0].vsRule.id].name,
                                rulesImg: getImageFromRuleId(json.data.bankaraSchedules.nodes[0].bankaraMatchSettings[0].vsRule.id)
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
                                rules: translation.rules[json.data.bankaraSchedules.nodes[0].bankaraMatchSettings[1].vsRule.id].name,
                                rulesImg: getImageFromRuleId(json.data.bankaraSchedules.nodes[0].bankaraMatchSettings[1].vsRule.id)
                            }
                        }
                    } else {
                        data.ranked = null;
                    }

                    if (json.data.xSchedules.nodes[0].xMatchSetting) {
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
                            rules: translation.rules[json.data.xSchedules.nodes[0].xMatchSetting.vsRule.id].name,
                            rulesImg: getImageFromRuleId(json.data.xSchedules.nodes[0].xMatchSetting.vsRule.id),
                        }
                    } else {
                        data.xbattle = null;
                    }

                    if (json.data.festSchedules.nodes[0].festMatchSetting) {
                        data.festSchedule = {
                            start_time: json.data.festSchedules.nodes[0].startTime,
                            end_time: json.data.festSchedules.nodes[0].endTime,
                            stage1: {
                                name: translation.stages[json.data.festSchedules.nodes[0].festMatchSetting.vsStages[0].id].name,
                                image: json.data.festSchedules.nodes[0].festMatchSetting.vsStages[0].image.url
                            },
                            stage2: {
                                name: translation.stages[json.data.festSchedules.nodes[0].festMatchSetting.vsStages[1].id].name,
                                image: json.data.festSchedules.nodes[0].festMatchSetting.vsStages[1].image.url
                            },
                            rules: translation.rules[json.data.festSchedules.nodes[0].festMatchSetting.vsRule.id].name,
                            rulesImg: getImageFromRuleId(json.data.festSchedules.nodes[0].festMatchSetting.vsRule.id),
                        }
                    } else {
                        data.festSchedule = null;
                    }

                    if (json.data.currentFest) {
                        data.triColorStage = {
                            start_time: json.data.currentFest.startTime,
                            end_time: json.data.currentFest.endTime,
                            name: this.translation.stages[json.data.currentFest.tricolorStage.id]?.name,
                            image: json.data.currentFest.tricolorStage.image.url,
                            rulesImg: "https://file.strassburger.org/tricolor.svg",
                        }
                    } else {
                        data.triColorStage = null;
                    }

                    return callback(data);
                });
        });
	}

	getNextStages(callback) {
		if(!callback) {return console.log("Splatoon3api - Please enter a function!")};
        this.langPromise.then((langData) => {
            fetch(schedulesURL)
                .catch(err => console.error(err))
                .then(res => res.json())
                .then(json => {
                    let data = {};
                    if (json.data.regularSchedules.nodes[1].regularMatchSetting) {
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
                            rules: this.translation.rules[json.data.regularSchedules.nodes[1].regularMatchSetting.vsRule.id].name,
                            rulesImg: getImageFromRuleId(json.data.regularSchedules.nodes[1].regularMatchSetting.vsRule.id)
                        }
                    } else {
                        data.regular = null;
                    }

                    if (json.data.bankaraSchedules.nodes[1].bankaraMatchSettings) {
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
                                rules: this.translation.rules[json.data.bankaraSchedules.nodes[1].bankaraMatchSettings[0].vsRule.id].name,
                                rulesImg: getImageFromRuleId(json.data.bankaraSchedules.nodes[1].bankaraMatchSettings[0].vsRule.id),
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
                                rules: this.translation.rules[json.data.bankaraSchedules.nodes[1].bankaraMatchSettings[1].vsRule.id].name,
                                rulesImg: getImageFromRuleId(json.data.bankaraSchedules.nodes[1].bankaraMatchSettings[1].vsRule.id)
                            }
                        }
                    } else {
                        data.ranked = null;
                    }

                    if (json.data.xSchedules.nodes[1].xMatchSetting) {
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
                            rules: this.translation.rules[json.data.xSchedules.nodes[1].xMatchSetting.vsRule.id].name,
                            rulesImg: getImageFromRuleId(json.data.xSchedules.nodes[1].xMatchSetting.vsRule.id),
                        }
                    } else {
                        data.xbattle = null;
                    }

                    if (json.data.festSchedules.nodes[1].festMatchSetting) {
                        data.festSchedule = {
                            start_time: json.data.festSchedules.nodes[1].startTime,
                            end_time: json.data.festSchedules.nodes[1].endTime,
                            stage1: {
                                name: this.translation.stages[json.data.festSchedules.nodes[1].festMatchSetting.vsStages[0].id].name,
                                image: json.data.festSchedules.nodes[1].festMatchSetting.vsStages[0].image.url
                            },
                            stage2: {
                            name: this.translation.stages[json.data.festSchedules.nodes[1].festMatchSetting.vsStages[1].id].name,
                                image: json.data.festSchedules.nodes[1].festMatchSetting.vsStages[1].image.url
                            },
                            rules: this.translation.rules[json.data.festSchedules.nodes[1].festMatchSetting.vsRule.id].name,
                            rulesImg: getImageFromRuleId(json.data.festSchedules.nodes[1].festMatchSetting.vsRule.id),
                        }
                    } else {
                        data.festSchedule = null;
                    }

                    if (json.data.currentFest) {
                        data.triColorStage = {
                            start_time: json.data.currentFest.startTime,
                            end_time: json.data.currentFest.endTime,
                            name: this.translation.stages[json.data.currentFest.tricolorStage.id]?.name,
                            image: json.data.currentFest.tricolorStage.image.url,
                            rulesImg: "https://file.strassburger.org/tricolor.svg",
                        }
                    } else {
                        data.triColorStage = null;
                    }

                    return callback(data);
                });
        })
	}

    getChallenges(callback) {
		if(!callback) {return console.log("Splatoon3api - Please enter a function!")};
        this.langPromise.then((langData) => {
            fetch(schedulesURL)
                .catch(err => console.error(err))
                .then(res => res.json())
                .then(json => {
                    let data = [];

                    json.data.eventSchedules.nodes.forEach((event, index) => {
                        let eventData = {
                            name: this.translation.events[event.leagueMatchSetting.leagueMatchEvent.id].name,
                            desc: this.translation.events[event.leagueMatchSetting.leagueMatchEvent.id].desc,
                            eventRule: this.translation.events[event.leagueMatchSetting.leagueMatchEvent.id].regulation,
                            gameRule: this.translation.rules[event.leagueMatchSetting.vsRule.id].name,
                            gameRuleImg: getImageFromRuleId(event.leagueMatchSetting.vsRule.id),
                            stages: [],
                            timePeriods: [],
                        }

                        event.leagueMatchSetting.vsStages.forEach((stage, index) => {
                            eventData.stages.push({
                                name: this.translation.stages[stage.id].name,
                                image: stage.image.url,
                            });
                        });

                        event.timePeriods.forEach((period, index) => {
                            eventData.timePeriods.push({
                                startTime: period.startTime,
                                endTime: period.endTime,
                            });
                        });

                        data.push(eventData)
                    });

                    return callback(data);
                });
        })
	}

	getSalmonRun(callback) {
		if(!callback) {return console.log("Splatoon3api - Please enter a function!")};
        // let timeOutTime = 0;
        // if (!this.langIsResolved) timeOutTime = 500;
        this.langPromise.then((langData) => {
            fetch(schedulesURL)
                .catch(err => console.error(err))
                .then(res => res.json())
                .then(json => {
                    let data = {};
                    data.regularSchedules = {};

                    json.data.coopGroupingSchedule.regularSchedules.nodes.forEach((node, index) => {
                        if (json.data.coopGroupingSchedule.regularSchedules.nodes[index]) {
                            data.regularSchedules[index] = {
                                start_time: json.data.coopGroupingSchedule.regularSchedules.nodes[index].startTime,
                                end_time:  json.data.coopGroupingSchedule.regularSchedules.nodes[index].endTime,
                                stage: {
                                    name: this.translation.stages[json.data.coopGroupingSchedule.regularSchedules.nodes[index].setting.coopStage.id].name,
                                    image: json.data.coopGroupingSchedule.regularSchedules.nodes[index].setting.coopStage.image.url
                                },
                                weapons: {
                                    0: {
                                        name: this.translation.weapons[json.data.coopGroupingSchedule.regularSchedules.nodes[index].setting.weapons[0].__splatoon3ink_id].name,
                                        image: json.data.coopGroupingSchedule.regularSchedules.nodes[index].setting.weapons[0].image.url
                                    },
                                    1: {
                                        name: this.translation.weapons[json.data.coopGroupingSchedule.regularSchedules.nodes[index].setting.weapons[1].__splatoon3ink_id].name,
                                        image: json.data.coopGroupingSchedule.regularSchedules.nodes[index].setting.weapons[1].image.url
                                    },
                                        2: {
                                        name: this.translation.weapons[json.data.coopGroupingSchedule.regularSchedules.nodes[index].setting.weapons[2].__splatoon3ink_id].name,
                                        image: json.data.coopGroupingSchedule.regularSchedules.nodes[index].setting.weapons[2].image.url
                                    },
                                        3: {
                                        name: this.translation.weapons[json.data.coopGroupingSchedule.regularSchedules.nodes[index].setting.weapons[3].__splatoon3ink_id].name,
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
                                end_time:  json.data.coopGroupingSchedule.bigRunSchedules.nodes[index].endTime,
                                stage: {
                                    name: this.translation.stages[json.data.coopGroupingSchedule.bigRunSchedules.nodes[index].setting.coopStage.id].name,
                                    image: json.data.coopGroupingSchedule.bigRunSchedules.nodes[index].setting.coopStage.image.url
                                },
                                weapons: {
                                    0: {
                                        name: this.translation.weapons[json.data.coopGroupingSchedule.bigRunSchedules.nodes[index].setting.weapons[0].__splatoon3ink_id].name,
                                        image: json.data.coopGroupingSchedule.bigRunSchedules.nodes[index].setting.weapons[0].image.url
                                    },
                                    1: {
                                        name: this.translation.weapons[json.data.coopGroupingSchedule.bigRunSchedules.nodes[index].setting.weapons[1].__splatoon3ink_id].name,
                                        image: json.data.coopGroupingSchedule.bigRunSchedules.nodes[index].setting.weapons[1].image.url
                                    },
                                        2: {
                                        name: this.translation.weapons[json.data.coopGroupingSchedule.bigRunSchedules.nodes[index].setting.weapons[2].__splatoon3ink_id].name,
                                        image: json.data.coopGroupingSchedule.bigRunSchedules.nodes[index].setting.weapons[2].image.url
                                    },
                                        3: {
                                        name: this.translation.weapons[json.data.coopGroupingSchedule.bigRunSchedules.nodes[index].setting.weapons[3].__splatoon3ink_id].name,
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
                                name: this.translation.gear[newJson.data.coopResult.monthlyGear.__splatoon3ink_id].name,
                                type: gearTypeLang[this.lang][newJson.data.coopResult.monthlyGear.__typename],
                                image: newJson.data.coopResult.monthlyGear.image.url
                            }

                            return callback(data);
                        });
                });
        })
    }

    getSplatnetGear(callback) {
		if(!callback) {return console.log("Splatoon3api - Please enter a function!")};
        this.langPromise.then((langData) => {
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
                                typ: gearTypeLang[this.lang][json.data.gesotown.pickupBrand.brandGears[0].gear.__typename],
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
                                typ: gearTypeLang[this.lang][json.data.gesotown.pickupBrand.brandGears[1].gear.__typename],
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
                                typ: gearTypeLang[this.lang][json.data.gesotown.pickupBrand.brandGears[2].gear.__typename],
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
                            typ: gearTypeLang[this.lang][json.data.gesotown.limitedGears[0].gear.__typename],
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
                            typ: gearTypeLang[this.lang][json.data.gesotown.limitedGears[1].gear.__typename],
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
                            typ: gearTypeLang[this.lang][json.data.gesotown.limitedGears[2].gear.__typename],
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
                            typ: gearTypeLang[this.lang][json.data.gesotown.limitedGears[3].gear.__typename],
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
                            typ: gearTypeLang[this.lang][json.data.gesotown.limitedGears[4].gear.__typename],
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
                            typ: gearTypeLang[this.lang][json.data.gesotown.limitedGears[5].gear.__typename],
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
        })
	}

    getUpcomingSplatfests(callback) {
		if(!callback) {return console.log("Splatoon3api - Please enter a function!")};
        // let timeOutTime = 0;
        // if (!this.langIsResolved) timeOutTime = 500;
        this.langPromise.then((langData) => {
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
        })
    }

    getPastSplatfests(callback) {
		if(!callback) {return console.log("Splatoon3api - Please enter a function!")};
        // let timeOutTime = 0;
        // if (!this.langIsResolved) timeOutTime = 500;
        this.langPromise.then((langData) => {
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
                                title: this.translation.festivals[fest.__splatoon3ink_id].title,
                                startTime: fest.startTime,
                                endTime: fest.endTime,
                                teams: {
                                    0: {
                                        teamName: this.translation.festivals[fest.__splatoon3ink_id].teams[0].teamName,
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
                                        teamName: this.translation.festivals[fest.__splatoon3ink_id].teams[1].teamName,
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
                                        teamName: this.translation.festivals[fest.__splatoon3ink_id].teams[2].teamName,
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
        })
    }

    getCurrentSplatfest(callback) {
		if(!callback) {return console.log("Splatoon3api - Please enter a function!")};
        // let timeOutTime = 0;
        // if (!this.langIsResolved) timeOutTime = 500;
        this.langPromise.then((langData) => {
            fetch(festURL)
                .catch(err => console.error(err))
                .then(res => res.json())
                .then(json => {
                    let data = {};

                    Object.keys(json).forEach(region => {
                        data[region] = {};
                        json[region].data.festRecords.nodes.forEach(fest => {
                            if (fest.state === "CLOSED") return;

                            data[region] = {
                                title: this.translation.festivals[fest.__splatoon3ink_id].title,
                                startTime: fest.startTime,
                                endTime: fest.endTime,
                                state: fest.state,
                                teams: {
                                    0: {
                                        teamName: this.translation.festivals[fest.__splatoon3ink_id].teams[0].teamName,
                                        image: fest.teams[0].image.url,
                                        color: `rgba(${fest.teams[0].color.r * 255}, ${fest.teams[0].color.g * 255}, ${fest.teams[0].color.b * 255}, ${fest.teams[0].color.a})`,
                                        colorHEX: RGBAToHexA(`rgba(${Math.floor(fest.teams[0].color.r * 255)}, ${Math.floor(fest.teams[0].color.g * 255)}, ${Math.floor(fest.teams[0].color.b * 255)}, ${Math.floor(fest.teams[0].color.a)})`),
                                        role: fest.teams[0].role,
                                    },
                                    1: {
                                        teamName: this.translation.festivals[fest.__splatoon3ink_id].teams[1].teamName,
                                        image: fest.teams[1].image.url,
                                        color: `rgba(${fest.teams[1].color.r * 255}, ${fest.teams[1].color.g * 255}, ${fest.teams[1].color.b * 255}, ${fest.teams[1].color.a})`,
                                        colorHEX: RGBAToHexA(`rgba(${Math.floor(fest.teams[1].color.r * 255)}, ${Math.floor(fest.teams[1].color.g * 255)}, ${Math.floor(fest.teams[1].color.b * 255)}, ${Math.floor(fest.teams[1].color.a)})`),
                                        role: fest.teams[1].role,
                                    },
                                    2: {
                                        teamName: this.translation.festivals[fest.__splatoon3ink_id].teams[2].teamName,
                                        image: fest.teams[2].image.url,
                                        color: `rgba(${fest.teams[2].color.r * 255}, ${fest.teams[2].color.g * 255}, ${fest.teams[2].color.b * 255}, ${fest.teams[2].color.a})`,
                                        colorHEX: RGBAToHexA(`rgba(${Math.floor(fest.teams[2].color.r * 255)}, ${Math.floor(fest.teams[2].color.g * 255)}, ${Math.floor(fest.teams[2].color.b * 255)}, ${Math.floor(fest.teams[2].color.a)})`),
                                        role: fest.teams[2].role,
                                    }
                                }
                            }
                        })
                    })
                });
        })
    }
}


module.exports = {Client: Client}