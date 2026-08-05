import * as Types from '../types';
import { BaseModule } from './baseModule';
import parseAllStages from '../parser/stages/allStagesParser';
import parseCurrentStages from '../parser/stages/currentStagesParser';
import parseNextStages from '../parser/stages/nextStagesParser';

export class StagesModule extends BaseModule {
    /** 11 upcoming and the current Turf War, Ranked and X Battle maps. */
    async getAll(opts?: Types.CallOptions): Promise<Types.AllStagesResponse> {
        const [json, translation] = await Promise.all([
            this.fetchJson(this.context.options.schedulesURL),
            this.resolveTranslation(opts?.lang),
        ]);
        return parseAllStages(json, translation);
    }

    /** The currently active Turf War, Ranked and X Battle maps. */
    async getCurrent(opts?: Types.CallOptions): Promise<Types.StagesResponse> {
        const [json, translation] = await Promise.all([
            this.fetchJson(this.context.options.schedulesURL),
            this.resolveTranslation(opts?.lang),
        ]);
        return parseCurrentStages(json, translation);
    }

    /** The next Turf War, Ranked and X Battle maps. */
    async getNext(opts?: Types.CallOptions): Promise<Types.StagesResponse> {
        const [json, translation] = await Promise.all([
            this.fetchJson(this.context.options.schedulesURL),
            this.resolveTranslation(opts?.lang),
        ]);
        return parseNextStages(json, translation);
    }
}
