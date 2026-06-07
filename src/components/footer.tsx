'use client';

import ArrowPrev from './arrowPrev';
import styles from "../app/testing/page.module.css"
import { useRouter } from 'next/navigation';
import ArrowNext from './arrowNext';

const Footer = () => {
  const router = useRouter();

  return (
    <div className={styles["footer"]}>
      <div className={styles["container"]}>
        <div className={styles["nav-button-container"]}>
          <div
            onClick={() => router.back()}
            className={styles["nav-diamond-back"]}
          ></div>
          <button
            onClick={() => router.back()}
            className={styles["back-button"]}
          >
            <ArrowPrev />
          </button>
          <div className={styles["label"]}>BACK</div>
        </div>

        <div className={styles["nav-button-container"]}>
          <div className={styles["label"]}>PROCEED</div>
          <div onClick={() => console.log("proceed")} className={styles["nav-diamond-proceed"]}></div>
          <button
            onClick={() => console.log("proceed")}
            className={styles["proceed-button"]}
          >
            <ArrowNext />
          </button>
        </div>
      </div>
    </div>
  );
}

export default Footer
