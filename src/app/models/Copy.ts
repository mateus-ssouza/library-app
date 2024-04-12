import { Book } from "./Book";

export interface Copy {
  id: string;
  copyCode: string;
  available: boolean;
  book: Book;
}
