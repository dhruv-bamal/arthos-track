import type { Transaction } from "../types";
import { categorize } from "../lib/logic";
import styles from "../styles/ExpenseItem.module.css";

interface ExpenseItemProps {
  transaction: Transaction;
  onDelete: (id: string) => void;
  isRecurring: boolean;
}

function ExpenseItem({ transaction, onDelete, isRecurring }: ExpenseItemProps) {
  const category = categorize(transaction);

  return (
    <div className={styles.item}>
      <span className={styles.merchant}>{transaction.merchant}</span>
      {isRecurring && <span className={styles.recurring}>🔁</span>}
      <span className={styles.amount}>{transaction.amount}</span>
      <span className={styles.date}>{transaction.date}</span>
      <span className={`${styles.category} badge-${category.toLowerCase()}`}>
        {category}
      </span>
      <button
        className={styles.delete}
        onClick={() => onDelete(transaction.id)}
      >
        Delete
      </button>
    </div>
  );
}

export default ExpenseItem;
