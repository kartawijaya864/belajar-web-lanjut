import { Elysia } from "elysia";
import { mahasiswaRoute } from "./route/mahasiswa";

const app = new Elysia()
  .use(mahasiswaRoute)
  .listen(3001);

console.log(`Server running at http://${app.server?.hostname}:${app.server?.port}`);
