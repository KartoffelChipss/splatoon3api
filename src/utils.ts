import * as Types from './types';

import NodeCache from 'node-cache';
const cache: NodeCache = new NodeCache();

const ruleImg_turfwar: string = "https://splatoon3.ink/assets/regular.81d2e9e4.svg";
const ruleImg_rainmaker: string = "https://splatoon3.ink/assets/hoko.e3dce940.svg";
const ruleImg_clamblitz: string = "https://splatoon3.ink/assets/asari.83043125.svg";
const ruleImg_splatzones: string = "https://splatoon3.ink/assets/area.02968ae6.svg";
const ruleImg_towercontrol: string = "https://splatoon3.ink/assets/yagura.3d64cf2c.svg";

/**
 * Get rule image from rule ID
 * @param {Types.RuleID} ruleId 
 * @returns {string}
 */
export function getImageFromRuleId(ruleId: Types.RuleID): string {
    if (ruleId === "VnNSdWxlLTQ=") return ruleImg_clamblitz;
    else if (ruleId === "VnNSdWxlLTI=") return ruleImg_towercontrol;
    else if (ruleId === "VnNSdWxlLTE=") return ruleImg_splatzones;
    else if (ruleId === "VnNSdWxlLTM=") return ruleImg_rainmaker;
    else return ruleImg_turfwar;
}

/**
 * Convert RGBA to Hex color
 * @param {string} rgba - The RGBA value to convert
 * @param {boolean} [forceRemoveAlpha=false] - Should the alpha value be removed?
 * @returns {string} - The color code in HEX format
 * 
 * @description
 * Borrowed from https://stackoverflow.com/a/73401564
 */
export function RGBAtoHEX(rgba: string, forceRemoveAlpha: boolean = false): string {
    return "#" + rgba.replace(/^rgba?\(|\s+|\)$/g, '') // Get's rgba / rgb string values
        .split(',') // splits them at ","
        .filter((string, index) => !forceRemoveAlpha || index !== 3)
        .map(string => parseFloat(string)) // Converts them to numbers
        .map((number, index) => index === 3 ? Math.round(number * 255) : number) // Converts alpha to 255 number
        .map(number => number.toString(16)) // Converts numbers to hex
        .map(string => string.length === 1 ? "0" + string : string) // Adds 0 when length of one number is 1
        .join("") // Puts the array to togehter to a string
}

/**
 * Format the lang input
 * @param {string} lang - The lang string to format
 * @returns {Lang} - The formatted language string
 */
export function formatLang(lang: Types.Lang): Types.Lang {
    const compatibleLanguages = ["de-DE", "en-GB", "en-US", "es-ES", "es-MX", "fr-FR", "fr-CA", "it-IT", "ja-JP", "ko-KR", "nl-NL", "ru-RU", "zh-CN", "zh-TW"];

    const altLangCodes = new Map<string, Types.Lang>();
    altLangCodes.set("en", "en-US");
    altLangCodes.set("de", "de-DE");
    altLangCodes.set("nl", "nl-NL");
    altLangCodes.set("fr", "fr-FR");
    altLangCodes.set("es", "es-ES");
    altLangCodes.set("it", "it-IT");
    altLangCodes.set("ru", "ru-RU");
    altLangCodes.set("jp", "ja-JP");

    // If no lang at all is provided, default to en-US
    if (!lang || typeof lang !== 'string') lang = "en-US";

    // If the lang is in alternative language codes, convert it to the correct one
    if (altLangCodes.get(lang)) lang = altLangCodes.get(lang)!;

    // If the lang is in the format of xx-xx, convert it to xx-XX
    if (lang.includes("-")) lang = lang.split("-")[0].toLowerCase() + "-" + lang.split("-")[1].toUpperCase();

    // if the lang is not in the compatible languages, default to en-US
    if (!compatibleLanguages.includes(lang)) lang = "en-US";

    return lang;
}

/**
 * Check if the value is a valid fest region
 * @param {any} value - The value to check
 * @returns {value is FestRegion} - If the value is a valid fest region
 */
export function isFestRegion(value: any): value is Types.FestRegion {
    return ['US', 'EU', 'JP', 'AP'].includes(value);
}

/**
 * Fetch data from the URL
 * @param {string} url 
 * @param {Types.Options} options 
 */
export function fetchData(url: string, options: Types.Options): Promise<any> {
    return new Promise((resolve, reject) => {
        const cachedData = cache.get(url);

        if (cachedData !== undefined) {
            resolve(cachedData);
            return;
        }

        const headers = new Headers();
        headers.append("User-Agent", options.userAgent || "");
        
        fetch(url, { method: "GET", headers })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(json => {
                if (options.cache && options.cache.enabled) cache.set(url, json, options.cache.ttl || 60);
                resolve(json);
            })
            .catch(error => {
                reject(error);
            });
    });
}