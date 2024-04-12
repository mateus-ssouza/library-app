import { Component, OnInit } from '@angular/core';
import { FormBookComponent } from '../../../components/form-book/form-book.component';
import { Book } from '../../../models/Book';
import { BookService } from '../../../services/book.service';
import { ActivatedRoute, Router } from '@angular/router';
import { SnackbarUtil } from '../../../utils/snackbar';

@Component({
  selector: 'app-book-edit',
  standalone: true,
  imports: [FormBookComponent],
  templateUrl: './book-edit.component.html',
  styleUrl: './book-edit.component.css'
})
export class BookEditComponent implements OnInit {

  btnAcao: string = "Editar";
  txtTitulo: string = "Editar Livro";
  book!: Book | null;
  id!: string | null

  constructor(
    private bookService: BookService,
    private route: ActivatedRoute,
    private router: Router,
    private snackBar: SnackbarUtil
  ) {}

  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get('id');
    this.bookService.GetById(this.id!).subscribe((data) => {
      this.book = data;
    });
  }

  updateBook(book: Book) {
    this.bookService.Update(this.id!, book).subscribe(() => {
      this.router.navigate(['/livros']);
      this.snackBar.openSnackbar('Editado com sucesso!', 'green');
    });
  }
}
