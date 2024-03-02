const { Client } = require('../src/main.js');
const Splatoon3 = new Client('en-US', {
    userAgent: 'Splatoon 3 API'
});

describe("Splatoon 3 Stages", () => {
    it('should return all stages', async () => {
        const res = await Splatoon3.getStages();
        expect(res).toBeDefined();
    });

    it("should return current stages", async () => {
        const res = await Splatoon3.getCurrentStages();
        expect(res).toBeDefined();
    });

    it("should return next stages", async () => {
        const res = await Splatoon3.getNextStages();
        expect(res).toBeDefined();
    });
})