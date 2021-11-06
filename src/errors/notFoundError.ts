import { WyinFeedError } from './baseError';
import { NotFoundCodeEnum, Year } from '../types';

export class NotFoundError extends WyinFeedError {
    public year?: Year;

    public constructor(public code: NotFoundCodeEnum, message?: string) {
        super(message);
    }
}
