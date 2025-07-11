import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "SkyReal - The Future of Reality",
  description: "Experience the next generation of immersive technology with SkyReal. Join thousands of users exploring new dimensions.",
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
