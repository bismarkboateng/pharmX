import type { Metadata } from "next";
import { Roboto } from "next/font/google";

export const metadata: Metadata = {
  title: "Accounts",
};

const roboto = Roboto({
    weight: ["400", "700"],
    subsets: ["latin"],
});

export default function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <main className={`${roboto.className}`}>
     {children}
    </main>
  );
}
