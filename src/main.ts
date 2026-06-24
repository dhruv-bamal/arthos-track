import transactions from "./data.js";
import { categorize, totalByCategory, detectRecurring } from "./logic.js";

console.log("=== Arthos Track - Logic layer ===");

console.log("\nAll transactions:");
console.log(transactions);

console.log("\n--- Categorized ---");
transactions.forEach((t) => {
  console.log(`${t.merchant} -> ${categorize(t)}`);
});

console.log("\n--- Totals by category ---");
console.log(totalByCategory(transactions));

console.log("\n--- Recurring transactions ---");
console.log(detectRecurring(transactions));
