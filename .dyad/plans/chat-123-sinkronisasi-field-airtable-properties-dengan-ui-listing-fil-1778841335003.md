---
title: "Sinkronisasi field Airtable (Properties) dengan UI Listing & Filter"
summary: "Menyesuaikan mapping field Airtable → model Property di app agar listing card, filter, dan sorting yang sudah ada bekerja konsisten dengan field aktual Airtable (termasuk TOPLIST, area, status/type select, budget range, dan ROI)."
chatId: "123"
createdAt: "2026-05-15T10:35:35.003Z"
updatedAt: "2026-05-15T10:35:35.003Z"
---

## Progress

- [x] Konfirmasi prioritas lokasi: `areaName` (jika ada) → fallback ke `area`.
- [x] Update `PropertyFields` agar mencakup field Airtable terbaru (termasuk `areaName`, `TOPLIST`, `createdAt`, dan alias typo `Ing` untuk longitude).
- [x] Update mapper `listAirtableProperties()`:
  - [x] Lokasi: `location.area = areaName ?? area ?? "Bali"`
  - [x] TOPLIST → `property.toplist`
  - [x] createdAt: `fields.createdAt` (jika valid) → fallback `record.createdTime`
  - [x] Koordinat: `lat` + (`lng` || `Ing`)
  - [x] Normalisasi enum string (type/status/purpose/water/view/ownership)
- [x] Fallback cover image di `PropertyCard` saat `images` kosong

## Notes
- Dropdown area masih menggunakan konstanta `AREAS` (opsi A). Jika nanti area Airtable lebih dinamis dan tidak match, kita bisa lanjutkan opsi B (generate opsi area dari data yang sudah di-load) tanpa mengubah layout.
