import { deepStrictEqual } from 'assert';
import { price, price_refactored } from './price';

const order = {
  quantity: 5,
  itemPrice: 2.5,
};

const result = price(order);

const result_refactored = price_refactored(order);

deepStrictEqual(result, result_refactored);
