import styles from "./page.module.css"


const ResultPage = () => {
  return (
    <main className={styles["main"]}>
        <div>
            <div className={styles["start-message"]}>TO START ANALYSIS</div>
            <div>
                <p>Preview</p>
                <div>[ Add image preview here ]</div>
            </div>

        </div>
    </main>
  );
}

export default ResultPage
