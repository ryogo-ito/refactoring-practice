import { Invoice, Play, Plays } from "./types";

const playsData: Plays = {
  hamlet: { name: "Hamlet", type: "tragedy" },
  asLike: { name: "As You Like it", type: "comedy" },
  othello: { name: "Othello", type: "tragedy" },
};

const invoicesData: Invoice[] = [
  {
    customer: "Big Brother",
    performances: [
      { playID: "hamlet", audience: 55 },
      { playID: "asLike", audience: 35 },
      { playID: "othello", audience: 40 },
    ],
  },
];

function statement(invoice: Invoice, plays: Plays) {
  let totalAmount = 0;
  let volumeCredits = 0;
  let result = `Statement for ${invoice.customer}\n`;

  const format = new Intl.NumberFormat("es-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 2,
  }).format;

  for (let perf of invoice.performances) {
    const play = plays[perf.playID];
    let thisAmount = 40000;

    switch (play.type) {
      case "tragedy":
        thisAmount = 40000;
        if (perf.audience > 30) {
          thisAmount += (perf.audience - 30) * 1000;
        }
        break;
      case "comedy":
        thisAmount = 30000;
        if (perf.audience > 20) {
          thisAmount += 10000 + 500 * (perf.audience - 20);
        }
        thisAmount += 300 * perf.audience;
        break;
      default:
        throw new Error(`Unknown play type: ${play.type}`);
    }

    // ボリューム特典のポイントを加算
    volumeCredits += Math.max(perf.audience - 30, 0);
    // コメディの時は10人につき、さらにポイントを加算
    if ("comedy" === play.type) volumeCredits += Math.floor(perf.audience / 5);

    // 注文の内訳を出力
    result += `  ${play.name}: ${format(thisAmount / 100)} (${perf.audience} seats)\n`;
    totalAmount += thisAmount;
  }
  result += `Amount owed is ${format(totalAmount / 100)}\n`;
  result += `You earned ${volumeCredits} credits\n`;
  return result;
}

console.log(statement(invoicesData[0], playsData));
