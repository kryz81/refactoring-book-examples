import { deepStrictEqual } from 'assert';
import { temp, temp_refactored, TempRange } from './temp';

const station = {
  readings: [{ temp: 15 }, { temp: 20 }, { temp: 5 }, { temp: 11 }],
};

const operatingPlan = {
  min: 10,
  max: 20,
};

const result = temp(station, operatingPlan.min, operatingPlan.max);

const result_refactored = temp_refactored(station, new TempRange(operatingPlan.min, operatingPlan.max));

deepStrictEqual(result, result_refactored);
