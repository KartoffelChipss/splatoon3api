const fetch = require('node-fetch/');
// If the above does not work, use this instead:
// const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));

/**
 * @typedef {'de-DE' | 'en-GB' | 'en-US' | 'es-ES' | 'es-MX' | 'fr-FR' | 'fr-CA' | 'it-IT' | 'ja-JP' | 'ko-KR' | 'nl-NL' | 'ru-RU' | 'zh-CN' | 'zh-TW'} Lang
 */
const compatibleLanguages = ["de-DE", "en-GB", "en-US", "es-ES", "es-MX", "fr-FR", "fr-CA", "it-IT", "ja-JP", "ko-KR", "nl-NL", "ru-RU", "zh-CN", "zh-TW"];

const schedulesURL = "https://splatoon3.ink/data/schedules.json";
const salmonGearURL = "https://splatoon3.ink/data/coop.json";
const gearURL = "https://splatoon3.ink/data/gear.json";
const festURL = "https://splatoon3.ink/data/festivals.json";

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

class Client {

    /**
     * @param {Lang} lang - The language for map names, challenge descriptions etc.
     */
    constructor(lang) {
        if (!lang || typeof lang != 'string' || !lang.includes("-")) lang = "en-GB";

        lang = lang.split("-")[0].toLowerCase() + "-" + lang.split("-")[1].toUpperCase()

        if (!compatibleLanguages.includes(lang)) {
            switch (lang.toLowerCase()) {
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

        this.langIsResolved = false;

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
    }

    /**
     * @typedef {'Turf War' | 'Splat Zones' | 'Rainmaker' | 'Clam Blitz'} SplatRules
     */

    /**
     * @typedef {'US' | 'EU' | 'JP' | 'AP'} FestRegion
     */

    /**
     * @typedef {Object} SplatGearpower
     * @property {string} name - The name of the power
     * @property {string} image - The URL for the icon of the power
     */

    /**
     * @typedef {Object} SplatStage
     * @property {string} name - The name of the map.
     * @property {string} image - URL of the preview image.
     */

    /**
     * @typedef {Object} SplatTricolorStage
     * @property {string} start_time - The time when the rotation starts (e.g. "2022-10-02T16:00:00Z")
     * @property {string} end_time - The time when the rotation ends
     * @property {string} name - The name of the map.
     * @property {string} image - URL of the preview image.
     * @property {string} rulesImg - Url for the rules logo
     */

    /**
     * @typedef {Object} SplatRotation
     * @property {string} start_time - The time when the rotation starts (e.g. "2022-10-02T16:00:00Z")
     * @property {string} end_time - The time when the rotation ends
     * @property {SplatStage} stage1 - First map
     * @property {SplatStage} stage2 - Second map
     * @property {SplatRules} rules - The game rules (e.g. "Rainmaker")
     * @property {string} rulesImg - Url for the rules logo
     */

    /**
     * @typedef {Object} FestMatchSetting
     * @property {FestRotation} regular - Regular rotation
     * @property {FestRotation} challenge - Challenge rotation
     */

    /**
     * @typedef {Object} FestRotation
     * @property {string} start_time - The time when the rotation starts (e.g. "2022-10-02T16:00:00Z")
     * @property {string} end_time - The time when the rotation ends
     * @property {SplatStage} stage1 - First map
     * @property {SplatStage} stage2 - Second map
     * @property {SplatRules} rules - The game rules (e.g. "Rainmaker")
     * @property {string} rulesImg - Url for the rules logo
     * @property {string} festMode - challenge or regular
     */

    /**
     * @typedef {Object} RankedModes
     * @property {SplatRotation} series - The series rotations
     * @property {SplatRotation} open - The open rotations
     */

    /**
     * @typedef {Object} StagesResponse
     * @property {SplatRotation} regular - Regular Battle rotation
     * @property {RankedModes} ranked - Ranked Battle rotations
     * @property {SplatRotation} xbattle - X-Battle rotation
     * @property {FestMatchSetting} festSchedule - Normal fest schedules (Returns null if no stages available)
     * @property {SplatTricolorStage} triColorStage - Tricolor stage (Returns null if no stages available)
     */

    /**
     * @typedef {Object} AllStagesResponse
     * @property {SplatRotation[]} regular - Regular Battle rotation
     * @property {RankedModes[]} ranked - Ranked Battle rotations
     * @property {SplatRotation[]} xbattle - X-Battle rotation
     * @property {FestMatchSetting[]} festSchedule - Normal fest schedules (Returns null if no stages available)
     * @property {SplatTricolorStage} triColorStage - Tricolor stage (Returns null if no stages available)
     */

    /**
     * Get 11 upcoming and the current Turf War, Ranked and XBattle maps
     * @param {function(AllStagesResponse)} callback - The callback function
     */
    getStages(callback) {
        if (!callback) { return console.log("Splatoon3api - Please enter a function!") };
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
                        if (node.festMatchSettings) {
                            let returnObj = {};

                            for (let setting of node.festMatchSettings) {
                                returnObj[setting.festMode.toLowerCase()] = {
                                    start_time: node.startTime,
                                    end_time: node.endTime,
                                    stage1: {
                                        name: translation.stages[setting.vsStages[0].id].name,
                                        image: setting.vsStages[0].image.url
                                    },
                                    stage2: {
                                        name: translation.stages[setting.vsStages[1].id].name,
                                        image: setting.vsStages[1].image.url
                                    },
                                    rules: translation.rules[setting.vsRule.id].name,
                                    rulesImg: getImageFromRuleId(setting.vsRule.id),
                                    festMode: setting.festMode,
                                }
                            }

                            data.festSchedule.push(returnObj);
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

    /**
     * Get the current Turf War, Ranked and XBattle maps
     * @param {function(StagesResponse)} callback - The callback function
     */
    getCurrentStages(callback) {
        if (!callback) { return console.log("Splatoon3api - Please enter a function!") };
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

                    if (json.data.festSchedules.nodes[0].festMatchSettings) {
                        let node = json.data.festSchedules.nodes[0];
                        let returnObj = {};

                        for (let setting of node.festMatchSettings) {
                            returnObj[setting.festMode.toLowerCase()] = {
                                start_time: node.startTime,
                                end_time: node.endTime,
                                stage1: {
                                    name: this.translation.stages[setting.vsStages[0].id].name,
                                    image: setting.vsStages[0].image.url
                                },
                                stage2: {
                                    name: this.translation.stages[setting.vsStages[1].id].name,
                                    image: setting.vsStages[1].image.url
                                },
                                rules: this.translation.rules[setting.vsRule.id].name,
                                rulesImg: getImageFromRuleId(setting.vsRule.id),
                                festMode: setting.festMode,
                            }
                        }

                        data.festSchedule = returnObj;
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

    /**
     * Get the upcoming Turf War, Ranked and XBattle maps
     * @param {function(StagesResponse)} callback - The callback function
     */
    getNextStages(callback) {
        if (!callback) { return console.log("Splatoon3api - Please enter a function!") };
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

                    if (json.data.festSchedules.nodes[1].festMatchSettings) {
                        let node = json.data.festSchedules.nodes[1];
                        let returnObj = {};

                        for (let setting of node.festMatchSettings) {
                            returnObj[setting.festMode.toLowerCase()] = {
                                start_time: node.startTime,
                                end_time: node.endTime,
                                stage1: {
                                    name: this.translation.stages[setting.vsStages[0].id].name,
                                    image: setting.vsStages[0].image.url
                                },
                                stage2: {
                                    name: this.translation.stages[setting.vsStages[1].id].name,
                                    image: setting.vsStages[1].image.url
                                },
                                rules: this.translation.rules[setting.vsRule.id].name,
                                rulesImg: getImageFromRuleId(setting.vsRule.id),
                                festMode: setting.festMode,
                            }
                        }

                        data.festSchedule = returnObj;
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

    /**
     * @typedef {Object} ChallengeTimePeriod
     * @property {string} startTime - The time when the callenge starts (e.g. "2022-10-02T16:00:00Z")
     * @property {string} endTime - The time when the callenge ends (e.g. "2022-10-02T16:00:00Z")
     */

    /**
     * @typedef {Object} SplatChallenge
     * @property {string} name - The name of the Challenge.
     * @property {string} desc - The Description of the Challenge.
     * @property {string} eventRule - The Rules of the Challenge.
     * @property {SplatRules} gameRule - The game rules (e.g. "Rainmaker")
     * @property {string} gameRuleImg - Url for the rules logo
     * @property {SplatStage[]} stages - The stages you will be able to play on
     * @property {ChallengeTimePeriod[]} timePeriods - The time periods in wich the Challenge will be available
     */

    /**
     * Get the current challenges
     * @param {function(SplatChallenge[])} callback - The callback function
     */
    getChallenges(callback) {
        if (!callback) { return console.log("Splatoon3api - Please enter a function!") };
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

    /**
     * @typedef {Object} SalmonMonthlygear
     * @property {string} name - The name of the gear
     * @property {string} type - The type of the gear (e.g. Headgear)
     * @property {string} image - An image of the gear
     */

    /**
     * @typedef {Object} SalmonRunWeapon
     * @property {string} name - The name of the weapon.
     * @property {string} image - The URL to the weapon image.
     */

    /**
     * @typedef {Object} SalmonSchedule
     * @property {string} start_time - The time when the Salmon run starts (e.g. 2023-06-22T00:00:00Z)
     * @property {string} end_time - The time when the Salmon run ends (e.g. 2023-06-22T00:00:00Z)
     * @property {SplatStage} stage - The salmon run stage
     * @property {Object.<string, SalmonRunWeapon>} weapons - The weapons available
     */

    /**
     * @typedef {Object} SalmonResult
     * @property {Object.<string, SalmonSchedule>} regularSchedules - The regular schedules
     * @property {Object.<string, SalmonSchedule>} bigRunSchedules - The big run schedules if there are any
     * @property {SalmonMonthlygear} monthlyGear - The gear from salmonrun, that is available this month
     */

    /**
     * To get the current and next Salmonruns Schedules
     * @param {function(SalmonResult)} callback - The callback function
     */
    getSalmonRun(callback) {
        if (!callback) { return console.log("Splatoon3api - Please enter a function!") };
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
                                end_time: json.data.coopGroupingSchedule.regularSchedules.nodes[index].endTime,
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
                                end_time: json.data.coopGroupingSchedule.bigRunSchedules.nodes[index].endTime,
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

    /**
     * @typedef {Object} SplatnetGearFeatured
     * @property {string} name - The name of the gear item
     * @property {string} type - The type of the gear item
     * @property {string} image - The URL for the image of the gear item
     * @property {SplatGearpower} primaryGearPower - The primary gear power
     * @property {SplatGearpower[]} additionalGearPowers - Additional gear powers
     * @property {number} price - The price of the gear item
     * @property {string} saleEnd - Time when the item isn't for sale anymore (e.g. "2022-12-30T00:00:00Z")
     */

    /**
     * @typedef {Object} Brand
     * @property {string} name - The name of the brand
     * @property {string} tyimagepe - The URL for the logo of the brand
     */

    /**
     * @typedef {Object} SplatnetGear
     * @property {string} name - The name of the gear item
     * @property {string} type - The type of the gear item
     * @property {string} image - The URL for the image of the gear item
     * @property {SplatGearpower} primaryGearPower - The primary gear power
     * @property {SplatGearpower[]} additionalGearPowers - Additional gear powers
     * @property {number} price - The price of the gear item
     * @property {string} saleEnd - Time when the item isn't for sale anymore (e.g. "2022-12-30T00:00:00Z")
     * @property {Brand} brand - Time when the item isn't for sale anymore (e.g. "2022-12-30T00:00:00Z")
     */

    /**
     * @typedef {Object} SplatnetFeaturedBrand
     * @property {string} name - The name of the featured brand
     * @property {string} banner - The URL for the banner image of the featured brand
     * @property {SplatGearpower} usualPower - Most common power for that gear item
     * @property {string} saleEnd - Time when the sale ends (e.g. "2022-12-30T00:00:00Z")
     * @property {Object.<string, SplatnetGearFeatured>} brandGears - The gear items being sold
     */

    /**
     * @typedef {Object} SplatnetResult
     * @property {SplatnetFeaturedBrand} featuredBrand - The featured brand
     * @property {Object.<string, SplatnetGear>} limitedGear - The gear items being sold
     */

    /**
     * Get the current gear that is available in the splatnet shop
     * @param {function(SplatnetResult)} callback - The callback function
     */
    getSplatnetGear(callback) {
        if (!callback) { return console.log("Splatoon3api - Please enter a function!") };
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
                                typ: gearTypeLang[this.lang][json.data.gesotown.pickupBrand.brandGears[0].gear.__typename],// Just still there for backwards compatibility
                                type: gearTypeLang[this.lang][json.data.gesotown.pickupBrand.brandGears[0].gear.__typename],
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
                                typ: gearTypeLang[this.lang][json.data.gesotown.pickupBrand.brandGears[1].gear.__typename],// Just still there for backwards compatibility
                                type: gearTypeLang[this.lang][json.data.gesotown.pickupBrand.brandGears[1].gear.__typename],
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
                                typ: gearTypeLang[this.lang][json.data.gesotown.pickupBrand.brandGears[2].gear.__typename],// Just still there for backwards compatibility
                                type: gearTypeLang[this.lang][json.data.gesotown.pickupBrand.brandGears[2].gear.__typename],
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
                            typ: gearTypeLang[this.lang][json.data.gesotown.limitedGears[0].gear.__typename],// Just still there for backwards compatibility
                            type: gearTypeLang[this.lang][json.data.gesotown.limitedGears[0].gear.__typename],
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
                            typ: gearTypeLang[this.lang][json.data.gesotown.limitedGears[1].gear.__typename],// Just still there for backwards compatibility
                            type: gearTypeLang[this.lang][json.data.gesotown.limitedGears[1].gear.__typename],
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
                            typ: gearTypeLang[this.lang][json.data.gesotown.limitedGears[2].gear.__typename],// Just still there for backwards compatibility
                            type: gearTypeLang[this.lang][json.data.gesotown.limitedGears[2].gear.__typename],
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
                            typ: gearTypeLang[this.lang][json.data.gesotown.limitedGears[3].gear.__typename],// Just still there for backwards compatibility
                            type: gearTypeLang[this.lang][json.data.gesotown.limitedGears[3].gear.__typename],
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
                            typ: gearTypeLang[this.lang][json.data.gesotown.limitedGears[4].gear.__typename],// Just still there for backwards compatibility
                            type: gearTypeLang[this.lang][json.data.gesotown.limitedGears[4].gear.__typename],
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
                            typ: gearTypeLang[this.lang][json.data.gesotown.limitedGears[5].gear.__typename],// Just still there for backwards compatibility
                            type: gearTypeLang[this.lang][json.data.gesotown.limitedGears[5].gear.__typename],
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

    /**
     * @typedef {Object} FestTeam
     * @property {string} teamName - The name of the team.
     * @property {string} image - The URL to the team image.
     * @property {string} color - The RGBA color representation of the team.
     * @property {string} colorHEX - The HEX color representation of the team.
     */

    /**
     * @typedef {Object} FestSchedule
     * @property {string} title - The title of the festival.
     * @property {string} startTime - The start time of the festival.
     * @property {string} endTime - The end time of the festival.
     * @property {Object.<string, FestTeam>} teams - An object where keys are team IDs (as strings) and values are FestTeam objects.
     */

    /**
     * @typedef {Object} FestData
     * @property {FestSchedule[]} US - An array of festival schedules for the US region.
     * @property {FestSchedule[]} EU - An array of festival schedules for the EU region.
     * @property {FestSchedule[]} JP - An array of festival schedules for the JP region.
     * @property {FestSchedule[]} AP - An array of festival schedules for the AP region.
     */

    /**
     * Get already scheduled Splatfests
     * @param {function(FestData)} callback - The callback function.
     */
    getUpcomingSplatfests(callback) {
        if (!callback) { return console.log("Splatoon3api - Please enter a function!") };
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

    /**
     * @typedef {Object} PastFestTeamResults
     * @property {boolean} isWinner - Indicates whether the team is the winner.
     * @property {number} conchShellsRatio - The ratio of conch shells.
     * @property {boolean} conchShellsTop - Indicates whether the team is top in conch shells.
     * @property {number} voteRatio - The voting ratio.
     * @property {boolean} isVoteTop - Indicates whether the team is top in voting.
     * @property {number} regularContributionRatio - The ratio of regular contributions.
     * @property {boolean} isRegularContributionTop - Indicates whether the team is top in regular contributions.
     * @property {number} proModeContributionRatio - The ratio of pro mode contributions.
     * @property {boolean} isProModeContributionTop - Indicates whether the team is top in pro mode contributions.
     * @property {number} tricolorContributionRatio - The ratio of tricolor contributions.
     * @property {boolean} isTricolorContributionRatioTop - Indicates whether the team is top in tricolor contributions.
     */

    /**
     * @typedef {Object} PastFestTeam
     * @property {string} teamName - The name of the team.
     * @property {string} image - The URL to the team image.
     * @property {string} color - The RGBA color representation of the team.
     * @property {string} colorHEX - The HEX color representation of the team.
     * @property {string} role - The role of the team (e.g., ATTACK, DEFENSE).
     * @property {PastFestTeamResults} results - The results of the team.
     */

    /**
     * @typedef {Object} PastFestSchedule
     * @property {string} title - The title of the festival.
     * @property {string} startTime - The start time of the festival.
     * @property {string} endTime - The end time of the festival.
     * @property {Object.<string, PastFestTeam>} teams - An object or array where keys are team IDs (as strings or numbers)
     * and values are FestTeam objects.
     */

    /**
     * @typedef {Object} PastFestData
     * @property {PastFestSchedule[]} US - An array of festival schedules for the US region.
     * @property {PastFestSchedule[]} EU - An array of festival schedules for the EU region.
     * @property {PastFestSchedule[]} JP - An array of festival schedules for the JP region.
     * @property {PastFestSchedule[]} AP - An array of festival schedules for the AP region.
     */

    /**
     * Get past Splatfests
     * @param {function(PastFestData)} callback - The callback function.
     */
    getPastSplatfests(callback) {
        if (!callback) { return console.log("Splatoon3api - Please enter a function!") };
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
                                title: this.translation.festivals[fest.__splatoon3ink_id]?.title ?? "",
                                startTime: fest.startTime,
                                endTime: fest.endTime,
                                teams: {
                                    0: {
                                        teamName: this.translation.festivals[fest.__splatoon3ink_id]?.teams[0]?.teamName ?? "",
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
                                            tricolorContributionRatio: fest.teams[0].result.tricolorContributionRatio,
                                            isTricolorContributionRatioTop: fest.teams[0].result.isTricolorContributionRatioTop,
                                        }
                                    },
                                    1: {
                                        teamName: this.translation.festivals[fest.__splatoon3ink_id]?.teams[1]?.teamName ?? "",
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
                                            tricolorContributionRatio: fest.teams[1].result.tricolorContributionRatio,
                                            isTricolorContributionRatioTop: fest.teams[1].result.isTricolorContributionRatioTop,
                                        }
                                    },
                                    2: {
                                        teamName: this.translation.festivals[fest.__splatoon3ink_id]?.teams[2]?.teamName ?? "",
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
                                            tricolorContributionRatio: fest.teams[2].result.tricolorContributionRatio,
                                            isTricolorContributionRatioTop: fest.teams[2].result.isTricolorContributionRatioTop,
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

    /**
     * @typedef {Object} CurrentFestData
     * @property {FestSchedule} US - The festival schedule for the US region.
     * @property {FestSchedule} EU - The festival schedule for the EU region.
     * @property {FestSchedule} JP - The festival schedule for the JP region.
     * @property {FestSchedule} AP - The festival schedule for the AP region.
     */

    /**
     * Get the current Splatfest
     * @param {function(CurrentFestData)} callback - The callback function.
     */
    getCurrentSplatfest(callback) {
        if (!callback) { return console.log("Splatoon3api - Please enter a function!") };
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

                    return callback(data);
                });
        })
    }
}


module.exports = { Client: Client }