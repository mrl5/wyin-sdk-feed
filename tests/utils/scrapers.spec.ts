import * as chai from 'chai';
import chaiAsPromised = require('chai-as-promised');
import { NoContentError } from '../../src/errors';
import { getYearEventFromCenturyPage, getRandomEventFromYearPage } from '../../src/utils/scrapers';
import { Year, Html, ScrappedData } from '../../src/types';
import { getHtmlMock } from '../testUtils';

chai.use(chaiAsPromised);
const { assert } = chai;

type YearEventTestCase = [[Year, Html], ScrappedData | undefined];

const firstCentury: Html = getHtmlMock('wikipedia_pl_1_century');
const tenthCentury: Html = getHtmlMock('wikipedia_pl_10_century');
const regexHellOne: Html = getHtmlMock('wikipedia_pl_13_century');
const regexHellTwo: Html = getHtmlMock('wikipedia_pl_14_century');
const ambiguous: Html = getHtmlMock('wikipedia_pl_20_century');

type RandomEventTestCase = [Year, Html];
const year13: Html = getHtmlMock('wikipedia_pl_13_year');
const year512: Html = getHtmlMock('wikipedia_pl_512_year');
const year912: Html = getHtmlMock('wikipedia_pl_912_year');

describe('scrapers.ts', function () {
    describe('getYearEventFromCenturyPage()', function () {
        const yearEvents: Array<YearEventTestCase> = [
            [
                [1, firstCentury],
                {
                    event: '1 – początek naszej ery',
                    category: 'Wydarzenia w Europie',
                },
            ],
            [
                [908, tenthCentury],
                {
                    event: '908 - w Bagdadzie odnotowano opady śniegu',
                    category: 'Ważne wydarzenia',
                },
            ],
            [
                [909, tenthCentury],
                {
                    event: '909/910 - powstało opactwo św. Piotra i Pawła w Cluny we Francji',
                    category: 'Ważne wydarzenia',
                },
            ],
            [
                [910, tenthCentury],
                {
                    event: '910 - książę Wilhelm Akwitański założył benedyktyńskie opactwo w Cluny',
                    category: 'Ważne wydarzenia',
                },
            ],
            [
                [911, tenthCentury],
                {
                    event: 'w Niemczech wygasła dynastia Karolingów, królem niemieckim został Konrad Frankoński',
                    category: 'Ważne wydarzenia',
                },
            ],
            [[912, tenthCentury], undefined],
            [
                [1206, regexHellOne],
                {
                    event: '1206 – Temudżyn (Czyngis-chan) zjednoczył Mongołów i rozpoczął podboje (pd. Syberia w 1207, pn. Chiny w 1211, wsch. Iran w 1218)',
                    category: 'Wydarzenia historyczne',
                },
            ],
            [
                [1207, regexHellOne],
                {
                    event: '1207 – doszło do wielkiego pożaru Magdeburga w wyniku którego m.in. spłonęła doszczętnie miejscowa katedra (20 kwietnia)',
                    category: 'Wydarzenia historyczne',
                },
            ],
            [
                [1211, regexHellOne],
                {
                    event: '1211 – Alfons II został królem Portugalii (26 marca)',
                    category: 'Wydarzenia historyczne',
                },
            ],
            [
                [1218, regexHellOne],
                {
                    event: '1218 – św. Piotr Nolasco założył w Barcelonie Zakon Najświętszej Maryi Panny Miłosierdzia dla Odkupienia Niewolników (10 sierpnia)',
                    category: 'Wydarzenia historyczne',
                },
            ],
            [
                [1301, regexHellTwo],
                {
                    event: '1301 - papież Bonifacy VIII wydał bullę Ausculta fili carissime, w której zagroził ekskomuniką królowi Francji Filipowi IV, w związku z nałożeniem przez niego podatku na duchownych i przejęcie sądów nad nimi (5 grudnia)',
                    category: 'Wydarzenia historyczne',
                },
            ],
            [
                [1942, ambiguous],
                {
                    event: 'bitwa pod Stalingradem (1942–1943)',
                    category: 'Wydarzenia historyczne',
                },
            ],
            [
                [1943, ambiguous],
                {
                    event: 'Lech Wałęsa (ur. 1943) – prezydent RP',
                    category: 'Ważne postacie XX wieku',
                },
            ],
        ];
        // eslint-disable-next-line mocha/no-setup-in-describe
        yearEvents.forEach((testCase) => {
            it(`should return scrapped data: case for year ${testCase[0][0]}`, function () {
                const [[year, html], expected] = testCase;
                const result = getYearEventFromCenturyPage(year, html);
                assert.deepEqual(result, expected);
            });
        });
    });

    describe('getRandomEventFromYearPage()', function () {
        const yearPages: Array<RandomEventTestCase> = [
            [13, year13],
            [512, year512],
            [912, year912],
        ];
        // eslint-disable-next-line mocha/no-setup-in-describe
        yearPages.forEach((testCase) => {
            it(`should return random scrapped data randomly: case for year ${testCase[0]}`, function () {
                const [, html] = testCase;
                const results = [...Array(100).keys()].map(() => getRandomEventFromYearPage(html));
                assert.strictEqual(
                    results.every((r) => r?.event === results[0]?.event),
                    false,
                );
                assert.strictEqual(
                    results.some((r) => r?.event === 'Brak danych.'),
                    false,
                );
            });
        });
        it('should throw error on no content', function () {
            const noContent: Html = getHtmlMock('wikipedia_pl_57_year');
            const fn = () => getRandomEventFromYearPage(noContent);
            assert.throws(fn, NoContentError, 'no content for given year');
        });
    });
});
