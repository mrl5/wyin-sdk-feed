import path = require('path');
import * as chai from 'chai';
import chaiAsPromised = require('chai-as-promised');
import * as sinon from 'sinon';
import { Polly, setupMocha as setupPolly } from '@pollyjs/core';
import FSPersister from '@pollyjs/persister-fs';
import NodeHttpAdapter from '@pollyjs/adapter-node-http';
import { getEventByYear } from '../src/index';
import { Year, Language } from '../src/types';
import { NotFoundCodeEnum } from '../src/contracts/notFound';

chai.use(chaiAsPromised);
const { assert, expect } = chai;
const sandbox = sinon.createSandbox();

Polly.register(NodeHttpAdapter);
Polly.register(FSPersister);

type NotFoundTestCase = [Year, Language, NotFoundCodeEnum];

describe('index.ts', function () {
    /* eslint-disable mocha/no-setup-in-describe */
    setupPolly({
        adapters: ['node-http'],
        persister: 'fs',
        persisterOptions: {
            fs: {
                recordingsDir: path.resolve(__dirname, './mocks/recordings'),
            },
        },
    });
    /* eslint-enable mocha/no-setup-in-describe */

    describe('getEventByYear()', function () {
        it('should return history event from century page', async function () {
            const lang = 'pl';
            const year = 908;
            const result = await getEventByYear(year, lang);
            const expectedData = '908 - w Bagdadzie odnotowano opady śniegu';
            const expectedCategory = 'Ważne wydarzenia';
            const expectedSource = 'https://pl.wikipedia.org/wiki/X%20wiek';

            assert.strictEqual(result.year, year);
            expect(result.data).to.equal(expectedData);
            expect(result.category).to.equal(expectedCategory);
            expect(result.source).to.equal(expectedSource);
        });

        it('should return history event from year page as a fallback', async function () {
            const lang = 'pl';
            const year = 912;
            const result = await getEventByYear(year, lang);
            const expectedSource = 'https://pl.wikipedia.org/wiki/912';

            assert.strictEqual(result.year, year);
            expect(result.data).to.be.a('string').and.length.above(0);
            expect(result.source).to.equal(expectedSource);
        });

        const testCases: Array<NotFoundTestCase> = [
            [57, 'pl', 'NF003'],
            [0, 'pl', 'NF002'],
            [2022, 'pl', 'NF001'],
        ];
        // eslint-disable-next-line mocha/no-setup-in-describe
        testCases.forEach((testCase) => {
            it('should return not found object with proper code', async function () {
                sandbox.replace(Date, 'now', sinon.fake.returns(Date.parse('2021')));
                const [year, lang, expectedCode] = testCase;
                const result = await getEventByYear(year, lang);

                assert.strictEqual(result.year, year);
                assert.strictEqual(result.code, expectedCode);
                sandbox.restore();
            });
        });
    });
});
