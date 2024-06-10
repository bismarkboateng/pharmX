import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
import "@mantine/core/styles.css";
import {  ColorSchemeScript, MantineProvider } from "@mantine/core"

const poppins = Poppins({
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
      <head>
        <ColorSchemeScript />
      </head>
      <body className={poppins.className}>
       <MantineProvider>{children}</MantineProvider>
      </body>
    </html>
  );
}
