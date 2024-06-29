import { Client } from '../dist/main';
const Splatoon3 = new Client("en-US");

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