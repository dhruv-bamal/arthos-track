import { useState, useEffect } from "react";
import { categorize, detectRecurring } from "./lib/logic";
import type { Transaction, Category, RecurringSubscription } from "./types";
import Header from "./components/Header";
import BudgetBar from "./components/BudgetBar";
import Summary from "./components/Summary";
import RecurringSection from "./components/RecurringSection";
import AddExpenseForm from "./components/AddExpenseForm";
import ExpenseList from "./components/ExpenseList";
import initialData from "./lib/data";

type FilterCategory = Category | "All";

const STORAGE_KEY = "money-tracker-transactions";

function App() {
  const [transactions, setTransactions] = useState<Transaction[]>(() => {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw !== null) {
      try {
        return JSON.parse(raw) as Transaction[];
      } catch {
        return initialData;
      }
    }
    return initialData;
  });

  const [activeCategory, setActiveCategory] = useState<FilterCategory>("All");

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(transactions));
  }, [transactions]);

  function addExpense(transaction: Transaction): void {
    setTransactions([...transactions, transaction]);
  }

  function deleteExpense(id: string): void {
    setTransactions(transactions.filter((t) => t.id !== id));
  }

  const filteredTransactions =
    activeCategory === "All"
      ? transactions
      : transactions.filter((tx) => categorize(tx) === activeCategory);

  const recurring: RecurringSubscription[] = detectRecurring(transactions);

  const recurringMerchants = new Set<string>(recurring.map((r) => r.merchant));

  const filterButtons: FilterCategory[] = [
    "All",
    "Food",
    "Transport",
    "Subscriptions",
  ];

  return (
    <div>
      <Header />
      <BudgetBar transactions={transactions} />
      <Summary transactions={transactions} />
      <RecurringSection subscriptions={recurring} />
      <div>
        {filterButtons.map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            style={{
              fontWeight: activeCategory === cat ? "bold" : "normal",
              textDecoration: activeCategory === cat ? "underline" : "none",
            }}
          >
            {cat}
          </button>
        ))}
      </div>
      <AddExpenseForm onAdd={addExpense} />
      <ExpenseList
        transactions={filteredTransactions}
        onDelete={deleteExpense}
        recurringMerchants={recurringMerchants}
      />
    </div>
  );
}

export default App;
