function parse(json, translation) {
    let data = {};
    data.featuredBrand = {
        name: translation.brands[json.data.gesotown.pickupBrand.brand.id].name,
        banner: json.data.gesotown.pickupBrand.image.url,
        usualPower: {
            name: translation.powers[json.data.gesotown.pickupBrand.brand.usualGearPower.__splatoon3ink_id].name,
            image: json.data.gesotown.pickupBrand.brand.usualGearPower.image.url
        },
        saleEnd: json.data.gesotown.pickupBrand.saleEndTime,
        brandGears: {
            0: {
                name: translation.gear[json.data.gesotown.pickupBrand.brandGears[0].gear.__splatoon3ink_id].name,
                typ: translation.gearType[json.data.gesotown.pickupBrand.brandGears[0].gear.__typename],// Just still there for backwards compatibility
                type: translation.gearType[json.data.gesotown.pickupBrand.brandGears[0].gear.__typename],
                image: json.data.gesotown.pickupBrand.brandGears[0].gear.image.url,
                primaryGearPower: {
                    name: translation.powers[json.data.gesotown.pickupBrand.brandGears[0].gear.primaryGearPower.__splatoon3ink_id].name,
                    image: json.data.gesotown.pickupBrand.brandGears[0].gear.primaryGearPower.image.url
                },
                additionalGearPowers: [],
                price: json.data.gesotown.pickupBrand.brandGears[0].price,
                saleEnd: json.data.gesotown.pickupBrand.brandGears[0].saleEndTime,
            },
            1: {
                name: translation.gear[json.data.gesotown.pickupBrand.brandGears[1].gear.__splatoon3ink_id].name,
                typ: translation.gearType[json.data.gesotown.pickupBrand.brandGears[1].gear.__typename],// Just still there for backwards compatibility
                type: translation.gearType[json.data.gesotown.pickupBrand.brandGears[1].gear.__typename],
                image: json.data.gesotown.pickupBrand.brandGears[1].gear.image.url,
                primaryGearPower: {
                    name: translation.powers[json.data.gesotown.pickupBrand.brandGears[1].gear.primaryGearPower.__splatoon3ink_id].name,
                    image: json.data.gesotown.pickupBrand.brandGears[1].gear.primaryGearPower.image.url
                },
                additionalGearPowers: [],
                price: json.data.gesotown.pickupBrand.brandGears[1].price,
                saleEnd: json.data.gesotown.pickupBrand.brandGears[1].saleEndTime,
            },
            2: {
                name: translation.gear[json.data.gesotown.pickupBrand.brandGears[2].gear.__splatoon3ink_id].name,
                typ: translation.gearType[json.data.gesotown.pickupBrand.brandGears[2].gear.__typename],// Just still there for backwards compatibility
                type: translation.gearType[json.data.gesotown.pickupBrand.brandGears[2].gear.__typename],
                image: json.data.gesotown.pickupBrand.brandGears[2].gear.image.url,
                primaryGearPower: {
                    name: translation.powers[json.data.gesotown.pickupBrand.brandGears[2].gear.primaryGearPower.__splatoon3ink_id].name,
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
            name: translation.powers[power.__splatoon3ink_id].name,
            image: power.image.url
        })
    });
    json.data.gesotown.pickupBrand.brandGears[1].gear.additionalGearPowers.forEach(power => {//add Powers to gear 1
        data.featuredBrand.brandGears[1].additionalGearPowers.unshift({
            name: translation.powers[power.__splatoon3ink_id].name,
            image: power.image.url
        })
    });
    json.data.gesotown.pickupBrand.brandGears[2].gear.additionalGearPowers.forEach(power => {//add Powers to gear 2
        data.featuredBrand.brandGears[2].additionalGearPowers.unshift({
            name: translation.powers[power.__splatoon3ink_id].name,
            image: power.image.url
        })
    });


    data.limitedGear = {
        0: {
            name: translation.gear[json.data.gesotown.limitedGears[0].gear.__splatoon3ink_id].name,
            typ: translation.gearType[json.data.gesotown.limitedGears[0].gear.__typename],// Just still there for backwards compatibility
            type: translation.gearType[json.data.gesotown.limitedGears[0].gear.__typename],
            image: json.data.gesotown.limitedGears[0].gear.image.url,
            primaryGearPower: {
                name: translation.powers[json.data.gesotown.limitedGears[0].gear.primaryGearPower.__splatoon3ink_id].name,
                image: json.data.gesotown.limitedGears[0].gear.primaryGearPower.image.url
            },
            additionalGearPowers: [],
            price: json.data.gesotown.limitedGears[0].price,
            saleEnd: json.data.gesotown.limitedGears[0].saleEndTime,
            brand: {
                name: translation.brands[json.data.gesotown.limitedGears[0].gear.brand.id].name,
                image: json.data.gesotown.limitedGears[0].gear.brand.image.url
            }
        },
        1: {
            name: translation.gear[json.data.gesotown.limitedGears[1].gear.__splatoon3ink_id].name,
            typ: translation.gearType[json.data.gesotown.limitedGears[1].gear.__typename],// Just still there for backwards compatibility
            type: translation.gearType[json.data.gesotown.limitedGears[1].gear.__typename],
            image: json.data.gesotown.limitedGears[1].gear.image.url,
            primaryGearPower: {
                name: translation.powers[json.data.gesotown.limitedGears[1].gear.primaryGearPower.__splatoon3ink_id].name,
                image: json.data.gesotown.limitedGears[1].gear.primaryGearPower.image.url
            },
            additionalGearPowers: [],
            price: json.data.gesotown.limitedGears[1].price,
            saleEnd: json.data.gesotown.limitedGears[1].saleEndTime,
            brand: {
                name: translation.brands[json.data.gesotown.limitedGears[1].gear.brand.id].name,
                image: json.data.gesotown.limitedGears[1].gear.brand.image.url
            }
        },
        2: {
            name: translation.gear[json.data.gesotown.limitedGears[2].gear.__splatoon3ink_id].name,
            typ: translation.gearType[json.data.gesotown.limitedGears[2].gear.__typename],// Just still there for backwards compatibility
            type: translation.gearType[json.data.gesotown.limitedGears[2].gear.__typename],
            image: json.data.gesotown.limitedGears[2].gear.image.url,
            primaryGearPower: {
                name: translation.powers[json.data.gesotown.limitedGears[2].gear.primaryGearPower.__splatoon3ink_id].name,
                image: json.data.gesotown.limitedGears[2].gear.primaryGearPower.image.url
            },
            additionalGearPowers: [],
            price: json.data.gesotown.limitedGears[2].price,
            saleEnd: json.data.gesotown.limitedGears[2].saleEndTime,
            brand: {
                name: translation.brands[json.data.gesotown.limitedGears[2].gear.brand.id].name,
                image: json.data.gesotown.limitedGears[2].gear.brand.image.url
            }
        },
        3: {
            name: translation.gear[json.data.gesotown.limitedGears[3].gear.__splatoon3ink_id].name,
            typ: translation.gearType[json.data.gesotown.limitedGears[3].gear.__typename],// Just still there for backwards compatibility
            type: translation.gearType[json.data.gesotown.limitedGears[3].gear.__typename],
            image: json.data.gesotown.limitedGears[3].gear.image.url,
            primaryGearPower: {
                name: translation.powers[json.data.gesotown.limitedGears[3].gear.primaryGearPower.__splatoon3ink_id].name,
                image: json.data.gesotown.limitedGears[3].gear.primaryGearPower.image.url
            },
            additionalGearPowers: [],
            price: json.data.gesotown.limitedGears[3].price,
            saleEnd: json.data.gesotown.limitedGears[3].saleEndTime,
            brand: {
                name: translation.brands[json.data.gesotown.limitedGears[3].gear.brand.id].name,
                image: json.data.gesotown.limitedGears[3].gear.brand.image.url
            }
        },
        4: {
            name: translation.gear[json.data.gesotown.limitedGears[4].gear.__splatoon3ink_id].name,
            typ: translation.gearType[json.data.gesotown.limitedGears[4].gear.__typename],// Just still there for backwards compatibility
            type: translation.gearType[json.data.gesotown.limitedGears[4].gear.__typename],
            image: json.data.gesotown.limitedGears[4].gear.image.url,
            primaryGearPower: {
                name: translation.powers[json.data.gesotown.limitedGears[4].gear.primaryGearPower.__splatoon3ink_id].name,
                image: json.data.gesotown.limitedGears[4].gear.primaryGearPower.image.url
            },
            additionalGearPowers: [],
            price: json.data.gesotown.limitedGears[4].price,
            saleEnd: json.data.gesotown.limitedGears[4].saleEndTime,
            brand: {
                name: translation.brands[json.data.gesotown.limitedGears[4].gear.brand.id].name,
                image: json.data.gesotown.limitedGears[4].gear.brand.image.url
            }
        },
        5: {
            name: translation.gear[json.data.gesotown.limitedGears[5].gear.__splatoon3ink_id].name,
            typ: translation.gearType[json.data.gesotown.limitedGears[5].gear.__typename],// Just still there for backwards compatibility
            type: translation.gearType[json.data.gesotown.limitedGears[5].gear.__typename],
            image: json.data.gesotown.limitedGears[5].gear.image.url,
            primaryGearPower: {
                name: translation.powers[json.data.gesotown.limitedGears[5].gear.primaryGearPower.__splatoon3ink_id].name,
                image: json.data.gesotown.limitedGears[5].gear.primaryGearPower.image.url
            },
            additionalGearPowers: [],
            price: json.data.gesotown.limitedGears[5].price,
            saleEnd: json.data.gesotown.limitedGears[5].saleEndTime,
            brand: {
                name: translation.brands[json.data.gesotown.limitedGears[5].gear.brand.id].name,
                image: json.data.gesotown.limitedGears[5].gear.brand.image.url
            }
        }
    }

    json.data.gesotown.limitedGears[0].gear.additionalGearPowers.forEach(power => {
        data.limitedGear[0].additionalGearPowers.unshift({
            name: translation.powers[power.__splatoon3ink_id].name,
            image: power.image.url
        })
    });
    json.data.gesotown.limitedGears[1].gear.additionalGearPowers.forEach(power => {
        data.limitedGear[1].additionalGearPowers.unshift({
            name: translation.powers[power.__splatoon3ink_id].name,
            image: power.image.url
        })
    });
    json.data.gesotown.limitedGears[2].gear.additionalGearPowers.forEach(power => {
        data.limitedGear[2].additionalGearPowers.unshift({
            name: translation.powers[power.__splatoon3ink_id].name,
            image: power.image.url
        })
    });
    json.data.gesotown.limitedGears[3].gear.additionalGearPowers.forEach(power => {
        data.limitedGear[3].additionalGearPowers.unshift({
            name: translation.powers[power.__splatoon3ink_id].name,
            image: power.image.url
        })
    });
    json.data.gesotown.limitedGears[4].gear.additionalGearPowers.forEach(power => {
        data.limitedGear[4].additionalGearPowers.unshift({
            name: translation.powers[power.__splatoon3ink_id].name,
            image: power.image.url
        })
    });
    json.data.gesotown.limitedGears[5].gear.additionalGearPowers.forEach(power => {
        data.limitedGear[5].additionalGearPowers.unshift({
            name: translation.powers[power.__splatoon3ink_id].name,
            image: power.image.url
        })
    });

    return data;
};

module.exports = parse;