import * as Types from './types';
import fetch from 'node-fetch';
import { formatLang, fetchData } from "./utils";
import GearTypes from "./gearTypeLang";
import parseAllStages from "./parser/stages/allStagesParser";
import parseCurrentStages from "./parser/stages/currentStagesParser";
import parseNextStages from "./parser/stages/nextStagesParser";
import parseChallenges from "./parser/challengesParser";
import parseSalmonrun from './parser/salmonRunParser';
import parseSplatnetGear from './parser/splatNetGearParser';
import parsePastSplatfests from './parser/splatfests/pastSplatfestsParser';
import parseUpcomingSplatfests from './parser/splatfests/upcomingSplatfestsParser';
import parseRunningSplatfests from './parser/splatfests/runningSplatfestsParser';

class Client {
    lang: Types.Lang;
    options: Types.Options;
    private langPromise: Promise<unknown>;
    private translation: any;

    /**
     * @param {Types.Lang} [lang="en-US"] - The language for map names, challenge descriptions etc.
     * @param {Types.Options} [options] - The options for the client
     */
    constructor(lang: Types.Lang = "en-US", options: Types.Options | undefined = new Types.Options()) {
        this.lang = formatLang(lang);
    
        this.options = options;
    
        this.langPromise = new Promise((resolve, reject) => {
            fetch(`https://splatoon3.ink/data/locale/${this.lang}.json`)
                .then((res: any) => {
                    if (!res || !res.ok) throw new Error("Network response was not ok while loading lang file!");
                    return res.json();
                })
                .then((json: any) => {
                    this.translation = { ...json, gearType: GearTypes[this.lang]};
                    resolve(this.translation);
                })
                .catch((err) => {
                    console.error(err);
                    reject(err);
                });
        });
    }

    /**
     * Get 11 upcoming and the current Turf War, Ranked and XBattle maps
     * @returns {Promise<Types.AllStagesResponse>} - The promise
     */
    async getStages(): Promise<Types.AllStagesResponse> {
        await this.langPromise;
        try {
            const json = await fetchData(this.options.schedulesURL, this.options);
            return parseAllStages(json, this.translation);
        } catch (err) {
            console.error(err);
            throw err;
        }
    }

    /**
     * Get the current Turf War, Ranked and XBattle maps
     * @returns {Promise<Types.StagesResponse>} - The promise
     */
    async getCurrentStages(): Promise<Types.StagesResponse> {
        await this.langPromise;
        try {
            const json = await fetchData(this.options.schedulesURL, this.options);
            return parseCurrentStages(json, this.translation);
        } catch (err) {
            console.error(err);
            throw err;
        }
    }

    /**
     * Get the upcoming Turf War, Ranked and XBattle maps
     * @returns {Promise<Types.StagesResponse>} - The promise
     */
    async getNextStages(): Promise<Types.StagesResponse> {
        await this.langPromise;
        try {
            const json = await fetchData(this.options.schedulesURL, this.options);
            return parseNextStages(json, this.translation);
        } catch (err) {
            console.error(err);
            throw err;
        }
    }

    /**
     * Get the current challenges
     * @returns {Promise<Types.SplatChallenge[]>} - The promise
     */
    async getChallenges(): Promise<Types.SplatChallenge[]> {
        await this.langPromise;
        try {
            const json = await fetchData(this.options.schedulesURL, this.options);
            return parseChallenges(json, this.translation);
        } catch (err) {
            console.error(err);
            throw err;
        }
    }

    /**
     * To get the current and next Salmonruns Schedules
     * @returns {Promise<import('./types').SalmonResult>} - The promise
     */
    async getSalmonRun(): Promise<Types.SalmonResult> {
        await this.langPromise;
        try {
            const json = await fetchData(this.options.schedulesURL, this.options);
            return parseSalmonrun(json, this.translation, this.options.salmonGearURL);
        } catch (err) {
            console.error(err);
            throw err;
        }
    }

    /**
     * Get the current gear that is available in the splatnet shop
     * @returns {Promise<import('./types').SplatnetResult>} - The promise
     */
    async getSplatnetGear(): Promise<Types.SplatnetResult> {
        await this.langPromise;
        try {
            const json = await fetchData(this.options.gearURL, this.options);
            return parseSplatnetGear(json, this.translation);
        } catch (err) {
            console.error(err);
            throw err;
        }
    }

    /**
     * Get already scheduled Splatfests
     * @returns {Promise<import('./types').FestData>} - The promise
     */
    async getUpcomingSplatfests(): Promise<Types.FestData> {
        await this.langPromise;
        try {
            const json = await fetchData(this.options.festURL, this.options);
            return parseUpcomingSplatfests(json, this.translation);
        } catch (err) {
            console.error(err);
            throw err;
        }
    }

    /**
     * Get past Splatfests
     * @returns {Promise<import('./types').PastFestData>} - The promise
     */
    async getPastSplatfests(): Promise<Types.PastFestData> {
        await this.langPromise;
        try {
            const json = await fetchData(this.options.festURL, this.options);
            return parsePastSplatfests(json, this.translation);
        } catch (err) {
            console.error(err);
            throw err;
        }
    }

    /**
     * Get the currently running Splatfests
     * @returns {Promise<import('./types').FestData>} - The promise
     */
    async getRunningSplatfests(): Promise<Types.RunningFestData> {
        await this.langPromise;
        try {
            const json = await fetchData(this.options.festURL, this.options);
            return parseRunningSplatfests(json, this.translation);
        } catch (err) {
            console.error(err);
            throw err;
        }
    }
}

export { Client };
export { Types };