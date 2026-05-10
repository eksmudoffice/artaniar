import * as React from "react";
import type { Locale, TranslationKey } from "@/i18n/translations";
import { translations } from "@/i18n/translations";

const STORAGE_KEY = "locale";

type LocaleContextValue = {
  locale: Locale;
  setLocale: (next: Locale) => void;
  t: (key: TranslationKey) => string;
};

const LocaleContext = React.createContext<LocaleContextValue | null>(null);

export function LocaleProvider({ children }: { children: React.ReactNode }) {
  const [locale, setLocale] = React.useState<Locale>(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    return saved === "id" || saved === "en" ? saved : "id";
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

  const value = React.useMemo(() => ({ locale, setLocale, t }), [locale, t]);

  return <LocaleContext.Provider value={value}>{children}</LocaleContext.Provider>;
}

export function useLocaleContext() {
  const ctx = React.useContext(LocaleContext);
  if (!ctx) throw new Error("useLocale must be used within <LocaleProvider />");
  return ctx;
}