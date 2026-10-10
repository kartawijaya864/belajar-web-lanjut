import { Elysia } from "elysia";

type Mahasiswa = {
  id: string;
  nama: string;
  jurusan: string;
};

// Data contoh sementara (akan kembali seperti semula ketika server dimulai ulang).
const mahasiswa: Mahasiswa[] = [
  { id: "1", nama: "Peter Parker", jurusan: "Informatika" },
];

export const mahasiswaRoute = new Elysia({ prefix: "/mahasiswa" })
  // GET: mengambil data mahasiswa berdasarkan ID
  .get("/:id", ({ params, set }) => {
    const data = mahasiswa.find((item) => item.id === params.id);

    if (!data) {
      set.status = 404;
      return { message: "Mahasiswa tidak ditemukan" };
    }

    return { data };
  })

  // POST: menambahkan mahasiswa
  .post("/", ({ body, set }) => {
    const input = body as { id?: string; nama?: string; jurusan?: string };

    if (!input.id || !input.nama || !input.jurusan) {
      set.status = 400;
      return { message: "Field id, nama, dan jurusan wajib diisi" };
    }

    if (mahasiswa.some((item) => item.id === input.id)) {
      set.status = 409;
      return { message: "ID mahasiswa sudah digunakan" };
    }

    const data: Mahasiswa = {
      id: input.id,
      nama: input.nama,
      jurusan: input.jurusan,
    };

    mahasiswa.push(data);
    set.status = 201;
    return { message: "Mahasiswa berhasil ditambahkan", data };
  })

  // PUT: mengganti seluruh data mahasiswa
  .put("/:id", ({ params, body, set }) => {
    const index = mahasiswa.findIndex((item) => item.id === params.id);

    if (index === -1) {
      set.status = 404;
      return { message: "Mahasiswa tidak ditemukan" };
    }

    const input = body as { nama?: string; jurusan?: string };

    if (!input.nama || !input.jurusan) {
      set.status = 400;
      return { message: "Field nama dan jurusan wajib diisi untuk PUT" };
    }

    mahasiswa[index] = {
      id: params.id,
      nama: input.nama,
      jurusan: input.jurusan,
    };

    return { message: "Data mahasiswa berhasil diganti", data: mahasiswa[index] };
  })

  // PATCH: memperbarui sebagian data mahasiswa
  .patch("/:id", ({ params, body, set }) => {
    const data = mahasiswa.find((item) => item.id === params.id);

    if (!data) {
      set.status = 404;
      return { message: "Mahasiswa tidak ditemukan" };
    }

    const input = body as { nama?: string; jurusan?: string };

    if (input.nama !== undefined) data.nama = input.nama;
    if (input.jurusan !== undefined) data.jurusan = input.jurusan;

    return { message: "Data mahasiswa berhasil diperbarui", data };
  })

  // DELETE: menghapus mahasiswa
  .delete("/:id", ({ params, set }) => {
    const index = mahasiswa.findIndex((item) => item.id === params.id);

    if (index === -1) {
      set.status = 404;
      return { message: "Mahasiswa tidak ditemukan" };
    }

    const [deleted] = mahasiswa.splice(index, 1);
    return { message: "Mahasiswa berhasil dihapus", data: deleted };
  })

  // CONNECT: endpoint demonstrasi method CONNECT.
  // CONNECT biasanya dipakai untuk membangun tunnel melalui proxy,
  // bukan untuk operasi CRUD biasa.
  .route("CONNECT", "/connect", () => ({
    message: "Endpoint CONNECT diterima (demonstrasi)",
  }));
