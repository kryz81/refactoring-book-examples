import { deepStrictEqual } from 'assert';
import {rating, rating_refactored} from "./get_rating";

const driver = {
  numberOfLateDeliveries: 10
};

const result = rating(driver);

const result_refactored = rating_refactored(driver);

deepStrictEqual(result, result_refactored);
