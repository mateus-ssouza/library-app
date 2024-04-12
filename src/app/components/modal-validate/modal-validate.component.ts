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
  selector: 'app-modal-validate',
  standalone: true,
  imports: [MatButtonModule, MatDialogModule],
  templateUrl: './modal-validate.component.html',
  styleUrl: './modal-validate.component.css'
})
export class ModalValidateComponent implements OnInit {

  inputdata: any;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private ref: MatDialogRef<ModalValidateComponent>,
    private loanService: LoanService,
    private router: Router,
    private snackBar: SnackbarUtil
  ) {}

  ngOnInit(): void {
    this.inputdata = this.data;
  }

  validate() {
    this.loanService.Validate(this.inputdata.id).subscribe(() => {
      this.ref.close();
      this.router.navigate(['/emprestimos']);
      this.snackBar.openSnackbar('Validado com sucesso!', 'green');
    });
  }
}
