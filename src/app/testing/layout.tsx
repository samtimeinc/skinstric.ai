'use client';

import Footer from "@/components/footer";
import { TestingProvider, useTesting } from "./TestingContext";

function TestingLayoutContent({ children }: { children: React.ReactNode }) {
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
}) {
  return (
    <TestingProvider>
      <TestingLayoutContent>{children}</TestingLayoutContent>
    </TestingProvider>
  );
}