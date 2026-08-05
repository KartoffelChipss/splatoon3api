import * as Types from '../types';
import { BaseModule } from './baseModule';
import parseChallenges from '../parser/challengesParser';

export class ChallengesModule extends BaseModule {
    /** The current challenges. */
    async get(opts?: Types.CallOptions): Promise<Types.SplatChallenge[]> {
        const [json, translation] = await Promise.all([
            this.fetchJson(this.context.options.schedulesURL),
            this.resolveTranslation(opts?.lang),
        ]);
        return parseChallenges(json, translation);
    }
}
