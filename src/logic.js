import transactions from "./data.js";

// Map merchants/keywords to categories
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

export { categorize, totalByCategory };
