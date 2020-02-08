import { deepStrictEqual } from 'assert';
import { highPriorityCount, highPriorityCount_refactored, Priority } from './order';

const orders = [{ priority: 'low' }, { priority: 'high' }, { priority: 'high' }];
const orders_refactored = [
  { priority: new Priority('low') },
  { priority: new Priority('high') },
  { priority: new Priority('high') },
];

const result = highPriorityCount(orders);

const result_refactored = highPriorityCount_refactored(orders_refactored);

deepStrictEqual(result, result_refactored);
