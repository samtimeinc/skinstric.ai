import Footer from "@/components/footer";

function ResultLayoutContent({ children }: { children: React.ReactNode }) {
  return (
    <>
      {children}
      <Footer />
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