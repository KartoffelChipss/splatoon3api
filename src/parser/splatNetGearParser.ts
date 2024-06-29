import { SplatnetResult } from "../types";

export default function parseSplatnetGear(json: any, translation: any): SplatnetResult {
    let data: Partial<SplatnetResult> = {};

    const featuredBrand = json.data.gesotown.pickupBrand;
    data.featuredBrand = {
        name: translation.brands[featuredBrand.brand.id].name,
        banner: featuredBrand.image.url,
        usualPower: {
            name: translation.powers[featuredBrand.brand.usualGearPower.__splatoon3ink_id]?.name,
            image: featuredBrand.brand.usualGearPower.image.url
        },
        saleEnd: featuredBrand.saleEndTime,
        brandGears: []
    }

    featuredBrand.brandGears.forEach((gear: any) => {
        data.featuredBrand!.brandGears.push({
            name: translation.gear[gear.gear.__splatoon3ink_id].name,
            type: translation.gearType[gear.gear.__typename],
            image: gear.gear.image.url,
            primaryGearPower: {
                name: translation.powers[gear.gear.primaryGearPower.__splatoon3ink_id]?.name,
                image: gear.gear.primaryGearPower.image.url
            },
            additionalGearPowers: [],
            price: gear.price,
            saleEnd: gear.saleEndTime,
        })
    });

    for (let i = 0; i < featuredBrand.brandGears.length; i++) {
        featuredBrand.brandGears[i].gear.additionalGearPowers.forEach((power: any) => {
            data.featuredBrand!.brandGears[i].additionalGearPowers.push({
                name: translation.powers[power.__splatoon3ink_id]?.name,
                image: power.image.url
            })
        });
    }

    data.featuredBrand.brandGears.sort((a, b) => a.additionalGearPowers.length - b.additionalGearPowers.length);


    data.limitedGear = json.data.gesotown.limitedGears.map((gearItem: any, index: number) => {
        return {
            name: translation.gear[gearItem.gear.__splatoon3ink_id]?.name,
            type: translation.gearType[gearItem.gear.__typename],
            image: gearItem.gear.image.url,
            primaryGearPower: {
                name: translation.powers[gearItem.gear.primaryGearPower.__splatoon3ink_id]?.name,
                image: gearItem.gear.primaryGearPower.image.url
            },
            additionalGearPowers: gearItem.gear.additionalGearPowers.map((power: any) => ({
                name: translation.powers[power.__splatoon3ink_id]?.name,
                image: power.image.url
            })),
            price: gearItem.price,
            saleEnd: gearItem.saleEndTime,
            brand: {
                name: translation.brands[gearItem.gear.brand.id]?.name,
                image: gearItem.gear.brand.image.url
            }
        };
    });
    

    return data as SplatnetResult;
};