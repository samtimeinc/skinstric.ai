'use client';

import Footer from "@/components/footer";
import { TestingProvider, useTesting } from "./TestingContext";
import { Suspense } from "react";

function TestingLayoutContent({ children }: { children: React.ReactNode }): React.JSX.Element {
  const { step } = useTesting();
  
  return (
    <>
      <Suspense fallback={null}>
        {children}
        <Footer step={step} />
      </Suspense>
    </>
  );
}

export default function TestingLayout({
  children,
}: {
  children: React.ReactNode;
}): React.JSX.Element {
  return (
    <TestingProvider>
      <TestingLayoutContent>{children}</TestingLayoutContent>
    </TestingProvider>
  );
}