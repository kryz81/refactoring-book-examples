export interface Play {
  name: string;
  type: string;
}

export interface Performance {
  playID: string;
  audience: number;
}

export type EnrichedPerformance = Performance & { play: Play; amount: number; volumeCredits: number };

export interface Invoice {
  customer: string;
  performances: Performance[];
}

export interface Plays {
  [key: string]: Play;
}

export interface Data {
  customer: string;
  performances: EnrichedPerformance[];
  totalAmount: number;
  totalVolumeCredits: number;
}
