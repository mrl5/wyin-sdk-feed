import romans from 'romans';
import { Time, Year, Century } from '../types';
import { WyinFeedError, FutureYearError, BeforeCommonEraError } from '../errors';

export function convertTimeToYear(time: Time): Year {
    throwOnInvalidTime(time);
    const year = Number(time.replace(':', ''));
    throwOnInvalidYear(year);
    return year;
}

export function convertYearToCentury(year: Year): Century {
    throwOnInvalidYear(year);
    const century = Math.ceil(year / 100);
    return romans.romanize(century);
}

function throwOnInvalidTime(time: Time): void {
    const timePattern = new RegExp('^([0-1]?[0-9]|2[0-3]):([0-5][0-9])(:[0-5][0-9])?$');
    if (!timePattern.test(time)) {
        throw new WyinFeedError('given time does not match hh:mm format');
    }
}

function throwOnInvalidYear(year: Year): void {
    if (!Number.isInteger(year)) {
        throw new WyinFeedError('given year is not an integer');
    }

    if (Date.parse(String(year)) > Date.now()) {
        throw new FutureYearError('given year is from future');
    }

    if (year === 0) {
        throw new BeforeCommonEraError('given year is from before common era');
    }

    if (year < 0) {
        throw new WyinFeedError('invalid year');
    }
}
