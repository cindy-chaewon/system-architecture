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
        className={`${geistSans.variable} ${geistMono.variable} min-h-screen bg-slate-100 text-slate-900 antialiased`}
      >
        <main className="min-h-screen flex justify-center px-4">
          <div className="w-full max-w-2xl py-10">
            <h1 className="mb-6 text-3xl font-bold tracking-tight">Todo</h1>
            {children}
            <div id="modal-root" />
          </div>
        </main>
      </body>
    </html>
  );
}
