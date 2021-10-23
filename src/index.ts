import { Language, Time, Year } from './types';
import { SingleHistoryEventModel } from './contracts/singleHistoryEvent';
import { NotFoundModel } from './contracts/notFound';
import { NotFoundError } from './errors';
import { convertTimeToYear } from './lib/converters';
import { CenturyAndYearTitles, getWikipediaTitlesForCenturyAndYear } from './lib/wikidataApiService';
import { WikipediaApiQuery } from './lib/wikipediaApi';
import { query, getWikiPageContent } from './lib/wikipediaApiService';
import { getYearEventFromCenturyPage, getRandomEventFromYearPage } from './lib/scrapers';

type Response = Promise<SingleHistoryEventModel | NotFoundModel>;

export async function getEventByTime(time: Time, lang: Language): Response {
    const year = convertTimeToYear(time);
    return getEventByYear(year, lang);
}

export async function getEventByRandom(lang: Language): Response {
    const year = getRandomYear();
    return getEventByYear(year, lang);
}

export async function getEventByYear(year: Year, lang: Language): Response {
    try {
        const titles = await getWikipediaTitlesForCenturyAndYear(year, lang);
        const [centuryTitle, yearTitle] = titles;
        const [centuryResp, yearResp] = await Promise.all([query(centuryTitle, lang), query(yearTitle, lang)]);
        const { data, category, source } = getHistoricalEvent(year, centuryResp, yearResp, titles, lang);
        return {
            year,
            data,
            category,
            source,
        };
    } catch (err) {
        if (err instanceof NotFoundError) {
            return {
                year,
                body: err.message,
                code: err.code,
            };
        }
        throw err;
    }
}

function getHistoricalEvent(
    year: Year,
    centuryResp: WikipediaApiQuery,
    yearResp: WikipediaApiQuery,
    titles: CenturyAndYearTitles,
    lang: Language,
) {
    const [centuryTitle, yearTitle] = titles;
    let html = getWikiPageContent(centuryResp);
    let data = getYearEventFromCenturyPage(year, html);
    if (data) {
        return {
            data: data.event,
            category: data.category,
            source: getSource(centuryTitle, lang),
        };
    }

    html = getWikiPageContent(yearResp);
    data = getRandomEventFromYearPage(html);
    return {
        data: data?.event || '',
        category: data?.category,
        source: getSource(yearTitle, lang),
    };
}

function getSource(title: string, lang: Language) {
    const encodedTitle = encodeURIComponent(title);
    return `https://${lang}.wikipedia.org/wiki/${encodedTitle}`;
}

function getRandomYear(): Year {
    // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/random#getting_a_random_integer_between_two_values_inclusive
    const min = 1;
    const max = new Date().getFullYear();
    return Math.floor(Math.random() * (max - min + 1)) + min;
}
