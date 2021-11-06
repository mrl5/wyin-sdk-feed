export interface SingleHistoryEvent {
    year: Year;
    data: string;
    category?: string;
    source: string;
    [k: string]: unknown;
}

export interface NotFoundEvent {
    year: Year;
    body: string;
    code: NotFoundCodeEnum;
    [k: string]: unknown;
}
export type NotFoundCodeEnum = 'NF001' | 'NF002' | 'NF003';

/**
 * 24-hour clock time
 * @format HH:MM
 * @pattern ^([0-1]?[0-9]|2[0-3]):([0-5][0-9])$
 */
export type Time = string;
export const timePattern = '^([0-1]?[0-9]|2[0-3]):([0-5][0-9])$';

/**
 * Common era year
 * @isInt year should be an integer
 * @format int32
 * @link https://tsoa-community.github.io/docs/annotations.html#numeric
 */
export type Year = number;

/**
 * Roman number
 */
export type Century = string;

export type Html = string;

export type ScrappedData = {
    event: string;
    category?: string;
};

/**
 * Language supported by wikipedia
 * @link https://commons.wikimedia.org/w/api.php?action=sitematrix&smtype=language
 */
export type Language =
    | 'aa'
    | 'ab'
    | 'ace'
    | 'ady'
    | 'af'
    | 'ak'
    | 'als'
    | 'alt'
    | 'am'
    | 'an'
    | 'ang'
    | 'ar'
    | 'arc'
    | 'ary'
    | 'arz'
    | 'as'
    | 'ast'
    | 'atj'
    | 'av'
    | 'avk'
    | 'awa'
    | 'ay'
    | 'az'
    | 'azb'
    | 'ba'
    | 'ban'
    | 'bar'
    | 'bat-smg'
    | 'bcl'
    | 'be'
    | 'be-tarask'
    | 'be-x-old'
    | 'bg'
    | 'bh'
    | 'bi'
    | 'bjn'
    | 'bm'
    | 'bn'
    | 'bo'
    | 'bpy'
    | 'br'
    | 'bs'
    | 'bug'
    | 'bxr'
    | 'ca'
    | 'cbk-zam'
    | 'cdo'
    | 'ce'
    | 'ceb'
    | 'ch'
    | 'cho'
    | 'chr'
    | 'chy'
    | 'ckb'
    | 'co'
    | 'cr'
    | 'crh'
    | 'cs'
    | 'csb'
    | 'cu'
    | 'cv'
    | 'cy'
    | 'da'
    | 'de'
    | 'din'
    | 'diq'
    | 'dsb'
    | 'dty'
    | 'dv'
    | 'dz'
    | 'ee'
    | 'el'
    | 'eml'
    | 'en'
    | 'eo'
    | 'es'
    | 'et'
    | 'eu'
    | 'ext'
    | 'fa'
    | 'ff'
    | 'fi'
    | 'fiu-vro'
    | 'fj'
    | 'fo'
    | 'fr'
    | 'frp'
    | 'frr'
    | 'fur'
    | 'fy'
    | 'ga'
    | 'gag'
    | 'gan'
    | 'gcr'
    | 'gd'
    | 'gl'
    | 'glk'
    | 'gn'
    | 'gom'
    | 'gor'
    | 'got'
    | 'gu'
    | 'gv'
    | 'ha'
    | 'hak'
    | 'haw'
    | 'he'
    | 'hi'
    | 'hif'
    | 'ho'
    | 'hr'
    | 'hsb'
    | 'ht'
    | 'hu'
    | 'hy'
    | 'hyw'
    | 'hz'
    | 'ia'
    | 'id'
    | 'ie'
    | 'ig'
    | 'ii'
    | 'ik'
    | 'ilo'
    | 'inh'
    | 'io'
    | 'is'
    | 'it'
    | 'iu'
    | 'ja'
    | 'jam'
    | 'jbo'
    | 'jv'
    | 'ka'
    | 'kaa'
    | 'kab'
    | 'kbd'
    | 'kbp'
    | 'kg'
    | 'ki'
    | 'kj'
    | 'kk'
    | 'kl'
    | 'km'
    | 'kn'
    | 'ko'
    | 'koi'
    | 'kr'
    | 'krc'
    | 'ks'
    | 'ksh'
    | 'ku'
    | 'kv'
    | 'kw'
    | 'ky'
    | 'la'
    | 'lad'
    | 'lb'
    | 'lbe'
    | 'lez'
    | 'lfn'
    | 'lg'
    | 'li'
    | 'lij'
    | 'lld'
    | 'lmo'
    | 'ln'
    | 'lo'
    | 'lrc'
    | 'lt'
    | 'ltg'
    | 'lv'
    | 'mad'
    | 'mai'
    | 'map-bms'
    | 'mdf'
    | 'mg'
    | 'mh'
    | 'mhr'
    | 'mi'
    | 'min'
    | 'mk'
    | 'ml'
    | 'mn'
    | 'mni'
    | 'mnw'
    | 'mo'
    | 'mr'
    | 'mrj'
    | 'ms'
    | 'mt'
    | 'mus'
    | 'mwl'
    | 'my'
    | 'myv'
    | 'mzn'
    | 'na'
    | 'nah'
    | 'nap'
    | 'nds'
    | 'nds-nl'
    | 'ne'
    | 'new'
    | 'ng'
    | 'nia'
    | 'nl'
    | 'nn'
    | 'no'
    | 'nov'
    | 'nqo'
    | 'nrm'
    | 'nso'
    | 'nv'
    | 'ny'
    | 'oc'
    | 'olo'
    | 'om'
    | 'or'
    | 'os'
    | 'pa'
    | 'pag'
    | 'pam'
    | 'pap'
    | 'pcd'
    | 'pdc'
    | 'pfl'
    | 'pi'
    | 'pih'
    | 'pl'
    | 'pms'
    | 'pnb'
    | 'pnt'
    | 'ps'
    | 'pt'
    | 'qu'
    | 'rm'
    | 'rmy'
    | 'rn'
    | 'ro'
    | 'roa-rup'
    | 'roa-tara'
    | 'ru'
    | 'rue'
    | 'rw'
    | 'sa'
    | 'sah'
    | 'sat'
    | 'sc'
    | 'scn'
    | 'sco'
    | 'sd'
    | 'se'
    | 'sg'
    | 'sh'
    | 'shn'
    | 'shy'
    | 'si'
    | 'simple'
    | 'sk'
    | 'skr'
    | 'sl'
    | 'sm'
    | 'smn'
    | 'sn'
    | 'so'
    | 'sq'
    | 'sr'
    | 'srn'
    | 'ss'
    | 'st'
    | 'stq'
    | 'su'
    | 'sv'
    | 'sw'
    | 'szl'
    | 'szy'
    | 'ta'
    | 'tay'
    | 'tcy'
    | 'te'
    | 'tet'
    | 'tg'
    | 'th'
    | 'ti'
    | 'tk'
    | 'tl'
    | 'tn'
    | 'to'
    | 'tpi'
    | 'tr'
    | 'trv'
    | 'ts'
    | 'tt'
    | 'tum'
    | 'tw'
    | 'ty'
    | 'tyv'
    | 'udm'
    | 'ug'
    | 'uk'
    | 'ur'
    | 'uz'
    | 've'
    | 'vec'
    | 'vep'
    | 'vi'
    | 'vls'
    | 'vo'
    | 'wa'
    | 'war'
    | 'wo'
    | 'wuu'
    | 'xal'
    | 'xh'
    | 'xmf'
    | 'yi'
    | 'yo'
    | 'yue'
    | 'za'
    | 'zea'
    | 'zh'
    | 'zh-classical'
    | 'zh-min-nan'
    | 'zh-yue'
    | 'zu';
