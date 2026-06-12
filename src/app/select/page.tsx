import styles from './page.module.css';
import Link from 'next/link';

interface SelectPageProps {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}

const SelectPage = async ({ searchParams }: SelectPageProps): Promise<React.JSX.Element> => {
  const params = await searchParams;
  const analysisId = params.id as string | undefined;

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

          <Link 
            href={analysisId ? `/summary?id=${analysisId}` : "/testing"} 
            className={styles["demographics"]}
          >
            <h3 className={styles["option-title"]}>DEMOGRAPHICS</h3>
          </Link>
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