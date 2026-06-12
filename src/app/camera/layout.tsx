import Footer from "@/components/footer";

function CameraLayoutContent({ children }: { children: React.ReactNode }) {
  return (
    <>
      {children}
      <Footer />
    </>
  );
}

export default function CameraLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <CameraLayoutContent>{children}</CameraLayoutContent>;
}
