import styles from '../app/testing/page.module.css'; // Still using testing page styles as requested

const Processing = () => {
  return (
    <div className={styles["processing-container"]}>
      <div className={styles["form-message"]}>Processing submission</div>
      <div className={styles["loading-dots"]}>
        <span>.</span>
        <span>.</span>
        <span>.</span>
      </div>
    </div>
  );
};

export default Processing;