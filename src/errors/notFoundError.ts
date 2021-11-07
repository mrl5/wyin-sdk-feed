import { WyinFeedError } from './baseError';
import { NotFoundCodeEnum, Year } from '../types';

export abstract class NotFoundError extends WyinFeedError {
    public year?: Year;

    public constructor(readonly code: NotFoundCodeEnum, message?: string) {
        super(message);
    }
}
