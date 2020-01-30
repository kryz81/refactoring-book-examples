import { Invoice, Plays, Data } from './types';
import createStatementData from './createStatementData';

function euro(num: number) {
  return new Intl.NumberFormat('de-DE', {
    style: 'currency',
    currency: 'EUR',
    minimumFractionDigits: 2,
  }).format(num);
}

function renderPlainText(data: Data) {
  let result = `Invoice for ${data.customer}\n`;

  for (let performance of data.performances) {
    result += ` ${performance.play.name}: ${euro(performance.amount / 100)} (Audience: ${performance.audience})\n`;
  }

  result += `Total amount: ${euro(data.totalAmount / 100)}\n`;
  result += `Volume Credits: ${data.totalVolumeCredits}\n`;

  return result;
}

function renderHTML(data: Data) {
  let result = `<h1>Invoice for ${data.customer}</h1>\n`;
  result += '<table>\n';
  result += '<tr><th>Performance</th><th>Audience </th><th>Price</th></tr>';
  for (let perf of data.performances) {
    result += `<tr><td>${perf.play.name}</td><td>${perf.audience}</td>`;
    result += `<td>${euro(perf.amount)}</td></tr>\n`;
  }
  result += '</table>\n';
  result += `<p>Total amount: <em>${euro(data.totalAmount)}</em></p>\n`;
  result += `<p>Volume credits: <em>${data.totalVolumeCredits}</em> </p>\n`;

  return result;
}

export function textStatement(invoice: Invoice, plays: Plays): string {
  return renderPlainText(createStatementData(invoice, plays));
}

export function htmlStatement(invoice: Invoice, plays: Plays): string {
  return renderHTML(createStatementData(invoice, plays));
}
