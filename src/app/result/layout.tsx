import Footer from "@/components/footer";
import { Suspense } from "react";

function ResultLayoutContent({ children }: { children: React.ReactNode }) {
  return (
    <>
      {children}
      <Suspense fallback={null}>
        <Footer />
      </Suspense>
    </>
  );
}

export default function ResultLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ResultLayoutContent>{children}</ResultLayoutContent>
  );
}