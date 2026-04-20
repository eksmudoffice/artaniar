import * as React from "react";
import type { Locale, TranslationKey } from "@/i18n/translations";
import { translations } from "@/i18n/translations";

const STORAGE_KEY = "locale";

export function useLocale() {
  const [locale, setLocale] = React.useState<Locale>(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    return saved === "id" || saved === "en" ? saved : "en";
  });

  React.useEffect(() => {
    localStorage.setItem(STORAGE_KEY, locale);
  }, [locale]);

  const t = React.useCallback(
    (key: TranslationKey) => {
      return translations[locale][key] ?? translations.en[key] ?? key;
    },
    [locale],
  );

  return { locale, setLocale, t };
}