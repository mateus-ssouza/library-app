// Material Angular
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon'
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';

import { Component, ViewChild } from '@angular/core';
import { RouterModule } from '@angular/router';
import { User } from '../../../models/User';
import { UserService } from '../../../services/user.service';
import { ModalDeleteComponent } from '../../../components/modal-delete/modal-delete.component';

@Component({
  selector: 'app-user-page',
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
  templateUrl: './user-page.component.html',
  styleUrl: './user-page.component.css'
})
export class UserPageComponent {
  users: User[] = [];
  columns = ['Id', 'Nome', 'Cpf', 'Email', 'Acoes'];
  dataSource = new MatTableDataSource(this.users);
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(private userService: UserService, public dialog: MatDialog) {}

  ngOnInit(): void {
    try {
      this.userService.GetAll().subscribe((data) => {
        const dados = data;

        dados.map((item) => {
          item.birthday = new Date(item.birthday!).toLocaleDateString('pt-BR');
        });

        this.users = data;
        this.dataSource = new MatTableDataSource(this.users);
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
        service: this.userService
      }
    });
  }
}
