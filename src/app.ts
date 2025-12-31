import "dotenv/config";
import { Elysia } from "elysia";
import { bookRoute } from "./modules/books/book.route";
import { memberRoute } from "./modules/members/member.route";
import { loanRoute } from "./modules/loans/loan.route";
import { env } from "./config/env";
import { adminRoute } from "./modules/admin/admin.route";

export const app = new Elysia()
  .use(adminRoute)
  .use(bookRoute)
  .use(memberRoute)
  .use(loanRoute)

  .listen(env.app.port, () => {
    console.log(`Server running on http://localhost:${process.env.APP_PORT}`);
  });
