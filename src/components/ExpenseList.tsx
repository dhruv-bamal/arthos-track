import type { Transaction } from "../types";
import ExpenseItem from "./ExpenseItem";
import styles from "../styles/ExpenseList.module.css";

interface ExpenseListProps {
  transactions: Transaction[];
  onDelete: (id: string) => void;
  recurringMerchants: Set<string>;
}

function ExpenseList({
  transactions,
  onDelete,
  recurringMerchants,
}: ExpenseListProps) {
  if (transactions.length === 0) {
    return (
      <div className={styles.empty}>
        <p className={styles.emptyText}>No expenses yet - add your first one.</p>
      </div>
    );
  }

  return (
    <div className={styles.list}>
      {transactions.map((tx) => (
        <ExpenseItem
          key={tx.id}
          transaction={tx}
          onDelete={onDelete}
          isRecurring={recurringMerchants.has(tx.merchant)}
        />
      ))}
    </div>
  );
}

export default ExpenseList;
