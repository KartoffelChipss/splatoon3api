import parseSplatnetGear from '../../src/parser/splatNetGearParser';
import { buildTranslation } from '../fixtures';

function buildGearNode(id: string, typename = 'ClothingGear') {
    return {
        __splatoon3ink_id: id,
        __typename: typename,
        image: { url: `${id}.png` },
        primaryGearPower: { __splatoon3ink_id: 'power1', image: { url: 'power1.png' } },
        additionalGearPowers: [],
        brand: { id: 'brand1', image: { url: 'brand1.png' } },
    };
}

describe('parseSplatnetGear', () => {
    it('builds the featured brand and limited gear, sorting featured gears by additional power count', () => {
        const json = {
            data: {
                gesotown: {
                    pickupBrand: {
                        brand: {
                            id: 'brand1',
                            usualGearPower: {
                                __splatoon3ink_id: 'power1',
                                image: { url: 'power1.png' },
                            },
                        },
                        image: { url: 'banner.png' },
                        saleEndTime: 't1',
                        brandGears: [
                            {
                                gear: {
                                    ...buildGearNode('gearA'),
                                    additionalGearPowers: [
                                        { __splatoon3ink_id: 'power1', image: { url: 'p.png' } },
                                    ],
                                },
                                price: 100,
                                saleEndTime: 't1',
                            },
                            { gear: buildGearNode('gearB'), price: 200, saleEndTime: 't1' },
                        ],
                    },
                    limitedGears: [{ gear: buildGearNode('gear1'), price: 300, saleEndTime: 't1' }],
                },
            },
        };

        const result = parseSplatnetGear(json, buildTranslation());

        expect(result.featuredBrand.id).toBe('brand1');
        expect(result.featuredBrand.name).toBe('Zekko');
        // gearB has 0 additional powers, gearA has 1 -> gearB sorts first.
        expect(result.featuredBrand.brandGears.map((g) => g.id)).toEqual(['gearB', 'gearA']);
        expect(result.limitedGear[0]).toMatchObject({
            id: 'gear1',
            name: 'Cool Cap',
            brand: { id: 'brand1', name: 'Zekko' },
        });
    });
});
