import { Book } from './Book';
import { Status } from './enums/Status';

export interface Loan {
  id: string;
  loanDate: string;
  returnDate: string;
  status: Status;
  fines: number;
  user: string;
  books: Book[];
}
