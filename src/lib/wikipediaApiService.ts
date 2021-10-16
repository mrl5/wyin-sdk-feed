import get, { AxiosResponse } from 'axios';
import { Language } from '../types';
import { WikipediaApiQuery } from './wikipediaApi';

export async function query(title: string, lang: Language): Promise<AxiosResponse> {
    const params = new URLSearchParams({
        action: 'query',
        prop: 'extracts',
        format: 'json',
        titles: title,
    });
    const url = new URL(`https://${lang}.wikipedia.org/w/api.php?${params.toString()}`);
    return get(url.toString());
}

export function get_wiki_page_content(data: WikipediaApiQuery): string {
    const [pageId] = Object.keys(data.query.pages);
    return data.query.pages[pageId].extract;
}
