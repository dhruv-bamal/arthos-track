import type { RecurringSubscription } from "../types";
import styles from "../styles/RecurringSection.module.css";

interface RecurringSectionProps {
  subscriptions: RecurringSubscription[];
}

function RecurringSection({ subscriptions }: RecurringSectionProps) {
  if (subscriptions.length === 0) {
    return (
      <section className={styles.card}>
        <h2 className={styles.title}>🔁 Subscriptions</h2>
        <p className={styles.empty}>
          Add a few months of expense and we'll automatically detect charges.
        </p>
      </section>
    );
  }

  return (
    <section className={styles.card}>
      <h2 className={styles.title}>🔁 Detected Subscriptions</h2>
      {subscriptions.map((sub) => (
        <div key={sub.merchant} className={styles.row}>
          <span className={styles.merchant}>{sub.merchant}</span>
          <span className={styles.amount}>₹{sub.amount} / month</span>
          <span className={styles.count}>({sub.count} charges detected)</span>
        </div>
      ))}
    </section>
  );
}

export default RecurringSection;
