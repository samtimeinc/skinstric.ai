'use client';

import Footer from "@/components/footer";
import { TestingProvider, useTesting } from "./TestingContext";

function TestingLayoutContent({ children }: { children: React.ReactNode }): React.JSX.Element {
  const { step } = useTesting();
  
  return (
    <>
      {children}
      <Footer step={step} />
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