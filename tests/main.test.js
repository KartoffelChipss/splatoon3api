const { Client } = require('../src/main.js');

const Splatoon3 = new Client('en-US', {
    userAgent: 'Splatoon 3 API'
});

describe('Splatoon3', () => {
    it('should return the salmon run', async () => {
        const res = await Splatoon3.getSalmonRun();
        expect(res).toBeDefined();
    });

    it('should return the splatnet gear', async () => {
        const res = await Splatoon3.getSplatnetGear();
        expect(res).toBeDefined();
    });

    it('should return the challenges', async () => {
        const res = await Splatoon3.getChallenges();
        expect(res).toBeDefined();
    });
});