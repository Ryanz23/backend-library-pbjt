import "dotenv/config";
import { Elysia } from "elysia";
import { cors } from "@elysiajs/cors";
import { bookRoute } from "./modules/books/book.route";
import { memberRoute } from "./modules/members/member.route";
import { loanRoute } from "./modules/loans/loan.route";
import { adminRoute } from "./modules/admin/admin.route";
import { env } from "./config/env";
import swagger from "@elysiajs/swagger";

export const app = new Elysia()
  .use(
    swagger({
      path: "/pbjt-library-api",
      documentation: {
        info: {
          title: "PBJT Library API",
          version: "1.0.0",
          description:
            "REST API untuk sistem perpustakaan Politeknik Baja Tegal. Digunakan untuk mengelola data buku, member, admin, serta transaksi peminjaman dan pengembalian buku.",
        },
      },
    }),
  )
  .use(
    cors({
      origin: "http://localhost:5173",
      credentials: true,
      allowedHeaders: ["Content-Type", "Authorization"],
      methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    }),
  )
  .use(adminRoute)
  .use(bookRoute)
  .use(memberRoute)
  .use(loanRoute)

  .listen(env.app.port, () => {
    console.log(`Server running on http://localhost:${process.env.APP_PORT}`);
    console.log(
      `Swagger docs: http://localhost${process.env.APP_PORT}/pbjt-library-api`,
    );
  });
