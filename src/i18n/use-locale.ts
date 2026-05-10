import { useLocaleContext } from "@/i18n/locale-provider";

export function useLocale() {
  return useLocaleContext();
}