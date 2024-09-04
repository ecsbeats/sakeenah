import type { Metadata } from "next";
import { Schibsted_Grotesk } from "next/font/google";
import clsx from "clsx";
import "./globals.css";
import Head from "next/head";
import { MathJaxContext } from "better-react-mathjax";

const schibsted_grotesk = Schibsted_Grotesk({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Sakeenah",
  description: "By Adam Blumenfeld",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
      <html lang="en">
          <body className={clsx(schibsted_grotesk.className, "bg-zinc-50", "text-zinc-900", "flex flex-row min-h-screen justify-center items-center")}>{children}</body>
      </html>
  );
}
