---
title: "Koneksi Airtable API untuk Properties (env baseID + tableID + token)"
summary: "Ubah integrasi Airtable yang sudah ada agar memakai tableID dari env, lalu pastikan halaman Index memakai data dari Airtable bila env terisi, dengan panel debug untuk memverifikasi koneksi."
chatId: "121"
createdAt: "2026-05-15T10:20:56.144Z"
updatedAt: "2026-05-15T10:20:56.144Z"
---

## Progress

- [x] 1. Audit existing Airtable integration
- [x] 2. Tambahkan env table id (`VITE_AIRTABLE_TABLE_ID`) + validasi
- [x] 3. Ganti pemanggilan table di `listAirtableProperties()` ke table ID
- [x] 4. Update status/debug (snapshot + card)
- [x] 5. Dokumentasi env (README)
- [ ] 6. Verifikasi end-to-end (manual)

## Overview
- Menghubungkan aplikasi React ke Airtable API untuk mengambil data **Properties**.
- Konfigurasi sensitif (base ID, table ID, bearer token) disimpan di env dan dipakai oleh service Airtable.
- Menjaga fallback ke data lokal bila env kosong atau request gagal.

## Notes
- Field wajib untuk record valid: `slug` dan `title`.
- Debug mode: buka `/?debug=1` lalu klik **Force reload Airtable**.
