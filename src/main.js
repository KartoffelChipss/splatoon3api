const fetch = require('node-fetch/');
// If the above does not work, use this instead:
// const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));
const { formatLang, formatOptions, fetchData } = require("./utils.js");

class Client {
    /**
     * @param {import('./types').Lang} [lang="en-US"] - The language for map names, challenge descriptions etc.
     * @param {import('./types').Options} [options] - The options for the client
     */
    constructor(lang = "en-US", options = {}) {
        this.lang = formatLang(lang);

        this.options = formatOptions(options);

        this.langPromise = new Promise((resolve, reject) => {
            fetch(`https://splatoon3.ink/data/locale/${this.lang}.json`)
                .catch(err => console.error(err))
                .then(res => {
                    if (!res || !res.ok) throw new Error("Network response was not ok while loading lang file!");
                    return res.json();
                })
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
            fetchData(this.options.schedulesURL, this.options)
                .catch(err => console.error(err))
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
            fetchData(this.options.schedulesURL, this.options)
                .catch(err => console.error(err))
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
            fetchData(this.options.schedulesURL, this.options)
                .catch(err => console.error(err))
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
            fetchData(this.options.schedulesURL, this.options)
                .catch(err => console.error(err))
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
            fetchData(this.options.schedulesURL, this.options)
                .catch(err => console.error(err))
                .then(json => {
                    require("./parser/salmonRunParser.js")(json, this.translation, this.options.salmonGearURL, (data) => {
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
            fetchData(this.options.gearURL, this.options)
                .catch(err => console.error(err))
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
            fetchData(this.options.festURL, this.options)
                .catch(err => console.error(err))
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
            fetchData(this.options.festURL, this.options)
                .catch(err => console.error(err))
                .then(json => {
                    const data = require("./parser/splatfests/pastSplatfestsParser.js")(json, this.translation);
                    return callback(data);
                });
        })
    }

    /**
     * @deprecated This method is deprecated and will be removed in the next major version. Use {@link getRunningSplatfests} instead!
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
            fetchData(this.options.festURL, this.options)
                .catch(err => console.error(err))
                .then(json => {
                    const data = require("./parser/splatfests/currentSplatfestsParser.js")(json, this.translation);
                    return callback(data);
                });
        })
    }

    /**
     * Get the currently running Splatfests
     * @param {import('./types').FestDataCallback} callback - The callback function.
     * @returns {Promise<import('./types').FestData>} - The promise
     */
    getRunningSplatfests(callback) {
        if (!callback) {
            return new Promise((resolve, reject) => {
                this.getRunningSplatfests((res) => {
                    resolve(res);
                })
            })
        };
        this.langPromise.then((langData) => {
            fetchData(this.options.festURL, this.options)
                .catch(err => console.error(err))
                .then(json => {
                    const data = require("./parser/splatfests/runningSplatfestsParser.js")(json, this.translation);
                    return callback(data);
                });
        })
    }
}

module.exports = { Client }