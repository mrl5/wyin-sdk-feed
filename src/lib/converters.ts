import romans from 'romans';
import { Time, Year, Century, timePattern } from '../types';
import { WyinFeedError, FutureYearError, BeforeCommonEraError } from '../errors';

export function convertTimeToYear(time: Time): Year {
    throwOnInvalidTime(time);
    const year = Number(time.replace(':', ''));
    return year;
}

export function convertYearToCentury(year: Year): Century {
    throwOnInvalidYear(year);
    const century = Math.ceil(year / 100);
    return romans.romanize(century);
}

function throwOnInvalidTime(time: Time): void {
    const timeRegex = new RegExp(timePattern);
    if (!timeRegex.test(time)) {
        throw new WyinFeedError('given time does not match hh:mm format');
    }
}

function throwOnInvalidYear(year: Year): void {
    if (!Number.isInteger(year)) {
        throw new WyinFeedError('given year is not an integer');
    }

    if (year > new Date(Date.now()).getFullYear()) {
        throw new FutureYearError('given year is from future');
    }

    if (year === 0) {
        throw new BeforeCommonEraError('given year is from before common era');
    }

    if (year < 0) {
        throw new WyinFeedError('invalid year');
    }
}
