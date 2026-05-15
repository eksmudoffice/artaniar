# Welcome to your Dyad app

## Airtable env (Properties)

Tambahkan env berikut (contoh nilai **bukan** token asli):

```bash
VITE_AIRTABLE_BASE_ID=appN3f2wu4zvVguCz
VITE_AIRTABLE_TABLE_ID=tblPg2luHYVyKa3uj
VITE_AIRTABLE_TOKEN=pat_your_readonly_token_here
```

Lalu buka homepage dengan debug mode:

- `/?debug=1` untuk melihat **Airtable Status** dan tombol **Force reload Airtable**.

Catatan keamanan: karena ini aplikasi Vite/React client-side, token akan terlihat di browser. Gunakan token read-only dengan scope minimal, dan jangan taruh data sensitif di base.
