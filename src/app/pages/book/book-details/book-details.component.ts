// Material Angular
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';

import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { Book } from '../../../models/Book';
import { BookService } from '../../../services/book.service';

@Component({
  selector: 'app-book-details',
  standalone: true,
  imports: [RouterModule, MatButtonModule, MatCardModule, MatInputModule],
  templateUrl: './book-details.component.html',
  styleUrl: './book-details.component.css'
})
export class BookDetailsComponent implements OnInit {
  book?: Book;
  id!: string;

  constructor(
    private bookService: BookService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get('id')!;
    this.bookService.GetById(this.id).subscribe((data) => {
      const dados = data;
      this.book = dados;
    });
  }
}
