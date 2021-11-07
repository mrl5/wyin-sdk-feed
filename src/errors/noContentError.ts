import { NotFoundError } from './notFoundError';
import { NotFoundCodeEnum } from '../types';

export class NoContentError extends NotFoundError {
    static readonly code: NotFoundCodeEnum = 'NF003';

    public constructor(message?: string) {
        super(NoContentError.code, message);
    }
}
