const ruleImg_turfwar = "https://splatoon3.ink/assets/regular.81d2e9e4.svg";
const ruleImg_rainmaker = "https://splatoon3.ink/assets/hoko.e3dce940.svg";
const ruleImg_clamblitz = "https://splatoon3.ink/assets/asari.83043125.svg";
const ruleImg_splatzones = "https://splatoon3.ink/assets/area.02968ae6.svg";
const ruleImg_towercontrol = "https://splatoon3.ink/assets/yagura.3d64cf2c.svg";

/**
 * Get rule image from rule ID
 * @param {'VnNSdWxlLTQ=' | 'VnNSdWxlLTI=' | 'VnNSdWxlLTE=' | 'VnNSdWxlLTM='} ruleId 
 * @returns {string}
 */
function getImageFromRuleId(ruleId) {
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

/**
 * @typedef {'de-DE' | 'en-GB' | 'en-US' | 'es-ES' | 'es-MX' | 'fr-FR' | 'fr-CA' | 'it-IT' | 'ja-JP' | 'ko-KR' | 'nl-NL' | 'ru-RU' | 'zh-CN' | 'zh-TW'} Lang
 */

/**
 * Format the lang input
 * @param {string} lang - The lang string to format
 * @returns {Lang} - The formatted language string
 */
function formatLang(lang) {
    const compatibleLanguages = ["de-DE", "en-GB", "en-US", "es-ES", "es-MX", "fr-FR", "fr-CA", "it-IT", "ja-JP", "ko-KR", "nl-NL", "ru-RU", "zh-CN", "zh-TW"];
    const altLangCodes = {
        "en": "en-US",
        "de": "de-DE",
        "nl": "nl-NL",
        "fr": "fr-FR",
        "es": "es-ES",
        "it": "it-IT",
        "ru": "ru-RU",
        "jp": "ja-JP"
    }

    // If no lang at all is provided, default to en-US
    if (!lang || typeof lang !== 'string') lang = "en-US";

    // If the lang is in alternative language codes, convert it to the correct one
    if (altLangCodes[lang]) lang = altLangCodes[lang];

    // If the lang is in the format of xx-xx, convert it to xx-XX
    if (lang.includes("-")) lang = lang.split("-")[0].toLowerCase() + "-" + lang.split("-")[1].toUpperCase();

    // if the lang is not in the compatible languages, default to en-US
    if (!compatibleLanguages.includes(lang)) lang = "en-US";

    return lang;
}

module.exports = {
    getImageFromRuleId,
    RGBAToHexA,
    formatLang,
};