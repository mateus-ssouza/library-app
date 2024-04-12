// Material Angular
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';

import { Component, ViewChild } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { ModalDeleteComponent } from '../../../components/modal-delete/modal-delete.component';
import { CopyService } from '../../../services/copy.service';
import { Copy } from '../../../models/Copy';


@Component({
  selector: 'app-copy-list',
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
  templateUrl: './copy-list.component.html',
  styleUrl: './copy-list.component.css',
})
export class CopyListComponent {
  copies: Copy[] = [];
  bookId!: string | null;
  columns = ['Id', 'Titulo', 'CodCopia', 'Disponibilidade', 'Acoes'];
  dataSource = new MatTableDataSource(this.copies);
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(
    private copyService: CopyService,
    public dialog: MatDialog,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    try {
      this.bookId = this.route.snapshot.paramMap.get('bookId');

      this.copyService.GetByBookId(this.bookId!).subscribe((data) => {
        this.copies = data;
        this.dataSource = new MatTableDataSource(this.copies);
        this.dataSource.paginator = this.paginator;
      });
    } catch (error) {
      console.error(error);
    }

    setTimeout(() => {
      if (this.copies.length === 0) {
        this.router.navigate(['/copias']);
      }
    }, 200)
  }

  search(event: Event) {
    const target = event.target as HTMLInputElement;
    const value = target.value.toLowerCase();

    this.dataSource.filter = value.trim().toLowerCase();
  }

  openDialog(id: string) {
    this.dialog
      .open(ModalDeleteComponent, {
        data: {
          id: id,
          service: this.copyService,
        },
      })
  }
}
