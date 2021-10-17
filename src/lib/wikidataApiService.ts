import get, { AxiosResponse } from 'axios';
import { Century, Year, Language } from '../types';
import { convertYearToCentury } from './converters';
import {
    WikidataApiWbSearchEntitiesParams,
    WikidataApiWbSearchEntities,
    WikidataApiWbGetEntitiesParams,
    WikidataApiWbGetEntities,
} from './wikidataApi';

export type CenturyAndYearTitles = [CenturyTitle, YearTitle];
type CenturyTitle = string;
type YearTitle = string;

export async function getWikipediaTitlesForCenturyAndYear(year: Year, lang: Language): Promise<CenturyAndYearTitles> {
    const century = convertYearToCentury(year);
    const [centuryEntities, yearEntities] = await Promise.all([
        querySearchEntities(getCenturyKeyword(century), lang),
        querySearchEntities(String(year), lang),
    ]);
    const ids = [getCenturyTitleId(centuryEntities), getYearTitleId(yearEntities)];
    const entities = await queryGetEntities(ids.join('|'), lang);
    const [centuryTitleId, yearTitleId] = ids;

    return [getTitle(entities, centuryTitleId, lang), getTitle(entities, yearTitleId, lang)];
}

type WikidataApiParams = WikidataApiWbSearchEntitiesParams | WikidataApiWbGetEntitiesParams;
async function query(params: WikidataApiParams): Promise<AxiosResponse> {
    const p = new URLSearchParams({ ...params });
    const url = new URL(`https://www.wikidata.org/w/api.php?${p.toString()}`);
    return get(url.toString());
}

async function querySearchEntities(keyword: string, lang: Language): Promise<WikidataApiWbSearchEntities> {
    const params: WikidataApiWbSearchEntitiesParams = {
        action: 'wbsearchentities',
        format: 'json',
        language: lang,
        search: keyword,
    };
    const response = await query(params);
    return response.data as WikidataApiWbSearchEntities;
}

async function queryGetEntities(ids: string, lang: Language): Promise<WikidataApiWbGetEntities> {
    const params: WikidataApiWbGetEntitiesParams = {
        action: 'wbgetentities',
        format: 'json',
        props: 'sitelinks',
        sitefilter: `${lang}wiki`,
        ids,
    };
    const response = await query(params);
    return response.data as WikidataApiWbGetEntities;
}

function getCenturyKeyword(century: Century): string {
    return `${century}_wiek`;
}

function getCenturyTitleId(centuryEntities: WikidataApiWbSearchEntities): string {
    const pattern = new RegExp('century$');
    return getTitleId(centuryEntities, { labelPattern: pattern });
}

function getYearTitleId(yearEntities: WikidataApiWbSearchEntities): string {
    const pattern = new RegExp('^year[.,]?$|^year[ .,].+$|.+[ ]year[ .,].*|[ ]year$');
    return getTitleId(yearEntities, { descriptionPattern: pattern });
}

type GetTitleIdParams = GetTitleIdLabelParam | GetTitleIdDescriptionParam;
type GetTitleIdLabelParam = { labelPattern: RegExp; descriptionPattern?: RegExp };
type GetTitleIdDescriptionParam = { descriptionPattern: RegExp; labelPattern?: RegExp };
function getTitleId(entities: WikidataApiWbSearchEntities, params: GetTitleIdParams): string {
    const { labelPattern, descriptionPattern } = params;
    const [searchEntity] = descriptionPattern
        ? entities.search.filter((e) => descriptionPattern.test(e.description))
        : entities.search.filter((e) => labelPattern?.test(e.label));
    return searchEntity.id;
}

function getTitle(entities: WikidataApiWbGetEntities, titleId: string, lang: Language): string {
    const siteFilter = getSiteFilter(lang);
    return entities.entities[titleId].sitelinks[siteFilter].title;
}

function getSiteFilter(lang: Language): string {
    const adaptedLang = lang.replace('-', '_');
    return `${adaptedLang}wiki`;
}
