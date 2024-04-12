// Material Angular
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';

import { Component, ViewChild } from '@angular/core';
import { RouterModule } from '@angular/router';
import { Loan } from '../../../models/Loan';
import { LoanService } from '../../../services/loan.service';

@Component({
  selector: 'app-loan-page-client',
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
  templateUrl: './loan-page.component.html',
  styleUrl: './loan-page.component.css',
})
export class LoanPageClientComponent {
  loans: Loan[] = [];
  columns = [
    'Id',
    'Usuario',
    'DataDoEmprestimo',
    'DataDeRetorno',
    'Status',
    'Acoes',
  ];
  dataSource = new MatTableDataSource(this.loans);
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(private loanService: LoanService, public dialog: MatDialog) {}

  ngOnInit(): void {
    try {
      this.loanService.GetMyLoans().subscribe((data) => {
        const dados = data;
        this.loans = this.formatLoanDates(dados);
        this.dataSource = new MatTableDataSource(this.loans);
        this.dataSource.paginator = this.paginator;
      });
    } catch (error) {
      console.error(error);
    }
  }

  private formatLoanDates(loans: any[]): any[] {
    return loans.map((loan) => {
      return {
        ...loan,
        loanDate: new Date(loan.loanDate).toLocaleDateString('pt-BR'),
        returnDate: new Date(loan.returnDate).toLocaleDateString('pt-BR'),
      };
    });
  }

  search(event: Event) {
    const target = event.target as HTMLInputElement;
    const value = target.value.toLowerCase();

    this.dataSource.filter = value.trim().toLowerCase();
  }
}
