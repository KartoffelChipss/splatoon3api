const { Client } = require('../src/main.js');
const Splatoon3 = new Client('en-US', {
    userAgent: 'Splatoon 3 API'
});

describe("Splatoon 3 Stages", () => {
    it('should return the upcoming splatfests', async () => {
        const res = await Splatoon3.getUpcomingSplatfests();
        expect(res).toBeDefined();
    });

    it('should return the running splatfests', async () => {
        const res = await Splatoon3.getRunningSplatfests();
        expect(res).toBeDefined();
    });

    it('should return the past splatfests', async () => {
        const res = await Splatoon3.getPastSplatfests();
        expect(res).toBeDefined();
    });
})