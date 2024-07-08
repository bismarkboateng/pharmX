import Navbar from "@/components/Navbar";


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <section>
     <section className="w-[90%] mx-auto pt-2">
      <Navbar />
      {children}
     </section>
    </section>
  );
}
