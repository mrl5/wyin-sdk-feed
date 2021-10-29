import get from 'axios';
import { Language } from '../types';
import { WikipediaApiQuery } from './wikipediaApi';

export async function query(title: string, lang: Language): Promise<WikipediaApiQuery> {
    const params = new URLSearchParams({
        action: 'query',
        prop: 'extracts',
        format: 'json',
        titles: title,
    });
    const url = new URL(`https://${lang}.wikipedia.org/w/api.php?${params.toString()}`);
    const resp = await get(url.toString());
    return resp.data as WikipediaApiQuery;
}

export function getWikiPageContent(data: WikipediaApiQuery): string {
    const [pageId] = Object.keys(data.query.pages);
    return data.query.pages[pageId].extract;
}
