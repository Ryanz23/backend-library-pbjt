import { Elysia, t } from "elysia";
import { LoanService } from "./loan.service";
import { CreateLoanDTO } from "./loan.model";

export const loanRoute = new Elysia({ prefix: "/loans" })
  // GET /loans
  .get("/", async () => {
    const loans = await LoanService.getAllLoans();
    return Response.json(loans);
  })

  // POST /loans
  .post(
    "/",
    async ({ body }) => {
      return await LoanService.borrowBook(body as CreateLoanDTO);
    },
    {
      body: t.Object({
        id: t.String(),
        book_id: t.String(),
        member_id: t.String(),
        quantity: t.Number({ minimum: 1 }),
        loan_date: t.String()
      })
    }
  )

  // PUT /loans/:id
  .put(
    "/:id",
    async ({ params, body }) => {
      return Response.json(
        await LoanService.updateLoan(params.id, (body as { quantity: number }).quantity)
      );
    },
    {
      body: t.Object({
        quantity: t.Number({ minimum: 1 })
      })
    }
  )

  // DELETE /loans/:id
  .delete("/:id", async ({ params }) => {
    return Response.json(
      await LoanService.deleteLoan(params.id)
    );
  });