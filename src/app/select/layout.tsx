import Footer from "@/components/footer";
import { Suspense } from "react";

function SelectLayoutContent({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Suspense fallback={<div>Loading...</div>}>
        {children}
      </Suspense>
      <Footer />
    </>
  );
}

export default function SelectLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <SelectLayoutContent>{children}</SelectLayoutContent>;
}
