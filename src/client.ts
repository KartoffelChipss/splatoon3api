import NodeCache from 'node-cache';
import * as Types from './types';
import { ClientContext } from './modules/baseModule';
import { StagesModule } from './modules/stagesModule';
import { ChallengesModule } from './modules/challengesModule';
import { SalmonRunModule } from './modules/salmonRunModule';
import { GearModule } from './modules/gearModule';
import { SplatfestsModule } from './modules/splatfestsModule';

class Client {
    readonly stages: StagesModule;
    readonly challenges: ChallengesModule;
    readonly salmonRun: SalmonRunModule;
    readonly gear: GearModule;
    readonly splatfests: SplatfestsModule;

    /**
     * @param options - Request options, including `defaultLang` (falls back to "en-US").
     * Raw upstream data is cached once per `Client` regardless of language; pass `{ lang }`
     * on individual calls to fetch a different language without creating another `Client`.
     */
    constructor(options?: Types.OptionsInput) {
        const context: ClientContext = {
            options: new Types.Options(options),
            dataCache: new NodeCache(),
            translationCache: new Map(),
        };

        this.stages = new StagesModule(context);
        this.challenges = new ChallengesModule(context);
        this.salmonRun = new SalmonRunModule(context);
        this.gear = new GearModule(context);
        this.splatfests = new SplatfestsModule(context);
    }
}

export { Client };
