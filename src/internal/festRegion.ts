import { FestRegion } from '../types/common';

const FEST_REGIONS: FestRegion[] = ['US', 'EU', 'JP', 'AP'];

export function isFestRegion(value: any): value is FestRegion {
    return FEST_REGIONS.includes(value);
}
