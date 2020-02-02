import { deepStrictEqual } from 'assert';
import { printOwing, printOwing_refactored } from './print_owing';

const invoice = {
  customer: 'My Customer 1',
  dueDate: new Date(),
  orders: [{ amount: 50 }, { amount: 20 }],
};

const result = printOwing(invoice);

const result_refactored = printOwing_refactored(invoice);

deepStrictEqual(result, result_refactored);
