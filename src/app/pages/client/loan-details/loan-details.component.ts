// Material Angular
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatListModule } from '@angular/material/list';
import { MatDialog } from '@angular/material/dialog';

import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { Loan } from '../../../models/Loan';
import { LoanService } from '../../../services/loan.service';

@Component({
  selector: 'app-loan-details-client',
  standalone: true,
  imports: [RouterModule, MatButtonModule, MatCardModule, MatInputModule, MatListModule],
  templateUrl: './loan-details.component.html',
  styleUrl: './loan-details.component.css'
})
export class LoanDetailsClientComponent implements OnInit {
  loan?: Loan;
  id!: string;

  constructor(
    private loanService: LoanService,
    private route: ActivatedRoute,
    public dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get('id')!;
    this.loanService.GetByIdMyLoans(this.id).subscribe((data) => {
      const dados = data;
      dados.loanDate = new Date(dados.loanDate).toLocaleDateString('pt-BR');
      dados.returnDate = new Date(dados.returnDate).toLocaleDateString('pt-BR');
      this.loan = dados;
    });
  }
}
