import { useState, useEffect } from "react";
import type { Transaction } from "../types";
import { Budget } from "../lib/Budget";

interface BudgetBarProps {
  transactions: Transaction[];
}

function getBarColor(percent: number): string {
  if (percent >= 100) return "#ef4444";
  if (percent >= 80) return "#f59e0b";
  return "#22c55e";
}

function BudgetBar({ transactions }: BudgetBarProps) {
  const [limit, setLimit] = useState<number>(() => {
    const saved = localStorage.getItem("money-tracker-budget-limit");
    return saved !== null ? Number(saved) : 10000;
  });

  useEffect(() => {
    localStorage.setItem("money-tracker-budget-limit", String(limit));
  }, [limit]);

  const spent = transactions.reduce((sum, tx) => sum + tx.amount, 0);
  const budget = new Budget(limit, spent);

  const percentUsed = budget.percentUsed();
  const isOver = budget.isOverBudget();
  const remaining = budget.remaining();
  const barColor = getBarColor(percentUsed);
  const cappedWidth = Math.min(percentUsed, 100);

  return (
    <div>
      <h2>Monthly Budget</h2>
      <div>
        <label htmlFor="budget-limit">Set Limit (₹)</label>
        <input
          id="budget-limit"
          type="number"
          value={limit}
          min="0"
          onChange={(e) => {
            const val = Number(e.target.value);
            setLimit(val);
          }}
        />
      </div>

      <div>
        <span>Spent: ₹{spent.toLocaleString("en-IN")}</span>
        <span>
          {isOver
            ? `Over by ₹${budget.overspendBy().toLocaleString("en-IN")}`
            : `Remaining: ₹${remaining.toLocaleString("en-IN")}`}
        </span>
      </div>

      <div
        style={{
          width: "100%",
          height: "20px",
          backgroundColor: "#e5e7eb",
          borderRadius: "9999px",
          overflow: "hidden",
        }}
      >
        <div
          style={{
            width: `${cappedWidth}`,
            height: "100%",
            backgroundColor: barColor,
            borderRadius: "9999px",
            transition: "width 0.4s ease, background-color 0.4 ease",
          }}
        ></div>

        <p>
          {Math.round(percentUsed)}% used
          {isOver && " - over budget!"}
        </p>
      </div>
    </div>
  );
}

export default BudgetBar;
