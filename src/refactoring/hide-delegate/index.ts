import { deepStrictEqual } from 'assert';
import { Person, Person_Refactored, Department } from './manage';

const result = new Person('Tim', new Department('DE', 'Daniel'));
const result_refactored = new Person_Refactored('Tim', new Department('DE', 'Daniel'));

deepStrictEqual(result.getDepartment().getManager(), result_refactored.getManager());
