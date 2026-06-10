'use client';

import { useState, useRef } from "react";
import CameraIcon from "@/components/cameraIcon";
import styles from "./page.module.css"
import GalleryIcon from "@/components/galleryIcon";
import CameraPointer from "@/components/cameraPointer";
import GalleryPointer from "@/components/galleryPointer";
import axios from "axios";
import Processing from "@/components/processing";
import { useRouter } from "next/navigation";
import { Demographics } from "@/types/Demographics";



const ResultPage = () => {
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);

  const fileInputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();


  const handleGalleryClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Validate MIME type for still images
    const allowedImageTypes = ['image/jpeg', 'image/png', 'image/webp'];
    if (!allowedImageTypes.includes(file.type)) {
      alert('Please upload a still image file (JPEG, PNG, or WebP).');
      return;
    }

    const reader = new FileReader();
    reader.onloadend = async () => {
      const base64String = reader.result as string;
      setPreviewImage(base64String);
      setIsProcessing(true);

      try {
        const response = await axios.post(
          "https://us-central1-frontend-simplified.cloudfunctions.net/skinstricPhaseTwo",
          { image: base64String }
        );
        
        const success: boolean = response.data.success;
        const demographicData: Demographics = response.data.data;

        if (success) {
          // Generate a unique ID using the built-in crypto API or a fallback
          const analysisId = typeof crypto.randomUUID === 'function' ? crypto.randomUUID() : Math.random().toString(36).substring(2);
          
          // Save to our internal temporary server cache
          await axios.post("/api/analysis", {
            id: analysisId,
            data: demographicData,
          });
          router.push(`/select?id=${analysisId}`);
        } else {
          alert('Analysis failed. Please try again.');
        }
      } catch (error) {
        console.error("Analysis failed:", error);
        setIsProcessing(false);
      }
    };
    reader.readAsDataURL(file);
  };

  return (
    <main className={styles["main"]}>
      <div className={styles["preview-wrapper"]}>
        <div className={styles["start-message"]}>TO START ANALYSIS</div>
        <div className={styles["preview"]}>
          <p className={styles["preview-title"]}>Preview</p>
          <div className={styles["preview-image"]}>
            {previewImage && (
              <img 
                src={previewImage} 
                alt="Selected preview" 
                className={styles["preview-img-content"]}
              />
            )}
          </div>
        </div>
      </div>
      <div className={styles["access-options"]}>
        {!isProcessing ? (
          <>
            <div className={styles["camera-access"]}>
              <figure className={styles["icon-wrapper"]}>
                <CameraIcon /> {/*  We will come back to this in Phase 3 */}
                <div className={styles["diamond-one"]}></div>
                <div className={styles["diamond-two"]}></div>
                <div className={styles["diamond-three"]}></div>
              </figure>
              <div className={styles["camera-subtitle"]}>
                ALLOW AI
                <br />
                TO SCAN YOUR FACE
              </div>
              <div className={styles["camera-pointer"]}>
                <CameraPointer />
              </div>
            </div>
            <div className={styles["gallery-access"]} onClick={handleGalleryClick}>
              <input 
                type="file" 
                ref={fileInputRef} 
                onChange={handleFileChange} 
                accept="image/*" 
                className={styles["hidden-input"]} 
              />
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
              <div className={styles["gallery-pointer"]}>
                <GalleryPointer />
              </div>
            </div>
          </>
        ) : (
          <Processing />
        )}
      </div>
    </main>
  );
}

export default ResultPage
