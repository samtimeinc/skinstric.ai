import Footer from "@/components/footer";

function SummaryLayoutContent({ children }: { children: React.ReactNode }) {
  return (
    <>
      {children}
      <Footer />
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
