import { cookies } from "next/headers";
import { i18n, Locale } from "./i18n-config";

export async function getLocale(): Promise<Locale> {
  const cookieStore = await cookies();
  const localeCookie = cookieStore.get("NEXT_LOCALE");

  if (localeCookie && i18n.locales.includes(localeCookie.value as Locale)) {
    return localeCookie.value as Locale;
  }

  return i18n.defaultLocale;
}
