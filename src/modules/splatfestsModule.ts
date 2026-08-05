import * as Types from '../types';
import { BaseModule } from './baseModule';
import parseUpcomingSplatfests from '../parser/splatfests/upcomingSplatfestsParser';
import parseRunningSplatfests from '../parser/splatfests/runningSplatfestsParser';
import parsePastSplatfests from '../parser/splatfests/pastSplatfestsParser';

export class SplatfestsModule extends BaseModule {
    /**
     * Scheduled Splatfests. Titles and team names come straight from the
     * per-region festival JSON, not the translation file, so `lang` has no
     * effect here.
     */
    async upcoming(): Promise<Types.FestData> {
        const json = await this.fetchJson(this.context.options.festURL);
        return parseUpcomingSplatfests(json);
    }

    /** The currently running Splatfests. */
    async running(opts?: Types.CallOptions): Promise<Types.RunningFestData> {
        const [json, translation] = await Promise.all([
            this.fetchJson(this.context.options.festURL),
            this.resolveTranslation(opts?.lang),
        ]);
        return parseRunningSplatfests(json, translation);
    }

    /** Past Splatfests. */
    async past(opts?: Types.CallOptions): Promise<Types.PastFestData> {
        const [json, translation] = await Promise.all([
            this.fetchJson(this.context.options.festURL),
            this.resolveTranslation(opts?.lang),
        ]);
        return parsePastSplatfests(json, translation);
    }
}
