import * as chai from 'chai';
import chaiAsPromised = require('chai-as-promised');
import * as sinon from 'sinon';
import { Time, Year, Century } from '../../src/types';
import { convertTimeToYear, convertYearToCentury } from '../../src/lib/converters';
import { WyinFeedError, FutureYearError, BeforeCommonEraError } from '../../src/errors';

chai.use(chaiAsPromised);
const { assert } = chai;
const sandbox = sinon.createSandbox();

type TimeToYearTestCase = [Time, Year];
type YearToCenturyTestCase = [Year, Century];

describe('converters.ts', function () {
    describe('convertTimeToYear()', function () {
        const timeToYearTestCases: Array<TimeToYearTestCase> = [
            ['10:00', 1000],
            ['8:13', 813],
            ['00:01', 1],
        ];
        // eslint-disable-next-line mocha/no-setup-in-describe
        timeToYearTestCases.forEach((testCase) => {
            it(`should convert time to year: case for time ${testCase[0]}`, function () {
                const [time, expected] = testCase;
                const result = convertTimeToYear(time);
                assert.strictEqual(result, expected);
            });
        });

        const invalidTimeTestCases: Array<string> = ['24:21', '20:60', '8:10PM', '-8:23'];
        // eslint-disable-next-line mocha/no-setup-in-describe
        invalidTimeTestCases.forEach((time) => {
            it(`should throw on invalid time: case for time ${time}`, function () {
                const fn = () => convertTimeToYear(time);
                assert.throws(fn, WyinFeedError);
            });
        });
    });

    describe('convertYearToCentury()', function () {
        const yearToCenturyTestCase: Array<YearToCenturyTestCase> = [
            [1000, 'X'],
            [999, 'X'],
            [1001, 'XI'],
            [813, 'IX'],
            [1, 'I'],
            [33, 'I'],
        ];
        // eslint-disable-next-line mocha/no-setup-in-describe
        yearToCenturyTestCase.forEach((testCase) => {
            it(`should convert year into century: case for year ${testCase[0]}`, function () {
                const [year, expected] = testCase;
                const result = convertYearToCentury(year);
                assert.strictEqual(result, expected);
            });
        });

        const futureYearTestCases: Array<Year> = [2021, 2022, 2100];
        // eslint-disable-next-line mocha/no-setup-in-describe
        futureYearTestCases.forEach((year) => {
            it(`should throw on future year: case for year ${year}`, function () {
                sandbox.replace(Date, 'now', sinon.fake.returns(Date.parse('2020')));
                const fn = () => convertYearToCentury(year);
                assert.throws(fn, FutureYearError);
                sandbox.restore();
            });
        });

        it('should throw on year 0', function () {
            const fn = () => convertYearToCentury(0);
            assert.throws(fn, BeforeCommonEraError);
        });

        const invalidYearTestCase: Array<Year> = [-1, 1.1];
        // eslint-disable-next-line mocha/no-setup-in-describe
        invalidYearTestCase.forEach((testCase) => {
            it('should throw on invalid year', function () {
                const fn = () => convertYearToCentury(testCase);
                assert.throws(fn, WyinFeedError);
            });
        });
    });
});
