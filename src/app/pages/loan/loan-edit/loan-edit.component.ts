// Angular Material
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';

import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { Loan } from '../../../models/Loan';
import { DateUtil } from '../../../utils/date';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { LoanService } from '../../../services/loan.service';
import { SnackbarUtil } from '../../../utils/snackbar';

@Component({
  selector: 'app-loan-edit',
  standalone: true,
  imports: [
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatCardModule,
    MatInputModule,
    MatSelectModule,
  ],
  templateUrl: './loan-edit.component.html',
  styleUrl: './loan-edit.component.css',
})
export class LoanEditComponent {
  @Output() onSubmit = new EventEmitter<Loan>();
  @Input() loanData: Loan | null = null;

  loanDateEdit!: string;

  loanForm!: FormGroup;
  id!: FormControl;
  returnDate!: FormControl;

  errorInputReturnDate = '';

  constructor(
    private loanService: LoanService,
    private route: ActivatedRoute,
    private router: Router,
    private snackBar: SnackbarUtil
  ) {}

  ngOnInit(): void {
    try {
      const id = this.route.snapshot.paramMap.get('id');
      this.loanService.GetById(id!).subscribe((data) => {
        this.loanData = data;
        this.loanDateEdit = new Date(this.loanData.loanDate).toLocaleDateString(
          'pt-BR'
        );

        this.id = new FormControl(this.loanData ? this.loanData.id : '');

        this.returnDate = new FormControl(
          this.loanData
            ? new Date(this.loanData.returnDate).toLocaleDateString('pt-BR')
            : '',
          [
            Validators.required,
            DateUtil.validateDateFormat.bind(this),
            DateUtil.validateDateFuture.bind(this),
            this.returnDateValidator.bind(this)
          ]
        );

        this.loanForm = new FormGroup({
          id: this.id,
          returnDate: this.returnDate,
        });

      });
    } catch (error) {
      console.error(error);
    }
  }

  submit() {
    const loanData = this.loanForm.value;
    const returnDate = DateUtil.stringToDate(loanData.returnDate);

    const loanDataToSend = {
      returnDate: returnDate,
    };

    this.loanService.Update(this.loanData!.id, loanDataToSend).subscribe(() => {
      this.router.navigate(['/emprestimos']);
      this.snackBar.openSnackbar('Editado com sucesso!', 'green');
    });
  }

  returnDateErrorMessage() {
    if (this.returnDate.hasError('required')) {
      this.errorInputReturnDate = 'A data de retorno é obrigatória.';
    } else if (this.returnDate.hasError('invalidDateFormat')) {
      this.errorInputReturnDate =
        'A data de retorno com formato inválido (dd/mm/aaaa).';
    } else if (this.returnDate.hasError('invalidDate')) {
      this.errorInputReturnDate = 'A data de retorno é inválida.';
    } else if (this.returnDate.hasError('invalidFutureDate')) {
      this.errorInputReturnDate = 'A data de retorno deve ser uma data futura.';
    } else if (this.returnDate.hasError('invalidReturnDate')) {
      this.errorInputReturnDate = 'A data de retorno deve ser maior que a data de empréstimo.';
    } else {
      this.errorInputReturnDate = '';
    }
  }

  private returnDateValidator(control: FormControl): { [key: string]: any } | null {
    const loanDateValue = this.loanDateEdit;
    const returnDateValue = control.value;

    if (loanDateValue && returnDateValue) {

      const pr = returnDateValue.split('/');
      const dr = parseInt(pr[0], 10);
      const mr = parseInt(pr[1], 10) - 1;
      const yr = parseInt(pr[2], 10);

      const pl = loanDateValue.split('/');
      const dl = parseInt(pl[0], 10);
      const ml = parseInt(pl[1], 10) - 1;
      const yl= parseInt(pl[2], 10);

      const loanDate = new Date(dl, ml, yl);
      const returnDate = new Date(dr, mr, yr);

      if (returnDate <= loanDate) {
        return { 'invalidReturnDate': true };
      }
    }

    return null;
  }
}
