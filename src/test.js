import transactions from "./data.js";
import { categorize, totalByCategory } from "./logic.js";

console.log("transactions loaded");
console.log(transactions);

console.log("\nFirst transaction:");
console.log(transactions[0]);

console.log("\nNumber of transactions:", transactions.length);

// Test a few transactions
console.log("\nTesting categorize():");
console.log(transactions[0].merchant, "->", categorize(transactions[0])); // Swiggy -> Food
console.log(transactions[2].merchant, "->", categorize(transactions[2])); // Netflix -> Subscriptions
console.log(transactions[3].merchant, "->", categorize(transactions[3])); // Uber -> Transport
console.log(transactions[4].merchant, "->", categorize(transactions[4])); // Amazon -> Shopping
console.log(transactions[9].merchant, "->", categorize(transactions[9])); // Electricity Bill -> Bills

console.log("\nTesting totalByCategory():");
const totals = totalByCategory(transactions);
console.log(totals);
