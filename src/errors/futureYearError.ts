import { NotFoundError } from './notFoundError';

export class FutureYearError extends NotFoundError {
    public constructor(message?: string) {
        super('NF001', message);
    }
}
