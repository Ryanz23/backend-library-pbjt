import { db } from "../../config/db";
import { CreateLoanDTO, Loan } from "./loan.model";

export const LoanRepository = {
    async findAll(): Promise<Loan[]> {
        const loans = await db<Loan[]>`
          SELECT * FROM loans
          ORDER BY loan_date
        `;
        return loans;
    },

    async findById(id: string) {
        const result = await db`
          SELECT * FROM loans
          WHERE id = ${id}
        `;
        return result[0] ?? null;
    },

    async create(trx: any, loan: CreateLoanDTO): Promise<void> {
        await trx`
          INSERT INTO loans (
            id, book_id, member_id, quantity, loan_date
          ) VALUES (
            ${loan.id},
            ${loan.book_id},
            ${loan.member_id},
            ${loan.quantity},
            ${loan.loan_date}
         )
        `;
    },
    
    async reduceStock(trx: any, book_id: string, quantity: number) {
        const result = await trx`
          UPDATE books
          SET stock = stock - ${quantity}
          WHERE id = ${book_id}
            AND stock >= ${quantity}
        `;
        return result.count;
    },

    async update(id: string, quantity: number) {
        await db`
          UPDATE loans SET
            quantity = ${quantity}
          WHERE id = ${id}
        `;
    },

    async delete(id: string) {
        await db`
          DELETE FROM loans
          WHERE id = ${id}
        `;
    }
}