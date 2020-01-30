import { Invoice, Performance, Play, Plays, EnrichedPerformance, Data } from './types';

export default function createStatementData(invoice: Invoice, plays: Plays) {
  function playFor(performance: Performance): Play {
    return plays[performance.playID];
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

  class PerformanceCalculator {
    performance: Performance;
    play: Play;

    constructor(performance: Performance, play: Play) {
      this.performance = performance;
      this.play = play;
    }

    getAmount() {
      throw new Error('Use subclass');
    }

    getVolumeCredits(): number {
      return Math.max(this.performance.audience - 30, 0);
    }
  }

  class TragedyCalculator extends PerformanceCalculator {
    getAmount() {
      let result = 40000;
      if (this.performance.audience > 30) {
        result += 1000 * (this.performance.audience - 30);
      }

      return result;
    }
  }

  class ComedyCalculator extends PerformanceCalculator {
    getAmount(): number {
      let result = 30000;
      if (this.performance.audience > 20) {
        result += 10000 + 500 * (this.performance.audience - 20);
      }
      result += 300 * this.performance.audience;

      return result;
    }

    getVolumeCredits(): number {
      return super.getVolumeCredits() + Math.floor(this.performance.audience / 5);
    }
  }

  function createPerformanceCalculator(performance: Performance, play: Play) {
    switch (play.type) {
      case 'tragedy':
        return new TragedyCalculator(performance, play);
      case 'comedy':
        return new ComedyCalculator(performance, play);
      default:
        throw new Error(`Unknown type: ${play.type}`);
    }
  }

  function enrichPerformance(performance: Performance): EnrichedPerformance {
    const calculator = createPerformanceCalculator(performance, playFor(performance));

    new PerformanceCalculator(performance, playFor(performance));

    return {
      ...performance,
      play: calculator.play,
      amount: calculator.getAmount(),
      volumeCredits: calculator.getVolumeCredits(),
    };
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
