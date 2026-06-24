import type {
  Category,
  Transaction,
  CategoryTotals,
  RecurringSubscription,
} from "./type.js";

const categoryKeywords = {
  Food: [
    "swiggy",
    "zomato",
    "mcdonalds",
    "kfc",
    "subway",
    "dominos",
    "grubhub",
  ],
  Transport: ["uber", "ola", "lyft", "taxi", "metro", "bus", "train"],
  Subscriptions: [
    "netflix",
    "spotify",
    "hotstar",
    "disney",
    "prime",
    "apple tv",
  ],
  Shopping: ["amazon", "flipkart", "myntra", "ajio", "nykaa", "uniqlo"],
  Bills: [
    "electricity",
    "water",
    "gas",
    "recharge",
    "bill",
    "internet",
    "phone",
  ],
  Others: [],
} as const;

export function categorize(transaction: Transaction): Category {
  const merchant = transaction.merchant.toLowerCase();

  const category = Object.keys(categoryKeywords).find((cat) => {
    return (
      categoryKeywords[
        cat as keyof typeof categoryKeywords
      ] as readonly string[]
    ).some((keyword) => merchant.includes(keyword));
  });

  return (category as Category) || "Other";
}

export function totalByCategory(transactions: Transaction[]): CategoryTotals {
  const totals: CategoryTotals = {
    Food: 0,
    Transport: 0,
    Subscriptions: 0,
    Shopping: 0,
    Bills: 0,
    Other: 0,
  };

  for (const transaction of transactions) {
    const category = categorize(transaction);
    console.log(
      transaction.merchant,
      "->",
      category,
      "amount:",
      transaction.amount,
    );
    totals[category] += transaction.amount;
  }

  return totals;
}

export function detectRecurring(
  transactions: Transaction[],
): RecurringSubscription[] {
  const grouped = transactions.reduce(
    (acc: Record<string, Transaction[]>, tx) => {
      const merchant = tx.merchant;
      if (!acc[merchant]) acc[merchant] = [];
      acc[merchant].push(tx);
      return acc;
    },
    {},
  );

  return Object.entries(grouped)
    .filter(([merchant, group]) => {
      if (group.length < 2) return false;

      const amounts = group.map((t) => t.amount);
      const minAmount = Math.min(...amounts);
      const maxAmount = Math.max(...amounts);
      const percentDiff = (maxAmount - minAmount) / minAmount;

      return percentDiff <= 0.1;
    })
    .map(([merchant, group]) => ({
      merchant: merchant,
      amount: group[0].amount,
      count: group.length,
    }));
}
