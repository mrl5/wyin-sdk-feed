import { NotFoundError } from './notFoundError';

export class NoContentError extends NotFoundError {
    public constructor(message?: string) {
        super('NF003', message);
    }
}
