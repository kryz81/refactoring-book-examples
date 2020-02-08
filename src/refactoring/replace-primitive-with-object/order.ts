interface OrderData {
  priority: string;
}

export class Order {
  priority: string;

  constructor(data: OrderData) {
    this.priority = data.priority;
  }
}

// before refactoring

export function highPriorityCount(orders: Order[]) {
  return orders.filter((o) => 'high' === o.priority || 'rush' === o.priority).length;
}

// after refactoring

interface OrderData_Refactored {
  priority: Priority;
}

export class Order_Refactored {
  priority: Priority;

  constructor(data: OrderData_Refactored) {
    this.priority = data.priority;
  }
}

export class Priority {
  value: string;

  static legalValues() {
    return ['low', 'normal', 'high', 'rush'];
  }

  constructor(value: string) {
    if (!Priority.legalValues().includes(value)) {
      throw new Error('Invalid priority value');
    }
    this.value = value;
  }

  private getIndex(value: string) {
    return Priority.legalValues().findIndex((val) => val === value);
  }

  higherThan(priority: Priority) {
    return this.getIndex(priority.value) < this.getIndex(this.value);
  }
}

export function highPriorityCount_refactored(orders: Order_Refactored[]) {
  return orders.filter((o) => o.priority.higherThan(new Priority('normal'))).length;
}
