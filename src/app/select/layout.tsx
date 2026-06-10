import Footer from "@/components/footer";

function SelectLayoutContent({ children }: { children: React.ReactNode }) {
  return (
    <>
      {children}
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
