import * as Types from '../types';
import { BaseModule } from './baseModule';
import parseSplatnetGear from '../parser/splatNetGearParser';

export class GearModule extends BaseModule {
    /** The gear currently available in the Splatnet shop. */
    async get(opts?: Types.CallOptions): Promise<Types.SplatnetResult> {
        const [json, translation] = await Promise.all([
            this.fetchJson(this.context.options.gearURL),
            this.resolveTranslation(opts?.lang),
        ]);
        return parseSplatnetGear(json, translation);
    }
}
