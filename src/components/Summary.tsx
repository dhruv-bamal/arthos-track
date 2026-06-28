import type { Transaction, Category, CategoryTotals } from "../types";
import { totalByCategory } from "../lib/logic";
import styles from "../styles/Summary.module.css";

interface SummaryProps {
  transactions: Transaction[];
}

function Summary({ transactions }: SummaryProps) {
  const totals: CategoryTotals = totalByCategory(transactions);
  const categories = Object.keys(totals) as Category[];

  return (
    <div className={styles.card}>
      <h2 className={styles.title}>Spending by category</h2>
      {categories.map((category) => (
        <div key={category} className={styles.row}>
          <span className={`${styles.badge} badge-${category.toLowerCase()}`}>
            {category}
          </span>
          <span className={styles.amount}>₹{totals[category]}</span>
        </div>
      ))}
    </div>
  );
}

export default Summary;
