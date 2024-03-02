/**
 * @typedef {'de-DE' | 'en-GB' | 'en-US' | 'es-ES' | 'es-MX' | 'fr-FR' | 'fr-CA' | 'it-IT' | 'ja-JP' | 'ko-KR' | 'nl-NL' | 'ru-RU' | 'zh-CN' | 'zh-TW'} Lang
 */

/**
 * @typedef {'Turf War' | 'Splat Zones' | 'Rainmaker' | 'Clam Blitz'} SplatRules
 */

/**
 * @typedef {'US' | 'EU' | 'JP' | 'AP'} FestRegion
 */

/**
 * @typedef {Object} Options
 * @property {string} schedulesURL - The URL to the schedules JSON file
 * @property {string} salmonGearURL - The URL to the salmon run gear JSON file
 * @property {string} gearURL - The URL to the gear JSON file
 * @property {string} festURL - The URL to the festivals JSON file
 * @property {string} userAgent - The user agent to use for the requests
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
 * @callback StagesCallback
 * @param {StagesResponse} res - The response from the API
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
 * @callback AllStagesCallback
 * @param {AllStagesResponse} res - The response from the API
 */

/**
 * @typedef {Object} ChallengeTimePeriod
 * @property {string} startTime - The time when the callenge starts (e.g. "2022-10-02T16:00:00Z")
 * @property {string} endTime - The time when the callenge ends (e.g. "2022-10-02T16:00:00Z")
 */

/**
 * @callback SplatChallengeCallback
 * @param {SplatChallenge[]} res - The response from the API
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
 * @callback SalmonResultCallback
 * @param {SalmonResult} res - The response from the API
 */

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
 * @callback SplatnetResultCallback
 * @param {SplatnetResult} res - The response from the API
 */

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
 * @callback FestDataCallback
 * @param {FestData} res - The response from the API
 */

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
 * @callback PastFestDataCallback
 * @param {PastFestData} res - The response from the API
 */

/**
 * @typedef {Object} CurrentFestData
 * @property {FestSchedule} US - The festival schedule for the US region.
 * @property {FestSchedule} EU - The festival schedule for the EU region.
 * @property {FestSchedule} JP - The festival schedule for the JP region.
 * @property {FestSchedule} AP - The festival schedule for the AP region.
 */

/**
 * @callback CurrentFestDataCallback
 * @param {CurrentFestData} res - The response from the API
 */

exports.unused = {};