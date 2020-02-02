interface Order {
  amount: number;
}

interface Invoice {
  customer: string;
  orders: Order[];
  dueDate: Date;
}

class Clock {
  static today() {
    return new Date();
  }
}

// before refactoring
export function printOwing(invoice: Invoice) {
  let result = '';
  let outstanding = 0;
  result += `************************
* Invoice *
************************`;

  for (const o of invoice.orders) {
    outstanding += o.amount;
  }

  const today = Clock.today();
  invoice.dueDate = new Date(today.getFullYear(), today.getMonth(), today.getDate() + 30);

  result += `Customer Name: ${invoice.customer}
Amount: ${outstanding}
Due Date : ${invoice.dueDate.toLocaleDateString()}`;

  return result;
}

// after refactoring

function printHeader() {
  return `************************
* Invoice *
************************`;
}

function printDetails(invoice: Readonly<Invoice>, outstanding: number) {
  return `Customer Name: ${invoice.customer}
Amount: ${outstanding}
Due Date : ${invoice.dueDate.toLocaleDateString()}`;
}

function getDueDate(): Date {
  const today = Clock.today();
  return new Date(today.getFullYear(), today.getMonth(), today.getDate() + 30);
}

function calculateOutstanding(invoice: Invoice) {
  let outstanding = 0;
  for (const o of invoice.orders) {
    outstanding += o.amount;
  }
  return outstanding;
}

export function printOwing_refactored(invoice: Invoice) {
  let result = '';

  result += printHeader();

  invoice.dueDate = getDueDate();

  result += printDetails(invoice, calculateOutstanding(invoice));

  return result;
}
