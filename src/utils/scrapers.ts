import cheerio from 'cheerio';
import { NoContentError } from '../errors';
import { Year, ScrappedData, Html } from '../types';

export function getYearEventFromCenturyPage(year: Year, html: Html): ScrappedData | undefined {
    const match = getFirstMatch(cheerio.load(html), year);
    const event = handleMultiEvent(match?.text(), year);
    const category = match ? getCategory(match).text() : undefined;
    if (event) {
        return { event, category };
    }
    return;
}

export function getRandomEventFromYearPage(html: Html): ScrappedData | never {
    const tags = getTagsWithContent(cheerio.load(html));
    const tag = getRandomEvent(tags);
    const event = tag.text();
    const category = tag ? getCategory(tag).text() : undefined;
    if (event) {
        return { event, category };
    }
    throw new NoContentError('no content for given year');
}

type YearMatchFunction = (innerText: string, year: Year) => boolean;

function matchYearFirstPattern(innerText: string, year: Year): boolean {
    const regex = new RegExp(`^${year}[^0-9]`);
    return regex.test(innerText);
}

function matchYearLaterPattern(innerText: string, year: Year): boolean {
    const regex = new RegExp(`[^/\-\–]${year}[^0-9]`);
    return regex.test(innerText);
}

function getFirstMatch($: cheerio.Root, year: Year): cheerio.Cheerio | undefined {
    const li = $('li');
    const matchFunctions: Array<YearMatchFunction> = [matchYearFirstPattern, matchYearLaterPattern];
    for (const fn of matchFunctions) {
        const match = li.filter((_, i) => fn($(i).text(), year)).first();
        const innerText = match.text();
        if (innerText && !innerText.endsWith(' -')) {
            return match;
        }
    }
    return;
}

function handleMultiEvent(innerText: string | undefined, year: Year): string | undefined {
    if (innerText) {
        const [event] = innerText.split('\\n').filter((x) => x !== year.toString());
        return event;
    }
    return;
}

function getCategory(match: cheerio.Cheerio): cheerio.Cheerio {
    const category = match.parent().prev('h2').children('span');
    if (category.text()) {
        return category;
    }
    return match.parent().prev('h3').prev('h2').children('span');
}

function getTagsWithContent($: cheerio.Root): cheerio.Cheerio {
    return $('li')
        .filter((_, i) => $(i).children().length === 0)
        .filter((_, i) => $(i).text() !== '');
}

function getRandomEvent(tags: cheerio.Cheerio): cheerio.Cheerio {
    const randomIndex = Math.floor(Math.random() * tags.length);
    return tags.filter((e) => e === randomIndex);
}
