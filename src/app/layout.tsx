// Root layout — intentionally minimal.
// The locale layout at [locale]/layout.tsx owns <html> and <body>
// so that lang="" is set correctly per locale.
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
