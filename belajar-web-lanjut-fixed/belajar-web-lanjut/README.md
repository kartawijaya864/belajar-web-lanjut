# Belajar Web Lanjut — Endpoint HTTP

Contoh project TypeScript menggunakan Bun dan Elysia.js untuk latihan method HTTP.

## Endpoint

| Method | Endpoint | Kegunaan |
|---|---|---|
| GET | `/mahasiswa/:id` | Mengambil data mahasiswa |
| POST | `/mahasiswa/` | Menambahkan mahasiswa |
| PUT | `/mahasiswa/:id` | Mengganti seluruh data mahasiswa |
| PATCH | `/mahasiswa/:id` | Memperbarui sebagian data mahasiswa |
| DELETE | `/mahasiswa/:id` | Menghapus mahasiswa |
| CONNECT | `/mahasiswa/connect` | Demonstrasi route CONNECT |

Data disimpan di memori, jadi perubahan akan hilang saat server dimulai ulang.

## Menjalankan project

Pastikan Bun sudah terpasang, lalu jalankan:

```bash
bun install
bun run dev
```

Server berjalan di `http://localhost:3001`.

## Contoh pengujian

Untuk `PUT http://localhost:3001/mahasiswa/1`, body JSON:

```json
{
  "nama": "Peter Parker",
  "jurusan": "Sistem Informasi"
}
```

Untuk `PATCH http://localhost:3001/mahasiswa/1`, body JSON:

```json
{
  "jurusan": "Informatika"
}
```

Untuk `POST http://localhost:3001/mahasiswa/`, body JSON:

```json
{
  "id": "2",
  "nama": "Miles Morales",
  "jurusan": "Informatika"
}
```

**Catatan CONNECT:** Method CONNECT secara standar digunakan untuk membuat tunnel melalui proxy. Route ini hanya demonstrasi penerimaan method pada framework, bukan implementasi proxy/tunnel HTTP penuh. Pengujian CONNECT juga bergantung pada klien HTTP yang digunakan.
