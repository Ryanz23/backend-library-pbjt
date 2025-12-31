import { db } from "../../config/db";
import { CreateLoanDTO } from "./loan.model";
import { LoanRepository } from "./loan.repository";

export const LoanService = {
    async getAllLoans() {
        return await LoanRepository.findAll();
    },

    async borrowBook(data: CreateLoanDTO) {
        if (data.quantity <= 0) {
            throw new Error("Jumlah pinjaman tidak valid");
        }

        await db.begin(async (trx) => {
            // Kurangi stock buku
            const updated = await LoanRepository.reduceStock(
                trx,
                data.book_id,
                data.quantity
            );

            if (updated === 0) {
                throw new Error("Stock buku tidak mencukupi");
            }

            // Simpan data pinjaman
            await LoanRepository.create(trx, data);
        });

        return {
            message: "Peminjaman buku berhasil"
        }
    },

    async updateLoan(id: string, newQty: number) {
        const loan = await LoanRepository.findById(id);
        if (!loan) throw new Error("Data pinjaman tidak ditemukan");

        const diff = newQty - loan.quantity;

        if (diff > 0) {
            // Tambah pinjaman, kurangi stock buku
            await db`
              UPDATE books
              SET stock = stock - ${diff}
              WHERE id = ${loan.book_id} AND
              stock >= ${diff}
            `;
        } else {
            await db`
              UPDATE books
              SET stock = stock + ${Math.abs(diff)}
              WHERE id = ${loan.book_id}`
        }

        await LoanRepository.update(id, newQty);
        return {
            message: "Data pinjaman berhasil diperbarui"
        }
    },

    async deleteLoan(id: string) {
        const loan = await LoanRepository.findById(id);
        if (!loan) throw new Error("Data pinjaman tidak ditemukan");

        // Kembalikan stock buku
        await db`
          UPDATE books
          SET stock = stock + ${loan.quantity}
          WHERE id = ${loan.book_id}
        `;

        await LoanRepository.delete(id);
        return {
            message: "Data pinjaman berhasil dihapus"
        }
    }
}