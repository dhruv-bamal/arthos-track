import type { Transaction } from "../type.js";

// A transaction represents one expense or income entry.
// Shape:
// {
//   id: unique identifier (string or number)
//   amount: money spent (number, in rupees)
//   merchant: where it was spent (string)
//   date: when it happened (string, ISO format: YYYY-MM-DD)
// }

const transactions: Transaction[] = [
  {
    id: 1,
    amount: 450,
    merchant: "Swiggy",
    date: "2026-06-01",
  },
  {
    id: 2,
    amount: 650,
    merchant: "Zomato",
    date: "2026-06-02",
  },
  {
    id: 3,
    amount: 199,
    merchant: "Netflix",
    date: "2026-06-03",
  },
  {
    id: 4,
    amount: 250,
    merchant: "Uber",
    date: "2026-06-04",
  },
  {
    id: 5,
    amount: 1200,
    merchant: "Amazon",
    date: "2026-06-05",
  },
  {
    id: 6,
    amount: 199,
    merchant: "Netflix",
    date: "2026-07-03",
  },
  {
    id: 7,
    amount: 650,
    merchant: "Swiggy",
    date: "2026-06-10",
  },
  {
    id: 8,
    amount: 99,
    merchant: "Spotify",
    date: "2026-06-05",
  },
  {
    id: 9,
    amount: 99,
    merchant: "Spotify",
    date: "2026-07-05",
  },
  {
    id: 10,
    amount: 500,
    merchant: "Electricity Bill",
    date: "2026-06-08",
  },
];

export default transactions;
