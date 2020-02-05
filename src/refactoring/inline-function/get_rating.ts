interface Driver {
  numberOfLateDeliveries: number;
}

// before refactoring

function moreThanFiveLateDeliveries(driver: Driver) {
  return driver.numberOfLateDeliveries > 5;
}

export function rating(driver: Driver) {
  return moreThanFiveLateDeliveries(driver) ? 2 : 1;
}

// after refactoring

export function rating_refactored(driver: Driver) {
  // remove immediate helper function
  return driver.numberOfLateDeliveries > 5 ? 2 : 1;
}
