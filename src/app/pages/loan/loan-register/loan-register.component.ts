import { Component } from '@angular/core';
import { FormLoanComponent } from "../../../components/form-loan/form-loan.component";
import { Router } from '@angular/router';
import { LoanService } from '../../../services/loan.service';
import { Loan } from '../../../models/Loan';
import { DateUtil } from '../../../utils/date';
import { SnackbarUtil } from '../../../utils/snackbar';

@Component({
    selector: 'app-loan-register',
    standalone: true,
    templateUrl: './loan-register.component.html',
    styleUrl: './loan-register.component.css',
    imports: [FormLoanComponent]
})
export class LoanRegisterComponent {
  btnAcao: string = "Solicitar";
  txtTitulo: string = "Solicitação de Empréstimo";

  constructor(
    private loanService: LoanService,
    private router: Router,
    private snackBar: SnackbarUtil
  ) {}

  createLoan(loan: Loan) {

    const loanDate = DateUtil.stringToDate(loan.loanDate);
    const returnDate = DateUtil.stringToDate(loan.returnDate);

    const dataSend: Object = {
      loanDate: DateUtil.formatDateSend(loanDate!),
      returnDate: DateUtil.formatDateSend(returnDate!),
      books: loan.books
    }

    this.loanService.Add(dataSend).subscribe(() => {
      this.router.navigateByUrl('/emprestimos');
      this.snackBar.openSnackbar('Cadastrado com sucesso!', 'green');
    });
  }
}
