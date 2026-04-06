import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Skyreal — Creative Media Agency",
  description: "Full-stack media production for brands that want to be remembered. Video, social, copywriting, and brand identity — made with heart.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}
