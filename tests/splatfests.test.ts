import { Client, Types } from '../dist/main';

const Splatoon3 = new Client("de-DE");
const Splatoon3Running = new Client("de-DE", new Types.Options({ festURL: "https://splatoon3ink-archive.nyc3.digitaloceanspaces.com/2024/05/19/2024-05-19.05-00-00.festivals.json" }));
const Splatoon3Upcoming = new Client("de-DE", new Types.Options({ festURL: "https://splatoon3ink-archive.nyc3.digitaloceanspaces.com/2024/05/16/2024-05-16.01-00-00.festivals.json" }));

describe("Splatoon 3 Stages", () => {
    it('should return the upcoming splatfests', async () => {
        const res = await Splatoon3Upcoming.getUpcomingSplatfests();
        expect(res).toBeDefined();
        expect(res.JP[0]).toBeDefined();
    });

    it('should return the running splatfests', async () => {
        const res = await Splatoon3Running.getRunningSplatfests();
        expect(res).toBeDefined();
        expect(res.JP[0]).toBeDefined();
    });

    it('should return the past splatfests', async () => {
        const res = await Splatoon3.getPastSplatfests();
        expect(res).toBeDefined();
        expect(res.JP[0]).toBeDefined();
    });
});