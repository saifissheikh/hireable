import enContent from "@/content/en.json";
import arContent from "@/content/ar.json";
import { Locale } from "./i18n-config";

type ContentPath = string;
type ContentValue = string | Record<string, unknown>;

// Map of locale to content
const contentMap: Record<Locale, Record<string, unknown>> = {
  en: enContent as Record<string, unknown>,
  ar: arContent as Record<string, unknown>,
};

/**
 * Get content from the centralized content JSON file
 * Supports nested paths using dot notation (e.g., "landing.hero.title")
 * Supports placeholder replacement (e.g., {name} in "Welcome back, {name}!")
 */
export function getContent(
  path: ContentPath,
  locale: Locale = 'en',
  replacements?: Record<string, string>
): string {
  const content = contentMap[locale] || contentMap.en;
  const keys = path.split(".");
  let value: ContentValue = content;

  for (const key of keys) {
    if (value && typeof value === "object" && key in value) {
      value = value[key] as ContentValue;
    } else {
      console.warn(`Content path not found: ${path} for locale: ${locale}`);
      return path; // Return the path itself as fallback
    }
  }

  if (typeof value !== "string") {
    console.warn(`Content at path ${path} is not a string:`, value);
    return path;
  }

  // Replace placeholders if provided
  if (replacements) {
    return value.replace(/\{(\w+)\}/g, (match, key) => {
      return replacements[key] || match;
    });
  }

  return value;
}

/**
 * Get the entire content object (useful for accessing multiple related values)
 */
export function getContentSection(path: ContentPath, locale: Locale = 'en'): Record<string, unknown> {
  const content = contentMap[locale] || contentMap.en;
  const keys = path.split(".");
  let value: ContentValue = content;

  for (const key of keys) {
    if (value && typeof value === "object" && key in value) {
      value = value[key] as ContentValue;
    } else {
      console.warn(`Content section not found: ${path} for locale: ${locale}`);
      return {};
    }
  }

  return value as Record<string, unknown>;
}

// Export content maps for direct access if needed
export { contentMap };
