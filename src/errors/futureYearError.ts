import { NotFoundError } from './notFoundError';
import { NotFoundCodeEnum } from '../types';

export class FutureYearError extends NotFoundError {
    static readonly code: NotFoundCodeEnum = 'NF001';

    public constructor(message?: string) {
        super(FutureYearError.code, message);
    }
}
