// Angular Material
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';

import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { RouterModule } from '@angular/router';
import { Loan } from '../../models/Loan';
import { DateUtil } from '../../utils/date';
import { CopyService } from '../../services/copy.service';
import { Copy } from '../../models/Copy';

@Component({
  selector: 'app-form-loan',
  standalone: true,
  imports: [
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    MatCardModule,
    MatButtonModule,
    MatInputModule,
    MatSelectModule,
    MatFormFieldModule,
  ],
  templateUrl: './form-loan.component.html',
  styleUrl: './form-loan.component.css',
})
export class FormLoanComponent implements OnInit {
  @Output() onSubmit = new EventEmitter<Loan>();
  @Input() btnAcao!: string;
  @Input() txtTitulo!: string;
  @Input() loanData: Loan | null = null;

  loanForm!: FormGroup;
  id!: FormControl;
  loanDate!: FormControl;
  returnDate!: FormControl;
  books!: FormControl;

  errorInputLoanDate = '';
  errorInputReturnDate = '';
  errorInputBookList = '';

  copiesList: Copy[] = [];
  filteredOptions: Copy[] = [];

  constructor(private copyService: CopyService) {
    this.filteredOptions = this.copiesList.slice();
  }

  ngOnInit(): void {
    try {
      this.copyService.GetAll().subscribe((data) => {
        this.copiesList = data;
        this.copiesList.sort((a, b) =>
          a.book.title.toLowerCase().localeCompare(b.book.title.toLowerCase())
        );
      });
    } catch (error) {
      console.error(error);
    }

    this.id = new FormControl(this.loanData ? this.loanData.id : '',);

    this.loanDate = new FormControl(this.loanData ? this.loanData.loanDate : '', [
      Validators.required,
      DateUtil.validateDateFormat.bind(this),
      DateUtil.validateDateTodayOrFuture.bind(this),
    ]);

    this.returnDate = new FormControl(this.loanData ? this.loanData.returnDate : '', [
      Validators.required,
      DateUtil.validateDateFormat.bind(this),
      DateUtil.validateDateFuture.bind(this),
      this.returnDateValidator.bind(this)
    ]);

    this.books = new FormControl(this.loanData ? this.loanData.books : '', [
      Validators.required
    ]);

    this.loanForm = new FormGroup({
      id: this.id,
      loanDate: this.loanDate,
      returnDate: this.returnDate,
      books: this.books
    });
  }

  submit() {
    this.onSubmit.emit(this.loanForm.value);
  }

  loanDateErrorMessage() {
    if (this.loanDate.hasError('required')) {
      this.errorInputLoanDate = 'A data de empréstimo é obrigatória.';
    } else if (this.loanDate.hasError('invalidFutureDate')) {
      this.errorInputLoanDate = 'A data de empréstimo deve ser hoje ou uma data futura.';
    } else if (this.loanDate.hasError('invalidDateFormat')) {
      this.errorInputLoanDate = 'A data de empréstimo com formato inválido (dd/mm/aaaa).';
    } else if (this.loanDate.hasError('invalidDate')) {
      this.errorInputLoanDate = 'A data de empréstimo é inválida.';
    } else {
      this.errorInputLoanDate = '';
    }
  }

  returnDateErrorMessage() {
    if (this.returnDate.hasError('required')) {
      this.errorInputReturnDate = 'A data de retorno é obrigatória.';
    } else if (this.returnDate.hasError('invalidFutureDate')) {
      this.errorInputReturnDate = 'A data de retorno deve ser uma data futura.';
    } else if (this.returnDate.hasError('invalidDateFormat')) {
      this.errorInputReturnDate = 'A data de retorno com formato inválido (dd/mm/aaaa).';
    } else if (this.returnDate.hasError('invalidDate')) {
      this.errorInputReturnDate = 'A data de retorno é inválida.';
    } else if (this.returnDate.hasError('invalidReturnDate')) {
      this.errorInputReturnDate = 'A data de retorno deve ser maior que a data de empréstimo.';
    } else {
      this.errorInputReturnDate = '';
    }
  }

  booksErrorMessage() {
    if (this.books.hasError('required')) {
      this.errorInputBookList = 'Selecione pelo menos uma cópia.';
    } else {
      this.errorInputBookList = '';
    }
  }

  private returnDateValidator(control: FormControl): { [key: string]: any } | null {
    const loanDateValue = this.loanDate.value;
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
