'use client'
import { useState, useEffect, useCallback } from 'react'
import styles from './page.module.css'
import { useSearchParams, useRouter } from 'next/navigation'
import axios from 'axios'
import { Demographics } from '@/types/Demographics'
import CircleGraph from '@/components/circleGraph'
import RadioButton from '@/components/radioButton'
import RadioSelected from '@/components/radioSelection'
    
const SummaryPage = (): React.JSX.Element => {
    const [ageData, setAgeData] = useState<Demographics['age'] | null>(null);
    const [raceData, setRaceData] = useState<Demographics['race'] | null>(null);
    const [genderData, setGenderData] = useState<Demographics['gender'] | null>(null);
    const [displayMode, setDisplayMode] = useState<"race" | "age" | "gender">("race");
    const [chosenRace, setChosenRace] = useState({
      label: "N/A",
      confidence: 0,
    });
    const [chosenAge, setChosenAge] = useState({ label: "N/A", confidence: 0 });
    const [chosenGender, setChosenGender] = useState({ label: "N/A", confidence: 0 });
    const [isLoading, setIsLoading] = useState(true);

    const searchParams = useSearchParams();
    const analysisId = searchParams.get('id');
    const router = useRouter();

    const getTopEntry = (data: Record<string, number> | null): { label: string; confidence: number } => {
        if (!data) return { label: "N/A", confidence: 0 };
        const entries = Object.entries(data) as [string, number][];
        if (entries.length === 0) return { label: "N/A", confidence: 0 }; 

        const sorted = entries.sort(([, a], [, b]) => b - a);
        return { label: sorted[0][0], confidence: Math.round(sorted[0][1] * 100) };
    };

    const handleSettingTrait = (label: string, value: number): void => {
        const userSelection = { label: label, confidence: Math.round(value * 100) };
        displayMode === "race" ? setChosenRace(userSelection) :
        displayMode === "age" ? setChosenAge(userSelection) :
        setChosenGender(userSelection);
    }

    const currentSelection = 
        displayMode === "race" ? chosenRace :
        displayMode === "age" ? chosenAge :
        chosenGender;

    const currentDataList = 
        displayMode === "race" ? raceData :
        displayMode === "age" ? ageData :
        genderData;

    const fetchAnalysisData = useCallback(async () => {
      if (!analysisId) return;

      try {
        const response = await axios.get<{ data: Demographics }>(
          `/api/analysis?id=${analysisId}`,
        );
        const { age, race, gender } = response.data.data;

        if (age) {
          setAgeData(age);
          setChosenAge(getTopEntry(age));
        }
        if (race) {
          setRaceData(race);
          setChosenRace(getTopEntry(race));
        }
        if (gender) {
          setGenderData(gender);
          setChosenGender(getTopEntry(gender));
        }
      } catch (error) {
        if (axios.isAxiosError(error) && error.response?.status === 404) {
            alert("Analysis data not found or expired. Redirecting to start test.");
            router.push('/testing');
        } else {
            console.error("Failed to fetch analysis data:", error);
        }
      } finally {
        setIsLoading(false);
      }
    }, [analysisId]);

    useEffect(() => {
      fetchAnalysisData();
    }, [fetchAnalysisData]);

    if (isLoading) return <div className={styles["loading"]}>Loading Analysis...</div>;

    return (
      <main className={styles["main"]}>
        <div className={styles["summary-header"]}>
          <h3>AI ANALYSIS</h3>
          <h1>DEMOGRAPHICS</h1>
          <p>PREDICTED RACE & AGE</p>
        </div>
        <div className={styles["dashboard-grid"]}>

          {/* User Characterics */}
          <div className={styles["sidebar"]}>
            <div
              className={`${styles["summary-card"]} ${displayMode === "race" ? styles["active"] : ""}`}
              onClick={() => setDisplayMode("race")}
            >
              <p>{chosenRace.label.toUpperCase()}</p>
              <h4>RACE</h4>
            </div>
            <div
              className={`${styles["summary-card"]} ${displayMode === "age" ? styles["active"] : ""}`}
              onClick={() => setDisplayMode("age")}
            >
              <p>{chosenAge.label.toUpperCase()}</p>
              <h4>AGE</h4>
            </div>
            <div
              className={`${styles["summary-card"]} ${displayMode === "gender" ? styles["active"] : ""}`}
              onClick={() => setDisplayMode("gender")}
            >
              <p>{chosenGender.label.toUpperCase()}</p>
              <h4>SEX</h4>
            </div>
          </div>

          {/* Visual circle graph */}
          <div className={styles["main-display"]}>
            <p className={styles["display-label"]}>
              {currentSelection.label.charAt(0).toUpperCase() + currentSelection.label.slice(1)}
            </p>
            <div className={styles["visualizer-container"]}>
              <div className={styles["visualizer"]}>
                <CircleGraph percentage={currentSelection.confidence} />
                <div className={styles["progress-text"]}>
                  <p>
                    {currentSelection.confidence}
                    <span>%</span>
                  </p>
                </div>
              </div>
            </div>
            <div className={styles["disclaimer"]}>
              If AI estimate is wrong, select the correct one.
            </div>
          </div>

          {/* AI confidence scores */}
          <div className={styles["confidence-list"]}>
            <div className={styles["confidence-header"]}>
              <span>
                {displayMode === "gender" ? "SEX" : displayMode.toUpperCase()}
              </span>
              <span>AI CONFIDENCE</span>
            </div>
            {currentDataList &&
              (Object.entries(currentDataList) as [string, number][])
                .sort(([, a], [, b]) => b - a)
                .map(([label, value]) => (
                  <div
                    onClick={() => handleSettingTrait(label, value)}
                    key={label}
                    className={`${styles["confidence-item"]} ${label === currentSelection.label ? styles["selected"] : ""}`}
                  >
                    <div className={styles["confidence-label"]}>
                      <figure className={styles["radio-wrapper"]}>
                        {label === currentSelection.label ? (
                          <RadioSelected />
                        ) : (
                          <RadioButton />
                        )}
                      </figure>
                      <span>
                        {label.charAt(0).toUpperCase() + label.slice(1)}
                      </span>
                    </div>

                    <div>{Math.round(value * 100)}%</div>
                  </div>
                ))}
          </div>
        </div>
      </main>
    );
}

export default SummaryPage
