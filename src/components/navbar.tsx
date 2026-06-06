import styles from "../app/page.module.css";
import Link from "next/link";


const Navbar = () => {
  return (
    <nav className={styles["navbar"]}>
      <div className={styles["container"]}>
        <div className={styles["logo"]}>
          <Link href="/" className={styles["brand"]}>SKINSTRIC</Link>
          <span className={styles["intro"]}>[ INTRO ]</span>
        </div>
        <div>
          <button className={styles["enter-code"]}>ENTER CODE</button>
        </div>
      </div>
    </nav>
  );
}

export default Navbar
