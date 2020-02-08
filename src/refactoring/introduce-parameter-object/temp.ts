interface Reading {
  temp: number;
}

interface Station {
  readings: Reading[];
}

// before refactoring

export function temp(station: Station, min: number, max: number) {
  return station.readings.filter((r) => r.temp < min || r.temp > max);
}

// after refactoring

export class TempRange {
  min: number;
  max: number;

  constructor(min: number, max: number) {
    this.min = min;
    this.max = max;
  }
}

export function temp_refactored(station: Station, tempRange: TempRange) {
  return station.readings.filter((r) => r.temp < tempRange.min || r.temp > tempRange.max);
}
