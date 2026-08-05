import { SplatStage } from './common';
import { GearTypeId } from './gear';

export interface SalmonRunWeapon {
    id: string;
    name: string;
    image: string;
}

export interface SalmonMonthlygear {
    id: string;
    name: string;
    type: string;
    typeId: GearTypeId;
    image: string;
}

export interface SalmonSchedule {
    start_time: string;
    end_time: string;
    stage: SplatStage;
    weapons: SalmonRunWeapon[];
    boss: string;
}

export interface SalmonResult {
    regularSchedules: SalmonSchedule[];
    bigRunSchedules: SalmonSchedule[];
    monthlyGear: SalmonMonthlygear | null;
}
