# Karya

Landing page + member dashboard dengan nuansa "ruang kerja kreatif yang hangat".
Dibangun dengan Next.js 14 (App Router), Tailwind CSS, GSAP + Framer Motion,
next-intl (ID/EN/ZH), dan Supabase Auth opsional (fallback localStorage).

## Menjalankan secara lokal

```bash
npm install
cp .env.example .env.local   # opsional, isi kalau mau pakai Supabase asli
npm run dev
```

Buka `http://localhost:3000` — otomatis redirect ke `/id`.

## Struktur folder

```
app/
  [locale]/
    layout.tsx          # navbar, mascot, cursor, easter egg, i18n provider
    page.tsx             # landing page (hero, portfolio, blog, contact)
    blog/page.tsx         # daftar artikel + search & filter
    blog/[slug]/page.tsx  # detail artikel (MDX + red pen annotations)
    portfolio/page.tsx    # galeri penuh + dissolve transition
    dashboard/page.tsx    # member dashboard (dilindungi middleware)
  sitemap.ts / robots.ts
components/              # semua UI components
content/blog/*.mdx        # 3 artikel contoh
lib/
  i18n/                   # routing, navigation, request config next-intl
  blog.ts                 # baca & parse file MDX
  supabase.ts             # client Supabase (opsional)
  local-auth.ts           # fallback auth berbasis localStorage
  fonts.ts                # next/font (self-hosted, hindari FOUT di 3G)
  portfolio-data.ts        # data contoh proyek portofolio
messages/{id,en,zh}.json  # string terjemahan
middleware.ts             # i18n routing + proteksi /dashboard
```

## Yang sudah berfungsi (bukan sekadar mockup)

- **Hero**: typewriter headline + mini task manager drag & drop (localStorage), di-lazy-load setelah `window.load`.
- **Mascot Kiko**: mata mengikuti kursor/touch, animasi "tertiup angin" saat scroll cepat, tidur setelah 10 detik idle, speech bubble fun fact acak, pakai topi koboi saat easter egg aktif.
- **Easter egg**: ketik `KARYA` di halaman mana pun → mode retro 8-bit 5 detik.
- **Portfolio**: grid masonry non-simetris, hover lift + caption ala polaroid, halaman penuh dengan dissolve transition antar proyek.
- **Blog**: listing dengan search + filter kategori, detail artikel dari MDX dengan "red pen annotation" saat hover paragraf, tipografi nyaman baca (max-width 720px, line-height 1.8).
- **Contact**: form berbentuk amplop yang "terbuka" (flip animation) + captcha sederhana.
- **Auth**: modal login/register. Kalau env Supabase kosong, otomatis fallback ke simulasi localStorage dengan validasi ketat (email format, password ≥ 8 karakter, cek email duplikat).
- **Dashboard**: dilindungi `middleware.ts` (redirect ke landing + parameter `?auth=login` kalau belum login), menampilkan task tersimpan & reading progress (heuristik sederhana).
- **i18n**: 3 bahasa penuh (navbar, hero, blog, contact, auth, dashboard, mascot fun facts). Konten blog/portfolio sengaja tidak auto-translate, sesuai brief.
- **Aksesibilitas & performa**: `prefers-reduced-motion` dihormati di semua animasi (typewriter, mascot, scroll), kontras warna dicek terhadap AA, font di-self-host lewat `next/font`, task manager di-code-split.
- **SEO**: metadata per halaman, `sitemap.ts` otomatis mencakup semua locale + slug blog, `robots.ts`.

## Yang masih perlu dikerjakan / disesuaikan sebelum production

1. **Supabase asli**: skema tabel user & RLS policy belum dibuat — saat ini hanya ada client wrapper. Isi `.env.local` lalu buat tabel `profiles` kalau mau data lintas-device (bukan localStorage).
2. **Kirim email dari form kontak**: `ContactEnvelope.tsx` saat ini hanya menampilkan pesan sukses secara lokal. Perlu API route (`app/api/contact/route.ts`) yang connect ke email service (Resend/SendGrid) atau Supabase table.
3. **Gambar asli**: portofolio & cover blog sekarang pakai blok warna solid sebagai placeholder (supaya bundle tetap ringan tanpa aset gambar). Ganti dengan `next/image` + file `.webp` asli saat sudah ada.
4. **GSAP ScrollTrigger**: dependency sudah terpasang, tapi reveal-on-scroll section saat ini masih pakai CSS/Tailwind transition sederhana. Kalau mau efek stagger scroll yang lebih kompleks sesuai brief poin 5A, ini titik yang perlu ditambah.
5. **Testing low-end device**: perlu dicek manual di Chrome DevTools dengan CPU throttle 4x + Slow 3G sesuai brief, dan diukur bundle size aktual (`next build` lalu cek `.next/analyze` kalau perlu).
6. **Kontras warna**: sudah dipilih supaya mendekati AA, tapi ada baiknya divalidasi ulang pakai tool seperti axe atau Lighthouse setelah styling final.

## Catatan teknis

- Auth cookie (`karya-auth-token`) di mode demo hanya menyimpan email dalam bentuk plain text di cookie — ini **bukan** untuk production, cuma cukup untuk `middleware.ts` mendeteksi status login pada prototype/demo.
- Semua warna & font mengikuti spesifikasi brief persis (Playfair Display, Nunito, Patrick Hand, Press Start 2P; cream/charcoal/terracotta/sage/gold).
