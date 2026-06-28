import styles from "../styles/Header.module.css";

function Header() {
  return (
    <header className={styles.header}>
      <h1 className={styles.title}>Money Tracker</h1>
      <p className={styles.tagline}>
        Your personal spending & subscription tracker
      </p>
    </header>
  );
}

export default Header;
