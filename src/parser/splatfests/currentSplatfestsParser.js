const { RGBAToHexA } = require("../../utils.js");

function parse(json, translation) {
    let data = {};

    Object.keys(json).forEach(region => {
        data[region] = {};
        json[region].data.festRecords.nodes.forEach(fest => {
            if (fest.state === "CLOSED") return;

            data[region] = {
                title: translation.festivals[fest.__splatoon3ink_id].title,
                startTime: fest.startTime,
                endTime: fest.endTime,
                state: fest.state,
                teams: {
                    0: {
                        teamName: translation.festivals[fest.__splatoon3ink_id].teams[0].teamName,
                        image: fest.teams[0].image.url,
                        color: `rgba(${fest.teams[0].color.r * 255}, ${fest.teams[0].color.g * 255}, ${fest.teams[0].color.b * 255}, ${fest.teams[0].color.a})`,
                        colorHEX: RGBAToHexA(`rgba(${Math.floor(fest.teams[0].color.r * 255)}, ${Math.floor(fest.teams[0].color.g * 255)}, ${Math.floor(fest.teams[0].color.b * 255)}, ${Math.floor(fest.teams[0].color.a)})`),
                        role: fest.teams[0].role,
                    },
                    1: {
                        teamName: translation.festivals[fest.__splatoon3ink_id].teams[1].teamName,
                        image: fest.teams[1].image.url,
                        color: `rgba(${fest.teams[1].color.r * 255}, ${fest.teams[1].color.g * 255}, ${fest.teams[1].color.b * 255}, ${fest.teams[1].color.a})`,
                        colorHEX: RGBAToHexA(`rgba(${Math.floor(fest.teams[1].color.r * 255)}, ${Math.floor(fest.teams[1].color.g * 255)}, ${Math.floor(fest.teams[1].color.b * 255)}, ${Math.floor(fest.teams[1].color.a)})`),
                        role: fest.teams[1].role,
                    },
                    2: {
                        teamName: translation.festivals[fest.__splatoon3ink_id].teams[2].teamName,
                        image: fest.teams[2].image.url,
                        color: `rgba(${fest.teams[2].color.r * 255}, ${fest.teams[2].color.g * 255}, ${fest.teams[2].color.b * 255}, ${fest.teams[2].color.a})`,
                        colorHEX: RGBAToHexA(`rgba(${Math.floor(fest.teams[2].color.r * 255)}, ${Math.floor(fest.teams[2].color.g * 255)}, ${Math.floor(fest.teams[2].color.b * 255)}, ${Math.floor(fest.teams[2].color.a)})`),
                        role: fest.teams[2].role,
                    }
                }
            }
        })
    })
    return data;
};

module.exports = parse;