// Angular Material
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';

import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Book } from '../../models/Book';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-form-book',
  standalone: true,
  imports: [
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    MatCardModule,
    MatButtonModule,
    MatInputModule,
    MatSelectModule,
  ],
  templateUrl: './form-book.component.html',
  styleUrl: './form-book.component.css'
})
export class FormBookComponent implements OnInit {
  @Output() onSubmit = new EventEmitter<Book>();
  @Input() btnAcao!: string;
  @Input() txtTitulo!: string;
  @Input() bookData: Book | null = null;

  bookForm!: FormGroup;
  id!: FormControl;
  title!: FormControl;
  author!: FormControl;
  isbn!: FormControl;

  errorInputTitle = '';
  errorInputAuthor = '';
  errorInputIsbn = '';

  constructor() {}

  ngOnInit(): void {

    try {
      this.id = new FormControl(this.bookData ? this.bookData.id : '')

      this.title = new FormControl(this.bookData ? this.bookData.title : '', [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(80),
      ]);

      this.author = new FormControl(this.bookData ? this.bookData.author : '', [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(60),
      ]);

      this.isbn = new FormControl(
        this.bookData ? this.bookData.isbn : '',
        [
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(45),
        ]);

      this.bookForm = new FormGroup({
        id: this.id,
        title: this.title,
        author: this.author,
        isbn: this.isbn,
      });

    } catch (error) {
      console.error(error)
    }
  }

  submit() {
    this.onSubmit.emit(this.bookForm.value);
  }

  titleErrorMessage() {
    if (this.title.hasError('required')) {
      this.errorInputTitle = 'Título é necessário.';
    } else if (this.title.hasError('minlength')) {
      this.errorInputTitle = 'Título deve ter pelo menos 3 caracteres.';
    } else if (this.title.hasError('maxlength')) {
      this.errorInputTitle = 'Título deve ter no máximo 80 caracteres.';
    } else {
      this.errorInputTitle = '';
    }
  }

  authorErrorMessage() {
    if (this.author.hasError('required')) {
      this.errorInputAuthor = 'Autor é necessário.';
    } else if (this.author.hasError('minlength')) {
      this.errorInputAuthor = 'Autor deve ter pelo menos 3 caracteres.';
    } else if (this.author.hasError('maxlength')) {
      this.errorInputAuthor = 'Autor deve ter no máximo 60 caracteres.';
    } else {
      this.errorInputAuthor = '';
    }
  }

  isbnErrorMessage() {
    if (this.isbn.hasError('required')) {
      this.errorInputIsbn = 'ISBN é necessário.';
    } else if (this.isbn.hasError('minlength')) {
      this.errorInputIsbn = 'ISBN deve ter pelo menos 3 caracteres.';
    } else if (this.isbn.hasError('maxlength')) {
      this.errorInputIsbn = 'ISBN deve ter no máximo 45 caracteres.';
    } else {
      this.errorInputIsbn = '';
    }
  }
}
