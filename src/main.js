const fetch = require('node-fetch/');
// If the above does not work, use this instead:
// const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));
const formatLang = require("./utils.js").formatLang;

const schedulesURL = "https://splatoon3.ink/data/schedules.json";
const salmonGearURL = "https://splatoon3.ink/data/coop.json";
const gearURL = "https://splatoon3.ink/data/gear.json";
const festURL = "https://splatoon3.ink/data/festivals.json";

class Client {
    /**
     * @param {import('./types').Lang} [lang] - The language for map names, challenge descriptions etc.
     */
    constructor(lang) {
        this.lang = formatLang(lang);

        this.langPromise = new Promise((resolve, reject) => {
            fetch(`https://splatoon3.ink/data/locale/${this.lang}.json`)
                .catch(err => console.error(err))
                .then(res => res.json())
                .then(json => {
                    this.translation = { ...json, gearType: require("./gearTypeLang.json")[this.lang]};
                    resolve(this.translation);
                })
        });
    }

    /**
     * Get 11 upcoming and the current Turf War, Ranked and XBattle maps
     * @param {import('./types').AllStagesCallback} [callback] - The callback function
     * @returns {Promise<import('./types').AllStagesResponse>} - The promise
     */
    getStages(callback) {
        if (!callback) {
            return new Promise((resolve, reject) => {
                this.getStages((res) => {
                    resolve(res);
                })
            })
        };
        this.langPromise.then((langData) => {
            fetch(schedulesURL)
                .catch(err => console.error(err))
                .then(res => res.json())
                .then(json => {
                    const data = require("./parser/allStagesParser.js")(json, this.translation);
                    return callback(data);
                });
        });
    }

    /**
     * Get the current Turf War, Ranked and XBattle maps
     * @param {import('./types').StagesCallback} callback - The callback function
     * @returns {Promise<import('./types').StagesResponse>} - The promise
     */
    getCurrentStages(callback) {
        if (!callback) {
            return new Promise((resolve, reject) => {
                this.getCurrentStages((res) => {
                    resolve(res);
                })
            })
        };
        this.langPromise.then((langData) => {
            fetch(schedulesURL)
                .catch(err => console.error(err))
                .then(res => res.json())
                .then(json => {
                    const data = require("./parser/currentStagesParser.js")(json, this.translation);
                    return callback(data);
                });
        });
    }

    /**
     * Get the upcoming Turf War, Ranked and XBattle maps
     * @param {import('./types').StagesCallback} callback - The callback function
     * @returns {Promise<import('./types').StagesResponse>} - The promise
     */
    getNextStages(callback) {
        if (!callback) {
            return new Promise((resolve, reject) => {
                this.getNextStages((res) => {
                    resolve(res);
                })
            })
        };
        this.langPromise.then((langData) => {
            fetch(schedulesURL)
                .catch(err => console.error(err))
                .then(res => res.json())
                .then(json => {
                    const data = require("./parser/nextStagesParser.js")(json, this.translation);
                    return callback(data);
                });
        })
    }

    /**
     * Get the current challenges
     * @param {import('./types').SplatChallengeCallback} callback - The callback function
     * @returns {Promise<import('./types').SplatChallenge[]>} - The promise
     */
    getChallenges(callback) {
        if (!callback) {
            return new Promise((resolve, reject) => {
                this.getChallenges((res) => {
                    resolve(res);
                })
            })
        };
        this.langPromise.then((langData) => {
            fetch(schedulesURL)
                .catch(err => console.error(err))
                .then(res => res.json())
                .then(json => {
                    const data = require("./parser/challengesParser.js")(json, this.translation);
                    return callback(data);
                });
        })
    }

    /**
     * To get the current and next Salmonruns Schedules
     * @param {import('./types').SalmonResultCallback} callback - The callback function
     * @returns {Promise<import('./types').SalmonResult>} - The promise
     */
    getSalmonRun(callback) {
        if (!callback) {
            return new Promise((resolve, reject) => {
                this.getSalmonRun((res) => {
                    resolve(res);
                })
            })
        };
        this.langPromise.then((langData) => {
            fetch(schedulesURL)
                .catch(err => console.error(err))
                .then(res => res.json())
                .then(json => {
                    require("./parser/salmonRunParser.js")(json, this.translation, salmonGearURL, (data) => {
                        return callback(data);
                    });
                });
        });
    }

    /**
     * Get the current gear that is available in the splatnet shop
     * @param {import('./types').SplatnetResultCallback} callback - The callback function
     * @returns {Promise<import('./types').SplatnetResult>} - The promise
     */
    getSplatnetGear(callback) {
        if (!callback) {
            return new Promise((resolve, reject) => {
                this.getSplatnetGear((res) => {
                    resolve(res);
                })
            })
        };
        this.langPromise.then((langData) => {
            fetch(gearURL)
                .catch(err => console.error(err))
                .then(res => res.json())
                .then(json => {
                    const data = require("./parser/splatNetGearParser.js")(json, this.translation);
                    return callback(data);
                });
        })
    }

    /**
     * Get already scheduled Splatfests
     * @param {import('./types').FestDataCallback} callback - The callback function.
     * @returns {Promise<import('./types').FestData>} - The promise
     */
    getUpcomingSplatfests(callback) {
        if (!callback) {
            return new Promise((resolve, reject) => {
                this.getUpcomingSplatfests((res) => {
                    resolve(res);
                })
            })
        };
        this.langPromise.then((langData) => {
            fetch(festURL)
                .catch(err => console.error(err))
                .then(res => res.json())
                .then(json => {
                    const data = require("./parser/splatfests/upcomingSplatfestsParser.js")(json, this.translation);
                    return callback(data);
                });
        })
    }

    /**
     * Get past Splatfests
     * @param {import('./types').PastFestDataCallback} callback - The callback function.
     * @returns {Promise<import('./types').PastFestData>} - The promise
     */
    getPastSplatfests(callback) {
        if (!callback) {
            return new Promise((resolve, reject) => {
                this.getPastSplatfests((res) => {
                    resolve(res);
                })
            })
        };
        this.langPromise.then((langData) => {
            fetch(festURL)
                .catch(err => console.error(err))
                .then(res => res.json())
                .then(json => {
                    const data = require("./parser/splatfests/pastSplatfestsParser.js")(json, this.translation);
                    return callback(data);
                });
        })
    }

    /**
     * Get the current Splatfest
     * @param {import('./types').CurrentFestDataCallback} callback - The callback function.
     * @returns {Promise<import('./types').CurrentFestData>} - The promise
     */
    getCurrentSplatfest(callback) {
        if (!callback) {
            return new Promise((resolve, reject) => {
                this.getCurrentSplatfest((res) => {
                    resolve(res);
                })
            })
        };
        this.langPromise.then((langData) => {
            fetch(festURL)
                .catch(err => console.error(err))
                .then(res => res.json())
                .then(json => {
                    const data = require("./parser/splatfests/currentSplatfestsParser.js")(json, this.translation);
                    return callback(data);
                });
        })
    }
}

module.exports = { Client }