import path = require('path');
import * as chai from 'chai';
import chaiAsPromised = require('chai-as-promised');
import { Polly, setupMocha as setupPolly } from '@pollyjs/core';
import FSPersister from '@pollyjs/persister-fs';
import NodeHttpAdapter from '@pollyjs/adapter-node-http';
import { getWikipediaTitlesForCenturyAndYear, CenturyAndYearTitles } from '../../src/lib/wikidataApiService';
import { Language, Year } from '../../src/types';

chai.use(chaiAsPromised);
const { expect } = chai;

type YearAndCenturyTestCase = [Language, Year, CenturyAndYearTitles];

Polly.register(NodeHttpAdapter);
Polly.register(FSPersister);

describe('wikidataApiService', function () {
    /* eslint-disable mocha/no-setup-in-describe */
    setupPolly({
        adapters: ['node-http'],
        persister: 'fs',
        persisterOptions: {
            fs: {
                recordingsDir: path.resolve(__dirname, '../mocks/recordings'),
            },
        },
    });
    /* eslint-enable mocha/no-setup-in-describe */
    describe('getWikipediaTitlesForCenturyAndYear()', function () {
        const testCases: Array<YearAndCenturyTestCase> = [
            ['en', 13, ['1st century', 'AD 13']],
            ['pl', 13, ['I wiek', '13']],
            ['pl', 222, ['III wiek', '222']],
            ['pl', 912, ['X wiek', '912']],
            ['pl', 1901, ['XX wiek', '1901']],
            ['pl', 1908, ['XX wiek', '1908']],
            ['pl', 2021, ['XXI wiek', '2021']],
        ];
        // eslint-disable-next-line mocha/no-setup-in-describe
        testCases.forEach((testCase) => {
            it(`should return century and year: case for lang ${testCase[0]} and year ${testCase[1]}`, async function () {
                const [lang, year, [expectedCenturyTitle, expectedYearTitle]] = testCase;
                const [centuryTitle, yearTitle] = await getWikipediaTitlesForCenturyAndYear(year, lang);
                expect(centuryTitle).to.equal(expectedCenturyTitle);
                expect(yearTitle).to.equal(expectedYearTitle);
            });
        });
    });
});
