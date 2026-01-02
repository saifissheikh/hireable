"use client";

import { useState, useEffect } from "react";
import type { Locale } from "./i18n-config";

export function useLocale(): Locale {
  const [locale, setLocale] = useState<Locale>("en");

  useEffect(() => {
    // Get initial locale from cookie
    const getLocaleFromCookie = () => {
      const cookies = document.cookie.split(";");
      const localeCookie = cookies.find((c) =>
        c.trim().startsWith("NEXT_LOCALE=")
      );
      if (localeCookie) {
        return localeCookie.split("=")[1] as Locale;
      }
      return "en" as Locale;
    };

    setLocale(getLocaleFromCookie());

    // Listen for locale changes
    const handleLocaleChange = (e: CustomEvent<Locale>) => {
      setLocale(e.detail);
    };

    window.addEventListener("localeChange" as any, handleLocaleChange);

    return () => {
      window.removeEventListener("localeChange" as any, handleLocaleChange);
    };
  }, []);

  return locale;
}
