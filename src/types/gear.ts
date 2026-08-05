import { Lang, SplatGearpower } from './common';

export type GearTypeId = 'HeadGear' | 'ClothingGear' | 'ShoesGear';

export type GearTypeTranslation = Record<GearTypeId, string>;

export type GearTranslations = Record<Lang, GearTypeTranslation>;

export interface Brand {
    id: string;
    name: string;
    image: string;
}

export interface SplatnetGearFeatured {
    id: string;
    name: string;
    type: string;
    image: string;
    primaryGearPower: SplatGearpower;
    additionalGearPowers: SplatGearpower[];
    price: number;
    saleEnd: string;
}

export interface SplatnetGear {
    id: string;
    name: string;
    type: string;
    image: string;
    primaryGearPower: SplatGearpower;
    additionalGearPowers: SplatGearpower[];
    price: number;
    saleEnd: string;
    brand: Brand;
}

export interface SplatnetFeaturedBrand {
    id: string;
    name: string;
    banner: string;
    usualPower: SplatGearpower;
    saleEnd: string;
    brandGears: SplatnetGearFeatured[];
}

export interface SplatnetResult {
    featuredBrand: SplatnetFeaturedBrand;
    limitedGear: SplatnetGear[];
}
