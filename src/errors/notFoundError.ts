import { WyinFeedError } from './baseError';
import { NotFoundCodeEnum } from '../types';

export class NotFoundError extends WyinFeedError {
    public constructor(public code: NotFoundCodeEnum, message?: string) {
        super(message);
    }
}
