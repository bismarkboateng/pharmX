import type { Metadata } from "next";
import { Roboto } from "next/font/google";
import { Toaster } from "react-hot-toast"
import { ThemeProvider } from "@/components/theme-provider"
import "./globals.css";

const roboto = Roboto({
  weight: ["400", "700"],
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "pharmX",
  description: "A Pharmacy web application",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${roboto.className} bg-dark-300 relative`}>
       <main>
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
        >
            {children}
        </ThemeProvider>
        <Toaster
          position="top-right"
          reverseOrder={false}
        />
       </main>
      </body>
    </html>
  );
}
