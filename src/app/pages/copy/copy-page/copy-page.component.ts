// Material Angular
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';

import { Component, ViewChild } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CopyService } from '../../../services/copy.service';
import { Book } from '../../../models/Book';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';

@Component({
  selector: 'app-copy-page',
  standalone: true,
  imports: [
    RouterModule,
    MatTableModule,
    MatCardModule,
    MatInputModule,
    MatButtonModule,
    MatDialogModule,
    MatIconModule,
    MatPaginatorModule
  ],
  templateUrl: './copy-page.component.html',
  styleUrl: './copy-page.component.css',
})
export class CopyPageComponent {
  books: Book[] = [];
  columns = ['Id', 'Titulo', 'Autor', 'ISBN', 'Acoes'];
  dataSource = new MatTableDataSource(this.books);
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(private copyService: CopyService, public dialog: MatDialog) {}

  ngOnInit(): void {
    try {
      this.copyService.GetAllBooksWithCopies().subscribe((data) => {
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
}
