# ApotekKu - Sistem Pengecekan Stok Obat

Aplikasi React JS (single page) untuk mengecek dan mengelola stok obat apotek.
Tugas 1 – Minggu ke-4 (SUBCPMK 04-4-4).

- **Demo video:** _(tempel link YouTube / Google Drive di sini)_
- **Repositori:** _(tempel link GitHub/GitLab di sini, jika ada)_
- **Dokumentasi penggunaan AI:** lihat [`docs/AI_LOG.md`](docs/AI_LOG.md)

## Fitur
- Dashboard: total jenis obat, total stok (dalam Box, mis. 5 Strip + 5 Box = 5,5 Box), jumlah stok menipis & habis
- Status stok otomatis berdasarkan konversi satuan (1 box = 10 strip = 100 tablet):
  Menipis jika stok ≤ 200 tablet (= 20 strip = 2 box), Habis jika 0.
  Botol tidak bisa dikonversi, jadi batasnya sendiri: ≤ 20 botol
- Pencarian obat berdasarkan nama
- Tambah obat (validasi input + cegah nama ganda)
- Tambah / kurangi stok, hapus obat (dengan konfirmasi)
- Data tersimpan otomatis di localStorage
- Jam real-time di header, judul tab browser menampilkan jumlah stok bermasalah

## Menjalankan
```bash
npm install
npm run dev
```
Buka `http://localhost:5173`.

## Struktur Komponen & Tanggung Jawab
```
src/
├── App.jsx                  # pemilik state utama (medicines, search) + logika bisnis
├── main.jsx
├── App.css
├── utils/stock.js           # aturan status stok (satu sumber kebenaran)
└── components/
    ├── Header.jsx           # judul + jam (useState + useEffect dengan cleanup)
    ├── Dashboard.jsx        # kumpulan kartu statistik
    ├── StatCard.jsx         # satu kartu statistik (props: label, value, variant)
    ├── AddMedicineForm.jsx  # form tambah obat (state form & error sendiri)
    ├── SearchBar.jsx        # input pencarian (controlled component)
    ├── MedicineList.jsx     # daftar / empty state
    └── MedicineCard.jsx     # satu item obat + tombol aksi
```

## Pemetaan ke Kriteria Penilaian
| Indikator | Bobot | Implementasi |
|---|---|---|
| Struktur komponen & pemisahan tanggung jawab | 30% | 8 komponen fungsional, logika status dipisah ke `utils/stock.js`, state utama di `App` |
| State & props | 35% | `useState` untuk medicines, search, form, error; data & callback diturunkan lewat props (lifting state up) |
| Hooks | 25% | `useState` (4 tempat), `useEffect` (sinkron localStorage, judul tab, timer jam + cleanup) |
| Dokumentasi & demo | 10% | README ini, `docs/AI_LOG.md`, `docs/SKENARIO_DEMO.md`, video demo |

## Checklist Pengujian Lokal
- [ ] Aplikasi tampil dengan 4 data awal
- [ ] Tambah obat valid → muncul di daftar, dashboard berubah
- [ ] Tambah obat dengan field kosong / nama ganda → muncul pesan error
- [ ] Kartu 20 Box tertulis "= 200 Strip"; total stok 5 Strip + 5 Box = 5,5 Box
- [ ] 20 Strip → Menipis, 21 Strip → Aman, 2 Box → Menipis, 3 Box → Aman, 200 Tablet → Menipis
- [ ] Tombol + dan − mengubah stok & status (Aman/Menipis/Habis); − nonaktif saat stok 0
- [ ] Hapus obat → muncul konfirmasi
- [ ] Cari "para" → hanya Paracetamol; cari "xyz" → "Obat tidak ditemukan"
- [ ] Refresh halaman → data tetap ada (localStorage)
- [ ] Judul tab berubah `(n) ApotekKu...` sesuai jumlah stok menipis + habis
