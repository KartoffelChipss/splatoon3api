const { RGBAToHexA } = require("../../utils.js");

function parse(json, translation) {
    let data = {};

    Object.keys(json).forEach(region => {
        data[region] = [];
        json[region].data.festRecords.nodes.forEach(fest => {
            if (fest.state !== "CLOSED") return;

            data[region].push({
                title: translation.festivals[fest.__splatoon3ink_id]?.title ?? "",
                startTime: fest.startTime,
                endTime: fest.endTime,
                teams: {
                    0: {
                        teamName: translation.festivals[fest.__splatoon3ink_id]?.teams[0]?.teamName ?? "",
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
                        teamName: translation.festivals[fest.__splatoon3ink_id]?.teams[1]?.teamName ?? "",
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
                        teamName: translation.festivals[fest.__splatoon3ink_id]?.teams[2]?.teamName ?? "",
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
    return data;
};

module.exports = parse;