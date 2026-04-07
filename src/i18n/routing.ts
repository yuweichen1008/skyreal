import { defineRouting } from "next-intl/routing";

export const routing = defineRouting({
  locales: ["en", "zh-TW", "ja"],
  defaultLocale: "en",
  localePrefix: "as-needed", // /en is omitted, /zh-TW and /ja are prefixed
});
