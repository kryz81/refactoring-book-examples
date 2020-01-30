export default function statement(invoice: any, plays: any) {
  let totalAmount = 0;
  let volumeCredits = 0;
  let result = `Invoice for ${invoice.customer}\n`;

  const format = new Intl.NumberFormat('de-DE', {
    style: 'currency',
    currency: 'EUR',
    minimumFractionDigits: 2,
  }).format;

  for (let perf of invoice.performances) {
    const play = plays[perf.playID];
    let thisAmount = 0;
    switch (play.type) {
      case 'tragedy':
        thisAmount = 40000;
        if (perf.audience > 30) {
          thisAmount += 1000 * (perf.audience - 30);
        }
        break;
      case 'comedy':
        thisAmount = 30000;
        if (perf.audience > 20) {
          thisAmount += 10000 + 500 * (perf.audience - 20);
        }
        thisAmount += 300 * perf.audience;
        break;
      default:
        throw new Error(`Unknown type: ${play.type}`);
    }

    volumeCredits += Math.max(perf.audience - 30, 0);

    if ('comedy' === play.type) volumeCredits += Math.floor(perf.audience / 5);

    result += ` ${play.name}: ${format(thisAmount / 100)} (Audience: ${perf.audience})\n`;

    totalAmount += thisAmount;
  }

  result += `Total amount: ${format(totalAmount / 100)}\n`;
  result += `Volume Credits: ${volumeCredits}\n`;

  return result;
}
