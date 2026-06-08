import CameraIcon from "@/components/cameraIcon";
import styles from "./page.module.css"
import GalleryIcon from "@/components/galleryIcon";


const ResultPage = () => {
  return (
    <main className={styles["main"]}>
      <div className={styles["preview-wrapper"]}>
        <div className={styles["start-message"]}>TO START ANALYSIS</div>
        <div className={styles["preview"]}>
          <p className={styles["preview-title"]}>Preview</p>
          <div className={styles["preview-image"]}></div>
        </div>
      </div>
      <div className={styles["access-options"]}>
        <div className={styles["camera-access"]}>
          <figure className={styles["icon-wrapper"]}>
            <CameraIcon />
            <div className={styles["diamond-one"]}></div>
            <div className={styles["diamond-two"]}></div>
            <div className={styles["diamond-three"]}></div>
          </figure>
          <div className={styles["camera-subtitle"]}>
            ALLOW AI
            <br />
            TO SCAN YOUR FACE
          </div>
        </div>
        <div className={styles["gallery-access"]}>
          <figure className={styles["icon-wrapper"]}>
            <GalleryIcon />
            <div className={styles["diamond-one"]}></div>
            <div className={styles["diamond-two"]}></div>
            <div className={styles["diamond-three"]}></div>
          </figure>
          <div className={styles["gallery-subtitle"]}>
            ALLOW AI
            <br />
            TO ACCESS GALLERY
          </div>
        </div>
      </div>
    </main>
  );
}

export default ResultPage
