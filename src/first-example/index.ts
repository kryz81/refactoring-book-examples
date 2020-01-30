import * as invoice from './invoices.json';
import * as plays from './plays.json';

import { deepStrictEqual } from 'assert';

import statement from './statement_before_refactoring';
import { textStatement, htmlStatement } from './statement_refactored';

const result = statement(invoice, plays);
const resultRefactored = textStatement(invoice, plays);

deepStrictEqual(result, resultRefactored);

console.log(htmlStatement(invoice, plays));
