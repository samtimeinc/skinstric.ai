'use client';

import { useState } from 'react';
import styles from './page.module.css';
import axios from 'axios';
import { useTesting } from './TestingContext';

const TestingPage = () => {
    const [name, setName] = useState('');
    const [location, setLocation] = useState('');
    const [error, setError] = useState('');
    
    const { step, setStep } = useTesting();

  const validateInput = (value: string) => {
    // Regex allowing only letters and spaces. No numbers or special characters.
    const regex = /^[a-zA-Z\s]+$/;
    return regex.test(value.trim());
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (step === 'name') {
      if (validateInput(name)) {
        setStep('location');
      } else {
        setError('Please enter a valid name (no numbers or special characters).');
      }
    } else if (step === 'location') {
      if (validateInput(location)) {
        setStep('submitting');
        await sendDataToAPI({ name, location });
      } else {
        setError(
          "Please enter a valid location (no numbers or special characters).",
        );
      }
    }
  };

  const sendDataToAPI = async (data: { name: string; location: string }) => {
    try {
      const response = await axios.post(
        "https://us-central1-frontend-simplified.cloudfunctions.net/skinstricPhaseOne",
        data
      );
      const userAddedToList = response.data.success;
      if (userAddedToList) {
          setStep('success');
      } else {
        setError('Failed to analyze. Please try again.');
        setStep('name');
      }
    } catch (err) {
      console.error('API submission failed:', err);
      setError('Failed to analyze. Please try again.');
      setStep('name');
    }
  };

  return (
    <main className={styles["main"]}>
      <div className={styles["start-message"]}>TO START ANALYSIS</div>
      <div className={styles["form-fields"]}>
        {(step === "name" || step === "location") && (
          <div className={styles["form-message"]}>CLICK TO TYPE</div>
        )}
        {step === "submitting" && (
          <div className={styles["processing-container"]}>
            <div className={styles["form-message"]}>Processing submission</div>
            <div className={styles["loading-dots"]}>
              <span>.</span>
              <span>.</span>
              <span>.</span>
            </div>
          </div>
        )}
        {step === "success" && (
          <div className={styles["processing-container"]}>
            <div className={`${styles["form-message"]} text-[18pt]! text-black!`}>
              Thank you!
            </div>
            <div className={`${styles["form-message"]} text-[14pt]! text-gray-500!`}>Proceed for the next step</div>
          </div>
        )}
        {error && <div className={styles["error-message"]}>{error}</div>}
        <form onSubmit={handleSubmit}>
          {step === "name" && (
            <input
              id="name"
              className={styles["input"]}
              type="text"
              placeholder="Introduce Yourself"
              value={name}
              onChange={(e) => setName(e.target.value)}
              autoFocus
            />
          )}
          {step === "location" && (
            <input
              id="location"
              className={styles["input"]}
              type="text"
              placeholder="Your city name"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              autoFocus
            />
          )}
        </form>
        <div className={styles["diamond-one"]}></div>
        <div className={styles["diamond-two"]}></div>
        <div className={styles["diamond-three"]}></div>
      </div>
    </main>
  );
}

export default TestingPage;
