// Material Angular
import { MatButtonModule } from '@angular/material/button';
import {
  MAT_DIALOG_DATA,
  MatDialogModule,
  MatDialogRef,
} from '@angular/material/dialog';

import { Component, Inject, OnInit } from '@angular/core';
import { LoanService } from '../../services/loan.service';
import { Router } from '@angular/router';
import { SnackbarUtil } from '../../utils/snackbar';

@Component({
  selector: 'app-modal-finalize',
  standalone: true,
  imports: [MatButtonModule, MatDialogModule],
  templateUrl: './modal-finalize.component.html',
  styleUrl: './modal-finalize.component.css'
})
export class ModalFinalizeComponent implements OnInit {

  inputdata: any;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private ref: MatDialogRef<ModalFinalizeComponent>,
    private loanService: LoanService,
    private router: Router,
    private snackBar: SnackbarUtil
  ) {}

  ngOnInit(): void {
    this.inputdata = this.data;
  }

  finalize() {
    this.loanService.Finalize(this.inputdata.id).subscribe(() => {
      this.ref.close();
      this.router.navigate(['/emprestimos']);
      this.snackBar.openSnackbar('Finalizado com sucesso!', 'green');
    });
  }
}
