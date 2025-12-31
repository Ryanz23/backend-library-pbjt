export interface Loan {
    id: string;
    book_id: string;
    member_id: string;
    quantity: number;
    loan_date: string;
}

export interface CreateLoanDTO {
    id: string;
    book_id: string;
    member_id: string;
    quantity: number;
    loan_date: string;
}