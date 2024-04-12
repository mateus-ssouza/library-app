import { Component } from '@angular/core';
import { FormBookComponent } from '../../../components/form-book/form-book.component';
import { BookService } from '../../../services/book.service';
import { Router } from '@angular/router';
import { Book } from '../../../models/Book';
import { SnackbarUtil } from '../../../utils/snackbar';

@Component({
  selector: 'app-book-register',
  standalone: true,
  imports: [FormBookComponent],
  templateUrl: './book-register.component.html',
  styleUrl: './book-register.component.css'
})
export class BookRegisterComponent {
  btnAcao: string = "Cadastrar";
  txtTitulo: string = "Cadastro do Livro";

  constructor(
    private bookService: BookService,
    private router: Router,
    private snackBar: SnackbarUtil
  ) {}

  createBook(book: Book) {

    const dataSend: Object = {
      title: book.title,
      author: book.author,
      isbn: book.isbn
    }

    this.bookService.Add(dataSend).subscribe(() => {
      this.router.navigateByUrl('/livros');
      this.snackBar.openSnackbar('Cadastrado com sucesso!', 'green');
    });
  }
}
