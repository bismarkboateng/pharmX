import Navbar from "@/components/Navbar";


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <section>
     <Navbar />
     <section className="w-[90%] mx-auto pt-2">
      {children}
     </section>
    </section>
  );
}
