'use client';

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import styles from "./page.module.css";
import Processing from "@/components/processing";
import { Demographics } from "@/types/Demographics";
import { CiCamera } from "react-icons/ci";

interface AnalysisApiResponse {
  success: boolean;
  data: Demographics;
}

const CameraPage = (): React.JSX.Element => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const startCamera = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          video: { facingMode: "user" },
          audio: false,
        });
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
        }
      } catch (err) {
        console.error("Error accessing camera:", err);
        alert("Could not access camera. Please check permissions.");
        router.push("/result");
      }
    };

    startCamera();

    return () => {
      // Stop all tracks when component unmounts
      if (videoRef.current?.srcObject) {
        const stream = videoRef.current.srcObject as MediaStream;
        stream.getTracks().forEach((track) => track.stop());
      }
    };
  }, [router]);

  const capturePhoto = async () => {
    if (!videoRef.current || !canvasRef.current) return;

    const context = canvasRef.current.getContext("2d");
    if (!context) return;

    // Set canvas dimensions to match video stream
    canvasRef.current.width = videoRef.current.videoWidth;
    canvasRef.current.height = videoRef.current.videoHeight;

    // Draw the current video frame to the canvas
    context.drawImage(videoRef.current, 0, 0);

    // Convert to base64
    const base64String = canvasRef.current.toDataURL("image/jpeg");
    
    setIsProcessing(true);

    try {
      const response = await axios.post<AnalysisApiResponse>(
        "https://us-central1-frontend-simplified.cloudfunctions.net/skinstricPhaseTwo",
        { image: base64String }
      );

      const { success, data: demographicData } = response.data;
      if (success) {
        const analysisId = typeof crypto.randomUUID === 'function' 
          ? crypto.randomUUID() 
          : Math.random().toString(36).substring(2);

        await axios.post("/api/analysis", {
          id: analysisId,
          data: demographicData,
        });

        router.push(`/select?id=${analysisId}`);
      } else {
        alert("Analysis failed. Please try again.");
        setIsProcessing(false);
      }
    } catch (error) {
      console.error("Analysis failed:", error);
      setIsProcessing(false);
    }
  };

  return (
    <main className={styles["main"]}>
      {isProcessing ? (
        <div className={styles["processing-container"]}>
          <Processing />
        </div>
      ) : (
        <div className={styles["camera-container"]}>
          <video ref={videoRef} autoPlay playsInline className={styles["video"]} />
          <canvas ref={canvasRef} style={{ display: "none" }} />
          <div className={styles["controls"]}>
            <div onClick={capturePhoto} className={styles["capture-button"]}>
              <CiCamera className={styles["camera-icon"]} />
            </div>
          </div>
        </div>
      )}
    </main>
  );
};

export default CameraPage;