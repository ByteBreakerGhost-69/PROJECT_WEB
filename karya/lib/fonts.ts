import { Playfair_Display, Nunito, Patrick_Hand, Press_Start_2P } from 'next/font/google';

// next/font/google men-download font saat build dan menyajikannya
// sebagai file lokal (self-hosted) — tidak ada request ke Google Fonts
// saat runtime, jadi aman untuk koneksi 3G/low-end sesuai brief.

export const fontDisplay = Playfair_Display({
  subsets: ['latin'],
  weight: ['600', '700'],
  variable: '--font-display',
  display: 'swap',
});

export const fontBody = Nunito({
  subsets: ['latin'],
  weight: ['400', '600', '700'],
  variable: '--font-body',
  display: 'swap',
});

export const fontHand = Patrick_Hand({
  subsets: ['latin'],
  weight: ['400'],
  variable: '--font-hand',
  display: 'swap',
});

export const fontPixel = Press_Start_2P({
  subsets: ['latin'],
  weight: ['400'],
  variable: '--font-pixel',
  display: 'swap',
});
