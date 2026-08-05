import { SplatGearpower } from '../types/common';
import {
    SplatnetFeaturedBrand,
    SplatnetGear,
    SplatnetGearFeatured,
    SplatnetResult,
} from '../types/gear';

function buildGearPower(powerNode: any, translation: any): SplatGearpower {
    return {
        id: powerNode.__splatoon3ink_id,
        name: translation.powers[powerNode.__splatoon3ink_id]?.name,
        image: powerNode.image.url,
    };
}

function buildFeaturedGear(
    gearItem: any,
    translation: any,
): SplatnetGearFeatured {
    const gear = gearItem.gear;
    return {
        id: gear.__splatoon3ink_id,
        name: translation.gear[gear.__splatoon3ink_id]?.name,
        type: translation.gearType[gear.__typename],
        image: gear.image.url,
        primaryGearPower: buildGearPower(gear.primaryGearPower, translation),
        additionalGearPowers: gear.additionalGearPowers.map((power: any) =>
            buildGearPower(power, translation),
        ),
        price: gearItem.price,
        saleEnd: gearItem.saleEndTime,
    };
}

function buildLimitedGear(gearItem: any, translation: any): SplatnetGear {
    const gear = gearItem.gear;
    return {
        id: gear.__splatoon3ink_id,
        name: translation.gear[gear.__splatoon3ink_id]?.name,
        type: translation.gearType[gear.__typename],
        image: gear.image.url,
        primaryGearPower: buildGearPower(gear.primaryGearPower, translation),
        additionalGearPowers: gear.additionalGearPowers.map((power: any) =>
            buildGearPower(power, translation),
        ),
        price: gearItem.price,
        saleEnd: gearItem.saleEndTime,
        brand: {
            id: gear.brand.id,
            name: translation.brands[gear.brand.id]?.name,
            image: gear.brand.image.url,
        },
    };
}

export default function parseSplatnetGear(
    json: any,
    translation: any,
): SplatnetResult {
    const pickupBrand = json.data.gesotown.pickupBrand;

    const brandGears = pickupBrand.brandGears
        .map((gearItem: any) => buildFeaturedGear(gearItem, translation))
        .sort(
            (a: SplatnetGearFeatured, b: SplatnetGearFeatured) =>
                a.additionalGearPowers.length - b.additionalGearPowers.length,
        );

    const featuredBrand: SplatnetFeaturedBrand = {
        id: pickupBrand.brand.id,
        name: translation.brands[pickupBrand.brand.id]?.name,
        banner: pickupBrand.image.url,
        usualPower: buildGearPower(
            pickupBrand.brand.usualGearPower,
            translation,
        ),
        saleEnd: pickupBrand.saleEndTime,
        brandGears,
    };

    const limitedGear = json.data.gesotown.limitedGears.map((gearItem: any) =>
        buildLimitedGear(gearItem, translation),
    );

    return { featuredBrand, limitedGear };
}
