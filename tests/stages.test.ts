import { Client } from '../dist/main';
import { Options } from '../dist/types';
const Splatoon3 = new Client("en-US");
const Splatoon3Running = new Client("de-DE", new Options({ festURL: "https://splatoon3ink-archive.nyc3.digitaloceanspaces.com/2024/05/19/2024-05-19.05-00-00.festivals.json" }));

describe("Splatoon 3 Stages", () => {
    it('should return all stages', async () => {
        const res = await Splatoon3.getStages();
        const resSplatfest = await Splatoon3Running.getStages();
        expect(res).toBeDefined();
        expect(resSplatfest).toBeDefined();
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