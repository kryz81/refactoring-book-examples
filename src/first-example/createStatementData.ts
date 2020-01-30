import { Invoice, Performance, Play, Plays, EnrichedPerformance, Data } from './types';

export default function createStatementData(invoice: Invoice, plays: Plays) {
  function playFor(performance: Performance): Play {
    return plays[performance.playID];
  }

  function amountFor(play: Play, performance: Performance): number {
    let result = 0;

    switch (play.type) {
      case 'tragedy':
        result = 40000;
        if (performance.audience > 30) {
          result += 1000 * (performance.audience - 30);
        }
        break;
      case 'comedy':
        result = 30000;
        if (performance.audience > 20) {
          result += 10000 + 500 * (performance.audience - 20);
        }
        result += 300 * performance.audience;
        break;
      default:
        throw new Error(`Unknown type: ${play.type}`);
    }

    return result;
  }

  function volumeCreditsFor(performance: EnrichedPerformance): number {
    let result = 0;

    result += Math.max(performance.audience - 30, 0);

    if ('comedy' === performance.play.type) {
      result += Math.floor(performance.audience / 5);
    }

    return result;
  }

  function totalVolumeCredits(data: Data) {
    let result = 0;
    for (let performance of data.performances) {
      result += performance.volumeCredits;
    }

    return result;
  }

  function totalAmount(data: Data) {
    let result = 0;
    for (let performance of data.performances) {
      result += performance.amount;
    }

    return result;
  }

  function enrichPerformance(performance: Performance): EnrichedPerformance {
    const result = {
      ...performance,
      play: playFor(performance),
      amount: amountFor(playFor(performance), performance),
      volumeCredits: 0,
    };

    result.volumeCredits = volumeCreditsFor(result);

    return result;
  }

  const statementData = {
    customer: invoice.customer,
    performances: invoice.performances.map(enrichPerformance),
    totalAmount: 0,
    totalVolumeCredits: 0,
  };

  statementData.totalAmount = totalAmount(statementData);
  statementData.totalVolumeCredits = totalVolumeCredits(statementData);

  return statementData;
}
