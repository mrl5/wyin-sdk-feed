import { readFileSync } from 'fs';
import { Html } from '../src/types';

export function getHtmlMock(fileName: string): Html {
    return readFileSync(`${__dirname}/mocks/${fileName}.html`, 'utf8');
}
