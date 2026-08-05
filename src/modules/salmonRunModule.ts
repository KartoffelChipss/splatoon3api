import * as Types from '../types';
import { BaseModule } from './baseModule';
import parseSalmonRun from '../parser/salmonRunParser';

export class SalmonRunModule extends BaseModule {
    /** The Salmon Run and Big Run schedules, plus the current monthly gear. */
    async get(opts?: Types.CallOptions): Promise<Types.SalmonResult> {
        const [scheduleJson, gearJson, translation] = await Promise.all([
            this.fetchJson(this.context.options.schedulesURL),
            this.fetchJson(this.context.options.salmonGearURL),
            this.resolveTranslation(opts?.lang),
        ]);
        return parseSalmonRun(scheduleJson, gearJson, translation);
    }
}
