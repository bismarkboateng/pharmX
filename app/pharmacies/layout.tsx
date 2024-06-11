import Navbar from "@/components/shared/Navbar";

export default function PharmacyLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <section>
     <Navbar />
     {children}
    </section>
  );
}
