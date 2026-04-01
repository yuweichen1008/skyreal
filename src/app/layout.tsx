import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "520赫茲共鳴 · 520 Hertz",
  description: "矽谷華人的愛情與生活播客。A Mandarin podcast about love, dating, and life in Silicon Valley — for single Chinese-speaking men and women.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-TW">
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}
