import { deepStrictEqual } from 'assert';
import { acquireData, acquireData_refactored } from './acquireData';

const fileContent = `office, country, telephone
Chicago, USA, +1 312 373 1000
Beijing, China, +86 4008 900 505
Bangalore, India, +91 80 4064 9570
Porto Alegre, Brazil, +55 51 3079 3550
Chennai, India, +91 44 660 44766`;

const result = acquireData(fileContent);

const result_refactored = acquireData_refactored(fileContent);

deepStrictEqual(result, result_refactored);
