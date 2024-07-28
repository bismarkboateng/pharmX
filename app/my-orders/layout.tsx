import Navbar from "@/components/Navbar";


export default function OrdersLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <section className="">
     <Navbar />
     {children}
    </section>
  );
}
