"use client"

import React from 'react';
import styles from './page.module.css';
import { useRouter, useSearchParams } from 'next/navigation';

interface SelectPageProps {
  // searchParams are automatically passed to Server Components,
  // but since this is a Client Component, we'll access them via useSearchParams
}

const SelectPage = ({}: SelectPageProps) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const analysisId = searchParams.get('id');

  const handleDemographicsClick = () => {
    if (analysisId) {
      router.push(`/summary?id=${analysisId}`);
    } else {
      // Handle case where analysisId is missing, e.g., redirect to home or show error
      alert('Analysis ID missing. Please start a new analysis.');
      router.push('/');
    }
  };

  return (
    <main className={styles["main"]}>
      <div className={styles["analysis-wrapper"]}>
        <div className={styles["title"]}>AI ANALYSIS</div>
        <div className={styles["subtitle"]}>
          AI HAS ESTIMATED THE FOLLOWING.
          <br />
          FIX ESTIMATED INFORMATION IF NEEDED.
        </div>
      </div>
      <div className={styles["analysis_options-wrapper"]}>
        <div className={styles["analysis-options"]}>
          <div className={styles["cosmetic-concerns"]}>
            <h3 className={styles["option-title"]}>
              COSMETIC
              <br />
              CONCERNS
            </h3>
          </div>
          <div className={styles["demographics"]}>
            <h3 className={styles["option-title"]}>DEMOGRAPHICS</h3>
          </div>
          <div className={styles["weather"]}>
            <h3 className={styles["option-title"]}>WEATHER</h3>
          </div>
          <div className={styles["skin-type"]}>
            <h3 className={styles["option-title"]}>
              SKIN TYPE
              <br />
              DETAILS
            </h3>
          </div>
        </div>
      </div>
    </main>
  );
}

export default SelectPage
