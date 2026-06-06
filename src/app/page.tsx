
import ArrowNext from "@/components/arrowNext";
import styles from "./page.module.css";
import Link from "next/link";
import ArrowPrev from "@/components/arrowPrev";


export default function Home() {
  return (
    <main className={styles["main"]}>
      <div className={styles["container"]}>
        <h1 className={styles["title"]}>
          Sophisticated
          <br />
          <span className={styles["highlight"]}>skincare</span>
        </h1>
        <p className={styles["description"]}>
          Skinstric developed an A.I. that creates a highly-personalized routine
          tailored to what your skin needs.
        </p>

        <div className={styles["enter-experience"]}>
          <p>ENTER EXPERIENCE</p>
          <Link href="/testing" className={styles["arrow"]}>
            <ArrowNext />
          </Link>
        </div>
      </div>
        <div className={styles["diamond-large"]}></div>
        <div className={styles["discover"]}>
          <Link href='#' className="cursor-not-allowed">
            <ArrowPrev />
          </Link>
          <div>DISCOVER AI</div>
        </div>
        <div className={styles["diamond-small"]}></div>
        <div className={styles["take-test"]}>
          <div>TAKE TEST</div>
          <Link href="/testing" className={styles["arrow"]}>
            <ArrowNext />
          </Link>
        </div>
    </main>
  );
}
