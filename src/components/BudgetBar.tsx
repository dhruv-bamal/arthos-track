import { useState, useEffect } from "react";
import type { Transaction } from "../types";
import { Budget } from "../lib/Budget";
import styles from "../styles/BudgetBar.module.css";

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
    <div className={styles.card}>
      <h2 className={styles.title}>Monthly Budget</h2>
      <div className={styles.limitRow}>
        <label htmlFor="budget-limit" className={styles.limitLabel}>
          Set Limit (₹)
        </label>
        <input
          id="budget-limit"
          type="number"
          value={limit}
          min="0"
          className={styles.limitInput}
          onChange={(e) => {
            const val = Number(e.target.value);
            setLimit(val);
          }}
        />
      </div>

      <div className={styles.statsRow}>
        <span className={styles.spent}>
          Spent: ₹{spent.toLocaleString("en-IN")}
        </span>
        <span className={isOver ? styles.over : styles.remaining}>
          {isOver
            ? `Over by ₹${budget.overspendBy().toLocaleString("en-IN")}`
            : `Remaining: ₹${remaining.toLocaleString("en-IN")}`}
        </span>
      </div>

      <div className={styles.barTrack}>
        <div
          className={styles.barFill}
          style={{
            width: `${cappedWidth}%`,
            backgroundColor: barColor,
          }}
        ></div>

        <p className={styles.barCaption}>
          {Math.round(percentUsed)}% used
          {isOver && " - over budget!"}
        </p>
      </div>
    </div>
  );
}

export default BudgetBar;
