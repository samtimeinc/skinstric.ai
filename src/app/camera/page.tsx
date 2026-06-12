'use client';

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import styles from "./page.module.css";
import Processing from "@/components/processing";
import { Demographics } from "@/types/Demographics";
import ArrowPrev from "@/components/arrowPrev";
import RadioButton from "@/components/radioButton";
import Scan from "@/components/scan";
import CameraIcon from "@/components/cameraIcon";
import ArrowNext from "@/components/arrowNext";

interface AnalysisApiResponse {
  success: boolean;
  data: Demographics;
}

const CameraPage = (): React.JSX.Element => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isProcessing, setIsProcessing] = useState<boolean>(false);
  const [startCamera, setStartCamera] = useState<boolean>(true);
  const router = useRouter();

  const [stream, setStream] = useState<MediaStream | null>(null);
  const [capturedImage, setCapturedImage] = useState<string | null>(null);

  useEffect(() => {
    let activeStream: MediaStream | null = null;

    const setupCamera = async (): Promise<void> => {
      try {
        const mediaStream = await navigator.mediaDevices.getUserMedia({
          video: { facingMode: "user" },
          audio: false,
        });
        activeStream = mediaStream;
        setStream(mediaStream);
      } catch (err) {
        console.error("Error accessing camera:", err);
        alert("Could not access camera. Please check permissions.");
        router.push("/result");
      }
    };

    setupCamera();

    const timer = setTimeout(() => {
      setStartCamera(false);
    }, 3000);

    return () => {
      clearTimeout(timer);
      if (activeStream) {
        activeStream.getTracks().forEach((track) => track.stop());
      }
    };
  }, [router]);

  useEffect(() => {
    if (!startCamera && !capturedImage && stream && videoRef.current) {
      videoRef.current.srcObject = stream;
    }
  }, [startCamera, capturedImage, stream]);

  const capturePhoto = async (): Promise<void> => {
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
    setCapturedImage(base64String);
  };

  const submitPhoto = async (): Promise<void> => {
    if (!capturedImage) return;

    setIsProcessing(true);

    try {
      const response = await axios.post<AnalysisApiResponse>(
        "https://us-central1-frontend-simplified.cloudfunctions.net/skinstricPhaseTwo",
        { image: capturedImage }
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

  const displayInstructions = (): React.JSX.Element => {
    return (
      <div className={`${styles["instructions-container"]} ${startCamera ? "text-[#A0A4AB]!" : ""}`}>
            <div className={styles["instructions-title"]}>
              TO GET BETTER RESULTS MAKE SURE TO HAVE
            </div>
            <div className={styles["instructions-list"]}>

              <div className={styles["instruction-item"]}>
                <figure className={styles["icon-wrapper"]}>
                  <RadioButton className={startCamera ? "text-[#A0A4AB]!" : "text-[#1A1B1C]"} />
                </figure>
                <div className={styles["instruction-label"]}>NEUTRAL EXPRESSION</div>
              </div>

              <div className={styles["instruction-item"]}>
                <figure className={styles["icon-wrapper"]}>
                  <RadioButton className={startCamera ? "text-[#A0A4AB]!" : "text-[#1A1B1C]"} />
                </figure>
                <div className={styles["instruction-label"]}>FRONTAL POSE</div>
              </div>

              <div className={styles["instruction-item"]}>
                <figure className={styles["icon-wrapper"]}>
                  <RadioButton className={startCamera ? "text-[#A0A4AB]!" : "text-[#1A1B1C]"} />
                </figure>
                <div className={styles["instruction-label"]}>ADEQUATE LIGHTING</div>
              </div>
            </div>
          </div>
    )
  }

  return (
    <main className={styles["main"]}>
      
      {startCamera ? (
        <div className={styles["setting-up-camera"]}>
          <div className={styles["start-camera-container"]}>
            <div className={styles["start-camera-icon"]}>
              <CameraIcon />
            </div>
            <div className={styles["start-camera-message"]}>
              SETTING UP CAMERA...
            </div>
          </div>
          <div className={styles["diamond-one"]}></div>
          <div className={styles["diamond-two"]}></div>
          <div className={styles["diamond-three"]}></div>

          <>
            {displayInstructions()}
          </>
        </div>
      ) : (isProcessing ? (
        <div className={styles["processing-container"]}>
          <Processing />
        </div>
      ) : (capturedImage ? (
        <div className={styles["preview-container"]}>
          <img
            src={capturedImage}
            alt="Captured preview"
            className={styles["preview-image"]}
          />
          
          <div className={styles["preview-overlay-controls"]}>
            <div className={styles["preview-title"]}>
              GREAT SHOT!
            </div>

            <div className={styles["preview-retake-container"]}>
              <div
                onClick={() => setCapturedImage(null)}
                className={styles["nav-diamond"]}
              >
                <p>RETAKE</p>
              </div>

              <button 
                onClick={() => setCapturedImage(null)}
                className={styles["navigate"]}>
                <ArrowPrev />
              </button>
              <div className={styles["label"]}>BACK</div>
            </div>

            <div className={styles["preview-submit-container"]}>
              <div 
                onClick={submitPhoto} 
                className={styles["nav-diamond"]}
              >
                <p>SUBMIT</p>
              </div>

              <div className={styles["label"]}>SUBMIT</div>
              <button onClick={submitPhoto}  className={styles["navigate"]}>
                <ArrowNext />
              </button>
            </div>
          </div>
        </div>
      ) : (
        <div className={styles["camera-container"]}>
          <video
            ref={videoRef}
            autoPlay
            playsInline
            className={styles["video"]}
          />
          <canvas ref={canvasRef} style={{ display: "none" }} />

          {/* Shutter Button  */}
          <div className={styles["controls"]}>
            <div className={styles["scan-container"]}>
              <p className={styles["scan-text"]}>TAKE PICTURE</p>
              <div onClick={capturePhoto} className={styles["scan-icon-wrapper"]}>
                <Scan />
              </div>
            </div>
          </div>

          {/* Scanning Instructions */}
          {displayInstructions()}

          {/* Back Button */}
          <div className={styles["back-button-container"]}>
            <div
              onClick={() => router.back()}
              className={styles["nav-diamond"]}
            >
              <p>BACK</p>
            </div>

            <button
              onClick={() => router.back()}
              className={styles["navigate"]}
            >
              <ArrowPrev />
            </button>
            <div className={styles["label"]}>BACK</div>
          </div>
        </div>
      )))}
      
    </main>
  );
};

export default CameraPage;