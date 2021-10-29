import { NotFoundError } from './notFoundError';

export class BeforeCommonEraError extends NotFoundError {
    public constructor(message?: string) {
        super('NF002', message);
    }
}
