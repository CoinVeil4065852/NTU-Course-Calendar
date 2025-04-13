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
  title: "NTU Course Calendar",
  description: "Convert your NTU course schedule into an iCal file.",
  keywords: ["NTU", "iCal", "Course Schedule", "台大", "課表", "行事曆"],
  openGraph: {
    title: "NTU iCal Converter",
    description: "Easily convert NTU course schedules into calendar files.",
    url: "https://ntu-course-calendar.vercel.app/",
    siteName: "NTU Course Calendar",
    locale: "zh_TW",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        {children}
      </body>
    </html>
  );
}
