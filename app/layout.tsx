import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Next.js Todo",
  description: "Simple Todo with App Router + Prisma + Server Actions",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <div className="container py-8">
          <h1 className="mb-6 text-2xl font-bold">Next.js Todo</h1>
          {children}
          {/* 모달 포털 루트 */}
          <div id="modal-root" />
        </div>
      </body>
    </html>
  );
}
