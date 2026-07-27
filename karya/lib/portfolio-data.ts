export interface PortfolioItem {
  slug: string;
  title: string;
  caption: string;
  color: 'sage' | 'terracotta' | 'gold';
  heightClass: string; // untuk variasi tinggi grid masonry
}

export const portfolioItems: PortfolioItem[] = [
  { slug: 'proyek-katalog', title: 'Katalog Produk Lokal', caption: 'UI hangat, checkout ringan', color: 'terracotta', heightClass: 'h-56' },
  { slug: 'proyek-jurnal', title: 'Jurnal Harian', caption: 'Menulis tanpa distraksi', color: 'sage', heightClass: 'h-72' },
  { slug: 'proyek-komunitas', title: 'Papan Komunitas', caption: 'Diskusi jadi lebih rapi', color: 'gold', heightClass: 'h-44' },
  { slug: 'proyek-resep', title: 'Buku Resep Keluarga', caption: 'Warisan yang tersimpan', color: 'sage', heightClass: 'h-64' },
  { slug: 'proyek-agenda', title: 'Agenda Studio Kecil', caption: 'Jadwal yang mudah dilihat', color: 'terracotta', heightClass: 'h-52' },
  { slug: 'proyek-galeri', title: 'Galeri Foto Keluarga', caption: 'Kenangan yang terjaga', color: 'gold', heightClass: 'h-80' },
];
