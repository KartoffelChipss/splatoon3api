import { CacheStore, Lang, Options } from '../types/common';
import { fetchJson as fetchJsonInternal } from '../internal/fetchData';
import { formatLang, getTranslation } from '../internal/translations';

export interface ClientContext {
    options: Options;
    dataCache: CacheStore;
    translationCache: Map<Lang, Promise<any>>;
}

export abstract class BaseModule {
    constructor(protected readonly context: ClientContext) {}

    protected fetchJson(url: string): Promise<any> {
        return fetchJsonInternal(
            url,
            this.context.options,
            this.context.dataCache,
        );
    }

    protected resolveTranslation(lang?: Lang): Promise<any> {
        const resolvedLang = formatLang(
            lang ?? this.context.options.defaultLang,
        );
        return getTranslation(this.context.translationCache, resolvedLang);
    }
}
