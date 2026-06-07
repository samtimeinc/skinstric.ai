'use client';

import ArrowPrev from './arrowPrev';
import styles from "../app/testing/page.module.css"
import { usePathname, useRouter } from 'next/navigation';
import ArrowNext from './arrowNext';
import { Step } from '@/app/testing/TestingContext';

interface FooterProps {
  step?: Step;
}

const Footer = ({ step }: FooterProps) => {
  const router = useRouter();
  const pathname = usePathname();
  
  const showProceed = !!(step === 'success');


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

        {pathname === '/testing' && showProceed && 
            <div className={styles["nav-button-container"]}>
                <div className={styles["label"]}>PROCEED</div>
                <div
                    onClick={() => router.push("/result")}
                    className={styles["nav-diamond-proceed"]}
                ></div>
                <button
                    onClick={() => router.push("/result")}
                    className={styles["proceed-button"]}
                >
                    <ArrowNext />
                </button>
            </div> 
        }
      </div>
    </div>
  );
}

export default Footer
