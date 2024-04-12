// Material Angular
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';

import { Component, ViewChild } from '@angular/core';
import { Book } from '../../../models/Book';
import { BookService } from '../../../services/book.service';
import { RouterModule } from '@angular/router';
import { ModalDeleteComponent } from '../../../components/modal-delete/modal-delete.component';

@Component({
  selector: 'app-book-page',
  standalone: true,
  imports: [
    RouterModule,
    MatTableModule,
    MatCardModule,
    MatInputModule,
    MatButtonModule,
    MatDialogModule,
    MatIconModule,
    MatPaginatorModule,
  ],
  templateUrl: './book-page.component.html',
  styleUrl: './book-page.component.css',
})
export class BookPageComponent {
  books: Book[] = [];
  columns = ['Id', 'Titulo', 'Autor', 'ISBN', 'Acoes'];
  dataSource = new MatTableDataSource(this.books);
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(private bookService: BookService, public dialog: MatDialog) {}

  ngOnInit(): void {
    try {
      this.bookService.GetAll().subscribe((data) => {
        this.books = data;
        this.dataSource = new MatTableDataSource(this.books);
        this.dataSource.paginator = this.paginator;
      });
    } catch (error) {
      console.error(error);
    }
  }

  search(event: Event) {
    const target = event.target as HTMLInputElement;
    const value = target.value.toLowerCase();

    this.dataSource.filter = value.trim().toLowerCase();
  }

  openDialog(id: string) {
    this.dialog.open(ModalDeleteComponent, {
      data: {
        id: id,
        service: this.bookService,
      },
    });
  }
}
