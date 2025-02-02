"use client";

import "./globals.css";
import { Inter } from "next/font/google";
import Navbar from "../components/Navbar";
import type React from "react";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      {/* <head>
        <link
          rel="stylesheet"
          href="https://cdn.jsdelivr.net/npm/swiper@9/swiper-bundle.min.css"
        />
      </head> */}
      <body className={inter.className}>
        <Navbar />
        <main>{children}</main>
      </body>
    </html>
  );
}
