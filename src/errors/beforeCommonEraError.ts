import { NotFoundError } from './notFoundError';
import { NotFoundCodeEnum } from '../types';

export class BeforeCommonEraError extends NotFoundError {
    static readonly code: NotFoundCodeEnum = 'NF002';

    public constructor(message?: string) {
        super(BeforeCommonEraError.code, message);
    }
}
