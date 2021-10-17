import { Language } from '../types';

export interface WikidataApiWbSearchEntitiesParams {
    // https://www.wikidata.org/w/api.php?action=help&modules=wbsearchentities
    action: 'wbsearchentities';
    format: 'json'; // https://www.mediawiki.org/wiki/Wikibase/API/pl#Request_Format
    language: Language;
    search: string;
}

export interface WikidataApiWbSearchEntities {
    // https://www.wikidata.org/w/api.php?action=wbsearchentities&format=json&language=en&search=13
    search: Array<SearchEntity>;
}

interface SearchEntity {
    id: string;
    label: string;
    description: string;
    match: EntityMatch;
}

interface EntityMatch {
    type: string;
    language: Language;
    text: string;
}

export interface WikidataApiWbGetEntitiesParams {
    // https://www.wikidata.org/w/api.php?action=help&modules=wbgetentities
    action: 'wbgetentities';
    format: 'json';
    props: 'sitelinks';
    sitefilter: string;
    ids: string;
}

export interface WikidataApiWbGetEntities {
    // https://www.wikidata.org/w/api.php?action=wbgetentities&format=json&props=sitelinks&sitefilter=plwiki&ids=Q23411
    entities: {
        [entityId: string]: GetEntity;
    };
}

interface GetEntity {
    type: string;
    id: string;
    sitelinks: SiteLink;
}

interface SiteLink {
    [site: string]: {
        site: string;
        title: string;
    };
}
