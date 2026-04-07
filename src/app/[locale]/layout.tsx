import type { Metadata } from "next";
import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";
import { routing } from "@/i18n/routing";
import CommandPalette from "@/components/CommandPalette";
import "../globals.css";

export const metadata: Metadata = {
  title: "Skyreal — Creative Media Agency",
  description:
    "Full-stack media production for brands that want to be remembered. Video, social, copywriting, and brand identity — made with heart.",
};

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const messages = await getMessages();

  return (
    <html lang={locale}>
      <body className="antialiased">
        <NextIntlClientProvider messages={messages}>
          {children}
          <CommandPalette />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
