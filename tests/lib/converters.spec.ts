import * as chai from 'chai';
import chaiAsPromised = require('chai-as-promised');
import * as sinon from 'sinon';
import { Year, Century } from '../../src/types';
import { convertTimeToYear, convertYearToCentury } from '../../src/lib/converters';
import { WyinFeedError, FutureYearError, BeforeCommonEraError } from '../../src/errors';

chai.use(chaiAsPromised);
const { assert } = chai;
const sandbox = sinon.createSandbox();

type TimeToYearTestCase = [string, Year];
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

        const futureYearTestCases: Array<string> = ['20:21', '20:22', '21:00'];
        // eslint-disable-next-line mocha/no-setup-in-describe
        futureYearTestCases.forEach((time) => {
            it(`should throw on future year: case for time ${time}`, function () {
                sandbox.replace(Date, 'now', sinon.fake.returns(Date.parse('2020')));
                const fn = () => convertTimeToYear(time);
                assert.throws(fn, FutureYearError);
                sandbox.restore();
            });
        });

        it('should throw on 00:00', function () {
            const fn = () => convertTimeToYear('00:00');
            assert.throws(fn, BeforeCommonEraError);
        });
    });

    describe('convertYearToCentury()', function () {
        const yearToCenturyTestCase: Array<YearToCenturyTestCase> = [
            [1000, 'X'],
            [999, 'X'],
            [1001, 'XI'],
            [813, 'IX'],
            [1, 'I'],
        ];
        // eslint-disable-next-line mocha/no-setup-in-describe
        yearToCenturyTestCase.forEach((testCase) => {
            it(`should convert year into century: case for year ${testCase[0]}`, function () {
                const [year, expected] = testCase;
                const result = convertYearToCentury(year);
                assert.strictEqual(result, expected);
            });
        });

        it('should throw on year 0', function () {
            const fn = () => convertYearToCentury(0);
            assert.throws(fn, BeforeCommonEraError);
        });

        it('should throw on invalid year', function () {
            const fn = () => convertYearToCentury(-1);
            assert.throws(fn, WyinFeedError);
        });
    });
});
