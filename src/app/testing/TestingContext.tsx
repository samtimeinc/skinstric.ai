'use client';

import { createContext, useContext, useState, ReactNode } from 'react';

export type Step = 'name' | 'location' | 'submitting' | 'success';

interface TestingContextType {
  step: Step;
  setStep: (step: Step) => void;
}

const TestingContext = createContext<TestingContextType | undefined>(undefined);

export function TestingProvider({ children }: { children: ReactNode }) {
  const [step, setStep] = useState<Step>('name');

  return (
    <TestingContext.Provider value={{ step, setStep }}>
      {children}
    </TestingContext.Provider>
  );
}

export const useTesting = () => {
  const context = useContext(TestingContext);
  if (!context) throw new Error('useTesting must be used within a TestingProvider');
  return context;
};