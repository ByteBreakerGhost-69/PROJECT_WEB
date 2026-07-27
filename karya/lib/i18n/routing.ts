import { defineRouting } from 'next-intl/routing';

export const routing = defineRouting({
  locales: ['id', 'en', 'zh'],
  defaultLocale: 'id',
  localePrefix: 'always',
});

export type AppLocale = (typeof routing.locales)[number];
