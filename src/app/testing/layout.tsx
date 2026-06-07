import Footer from "@/components/footer";

export default function TestingLayout({
  children,
}: {
  children: React.ReactNode;
}) {

  
  return (
    <>
      {children}
      <Footer />
    </>
  );
}