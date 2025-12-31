export interface Book {
  id: string;
  title: string;
  category: string;
  author: string;
  publisher: string;
  year: number;
  stock: number;
}

export interface CreateBookDTO {
  id: string;
  title: string;
  category: string;
  author: string;
  publisher: string;
  year: number;
  stock: number;
}
