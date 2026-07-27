import createMiddleware from 'next-intl/middleware';
import { NextRequest, NextResponse } from 'next/server';
import { routing } from './lib/i18n/routing';

const intlMiddleware = createMiddleware(routing);

// Nama cookie session Supabase (default project ref bisa beda,
// sesuaikan kalau sudah connect ke project Supabase asli).
const SESSION_COOKIE = 'karya-auth-token';

export default function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Cek apakah request menuju /{locale}/dashboard
  const dashboardMatch = pathname.match(/^\/(id|en|zh)\/dashboard(\/.*)?$/);

  if (dashboardMatch) {
    const hasSession = request.cookies.has(SESSION_COOKIE);
    if (!hasSession) {
      const locale = dashboardMatch[1];
      const loginUrl = new URL(`/${locale}`, request.url);
      loginUrl.searchParams.set('auth', 'login');
      return NextResponse.redirect(loginUrl);
    }
  }

  return intlMiddleware(request);
}

export const config = {
  matcher: ['/((?!api|_next|_vercel|.*\\..*).*)'],
};
