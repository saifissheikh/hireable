# Internationalization Implementation

## Overview
The Hireable application now supports multiple languages (English and Arabic) using a cookie-based locale detection system.

## Architecture

### 1. Content Management
- **Location**: `content/en.json` and `content/ar.json`
- All UI text is centralized in JSON files
- Hierarchical structure for easy navigation

### 2. Locale Detection
- **Location**: `lib/get-locale.ts`
- Server-side function that reads the `NEXT_LOCALE` cookie
- Defaults to English if no cookie is set

### 3. i18n Configuration
- **Location**: `lib/i18n-config.ts`
- Defines supported locales: `['en', 'ar']`
- Provides RTL detection for Arabic
- Exports `getDirection()` helper for dir attribute

### 4. Content Utility
- **Location**: `lib/content.ts`
- `getContent(path, locale?, replacements?)` - Retrieves content by path
- `getContentSection(path, locale?)` - Retrieves entire content sections
- Supports dynamic string replacements (e.g., user names)

### 5. Language Switcher
- **Location**: `components/language-switcher.tsx`
- Client component with dropdown menu
- Sets `NEXT_LOCALE` cookie and refreshes the page
- Displays current language flag

## Implementation Details

### Pages Updated
1. **app/layout.tsx**
   - Sets HTML `lang` and `dir` attributes
   - Uses `getLocale()` to detect current language

2. **app/page.tsx** (Landing Page)
   - All content uses `getContent(path, locale)`
   - Language switcher in header
   - Supports RTL layout

3. **app/dashboard/page.tsx**
   - All content localized
   - Language switcher in header
   - Dynamic content with replacements (e.g., welcome message with user name)

### How It Works

1. User visits the site
2. Server reads `NEXT_LOCALE` cookie (defaults to 'en')
3. All content is loaded from the appropriate JSON file
4. HTML is rendered with correct `lang` and `dir` attributes
5. User can switch languages using the dropdown
6. Cookie is set and page refreshes with new language

### RTL Support
- Arabic language automatically triggers RTL layout
- Direction is set on the root HTML element
- Navigation and UI elements respect RTL direction

## Adding New Languages

1. Create a new JSON file in `content/` (e.g., `fr.json`)
2. Add the locale to `lib/i18n-config.ts`:
   ```typescript
   locales: ['en', 'ar', 'fr'] as const
   ```
3. Update `lib/content.ts` to import the new content file
4. Add the locale to the language switcher options

## Testing

To test language switching:
1. Visit http://localhost:3000
2. Click the language switcher (globe icon) in the header
3. Select a language
4. Verify all text changes to the selected language
5. Check that RTL layout works for Arabic

## Cookie Details
- **Name**: `NEXT_LOCALE`
- **Values**: `'en'` or `'ar'`
- **Scope**: Entire domain
- **Expiration**: 365 days
