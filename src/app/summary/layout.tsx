import Footer from "@/components/footer";
import { Suspense } from "react";

function SummaryLayoutContent({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Suspense fallback={null}>
        {children}
        <Footer />
      </Suspense>
    </>
  );
}

export default function SummaryLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <SummaryLayoutContent>{children}</SummaryLayoutContent>;
}
