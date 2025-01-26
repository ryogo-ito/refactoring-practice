export interface Play {
  name: string;
  type: string;
}

export interface Plays {
  hamlet: Play;
  asLike: Play;
  othello: Play;
}

interface Performance {
  playID: string;
  audience: number;
}

export interface Invoice {
  customer: string;
  performances: Performance[];
}
