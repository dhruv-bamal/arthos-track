import transactions from "./data.js";

// Merchants to categories
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
  Others: [], // Catch-all
};

function categorize(transaction) {
  const merchant = transaction.merchant.toLowerCase();

  for (const category in categoryKeywords) {
    const keywords = categoryKeywords[category];
    for (const keyword of keywords) {
      if (merchant.includes(keyword)) {
        return category;
      }
    }
  }

  return "Other";
}

function totalByCategory(transactions) {
  const totals = {
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

function detectRecurring(transactions) {
  const grouped = {};
  for (const transaction of transactions) {
    const merchant = transaction.merchant;
    if (!grouped[merchant]) {
      grouped[merchant] = [];
    }
    grouped[merchant].push(transaction);
  }

  console.log("Grouped Merchants:", Object.keys(grouped));

  const recurring = [];
  for (const merchant in grouped) {
    const group = grouped[merchant];
    console.log(`Checking ${merchant}: ${group.length} transactions`);

    if (group.length >= 2) {
      const amounts = group.map((t) => t.amount);
      const minAmount = Math.min(...amounts);
      const maxAmount = Math.max(...amounts);
      const percentDiff = (maxAmount - minAmount) / minAmount;

      console.log(
        `  Amounts: ${amounts}, Percent diff: ${(percentDiff * 100).toFixed(2)}%`,
      );

      if (percentDiff <= 0.1) {
        console.log(`  → FLAGGED as recurring`);
        recurring.push({
          merchant: merchant,
          amount: amounts[0],
          count: group.length,
        });
      } else {
        console.log(
          `  → NOT flagged (${(percentDiff * 100).toFixed(2)}% > 10%)`,
        );
      }
    }
  }

  return recurring;
}

export { categorize, totalByCategory, detectRecurring };
