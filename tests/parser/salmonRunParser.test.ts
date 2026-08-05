import parseSalmonRun from '../../src/parser/salmonRunParser';
import { buildTranslation } from '../fixtures';

function buildWeaponNode(id: string) {
    return { __splatoon3ink_id: id, image: { url: `${id}.png` } };
}

describe('parseSalmonRun', () => {
    it('builds schedules only for nodes that have a setting', () => {
        const scheduleJson = {
            data: {
                coopGroupingSchedule: {
                    regularSchedules: {
                        nodes: [
                            { startTime: 't0', endTime: 't1', setting: null },
                            {
                                startTime: 't1',
                                endTime: 't2',
                                setting: {
                                    coopStage: { id: 'stage1', image: { url: 'stage1.png' } },
                                    boss: { id: 'boss1' },
                                    weapons: [buildWeaponNode('weapon1')],
                                },
                            },
                        ],
                    },
                    bigRunSchedules: { nodes: [] },
                },
            },
        };
        const gearJson = {
            data: {
                coopResult: {
                    monthlyGear: {
                        __splatoon3ink_id: 'gear1',
                        __typename: 'ClothingGear',
                        image: { url: 'gear1.png' },
                    },
                },
            },
        };

        const result = parseSalmonRun(scheduleJson, gearJson, buildTranslation());

        expect(result.regularSchedules).toHaveLength(1);
        expect(result.regularSchedules[0].boss).toBe('Big Shot');
        expect(result.regularSchedules[0].weapons[0]).toEqual({
            id: 'weapon1',
            name: 'Splattershot',
            image: 'weapon1.png',
        });
        expect(result.monthlyGear).toEqual({
            id: 'gear1',
            name: 'Cool Cap',
            type: 'Clothing',
            typeId: 'ClothingGear',
            image: 'gear1.png',
        });
    });

    it('returns a null monthly gear when the gear response has none', () => {
        const scheduleJson = {
            data: {
                coopGroupingSchedule: {
                    regularSchedules: { nodes: [] },
                    bigRunSchedules: { nodes: [] },
                },
            },
        };

        const result = parseSalmonRun(
            scheduleJson,
            { data: { coopResult: {} } },
            buildTranslation()
        );
        expect(result.monthlyGear).toBeNull();
    });
});
