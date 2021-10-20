import path = require('path');
import * as chai from 'chai';
import chaiAsPromised = require('chai-as-promised');
import { Polly, setupMocha as setupPolly } from '@pollyjs/core';
import FSPersister from '@pollyjs/persister-fs';
import NodeHttpAdapter from '@pollyjs/adapter-node-http';
import { query } from '../../src/lib/wikipediaApiService';
import { WikipediaApiQuery } from '../../src/lib/wikipediaApi';
import { Language } from '../../src/types';

chai.use(chaiAsPromised);
const { expect } = chai;

type Title = string;
type QueryTestCase = [Language, Title];

Polly.register(NodeHttpAdapter);
Polly.register(FSPersister);

describe('wikipediaApiService', function () {
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

    describe('query()', function () {
        const queries: Array<QueryTestCase> = [
            ['en', '1st century'],
            ['pl', 'I wiek'],
            ['en', 'AD 13'],
            ['pl', '13'],
        ];
        // eslint-disable-next-line mocha/no-setup-in-describe
        queries.forEach((testCase) => {
            it(`should respond with 200 and have expected structure: case for ${testCase}`, async function () {
                const [lang, title] = testCase;
                const response = await query(title, lang);
                const data = response.data as WikipediaApiQuery;

                expect(response.status).to.equal(200);

                const [pageId] = Object.keys(data.query.pages);
                const page = data.query.pages[pageId];
                expect(page).to.have.property('title', title);
                expect(page.extract).to.be.a('string').and.length.above(0);
            });
        });
    });
});
