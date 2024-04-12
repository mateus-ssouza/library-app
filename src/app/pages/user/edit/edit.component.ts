// Angular Material
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';

import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { User } from '../../../models/User';
import { DateUtil } from '../../../utils/date';
import {
  FormControl,
  ReactiveFormsModule,
  FormsModule,
  FormGroup,
  Validators,
} from '@angular/forms';
import { UserService } from '../../../services/user.service';
import { CpfUtil } from '../../../utils/cpf';
import { SnackbarUtil } from '../../../utils/snackbar';

@Component({
  selector: 'app-edit',
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
  templateUrl: './edit.component.html',
  styleUrl: './edit.component.css',
})
export class UserEditComponent {
  @Output() onSubmit = new EventEmitter<User>();
  @Input() userData: User | null = null;

  userForm!: FormGroup;
  id!: FormControl;
  name!: FormControl;
  cpf!: FormControl;
  birthday!: FormControl;
  street!: FormControl;
  number!: FormControl;
  complement!: FormControl;
  city!: FormControl;
  state!: FormControl;

  errorInputName = '';
  errorInputCpf = '';
  errorInputBirthday = '';
  errorInputStreet = '';
  errorInputNumber = '';
  errorInputComplement = '';
  errorInputCity = '';
  errorInputState = '';

  constructor(
    private userService: UserService,
    private route: ActivatedRoute,
    private router: Router,
    private snackBar: SnackbarUtil
  ) {}

  ngOnInit(): void {
    try {
      const id = this.route.snapshot.paramMap.get('id');

      this.userService.GetById(id!).subscribe((data) => {
        this.userData = data;

        this.id = new FormControl(this.userData ? this.userData.id : '');

        this.name = new FormControl(this.userData ? this.userData.name : '', [
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(45),
        ]);

        this.cpf = new FormControl(this.userData ? this.userData.cpf : '', [
          Validators.required,
          Validators.minLength(11),
          Validators.maxLength(11),
          CpfUtil.validateCpf.bind(this)
        ]);

        this.birthday = new FormControl(
          this.userData
            ? new Date(this.userData.birthday).toLocaleDateString('pt-BR')
            : '',
          [Validators.required, DateUtil.validateDateFormat.bind(this)]
        );

        this.street = new FormControl(
          this.userData ? this.userData.address.street : '',
          [
            Validators.required,
            Validators.minLength(3),
            Validators.maxLength(60),
          ]
        );

        this.number = new FormControl(
          this.userData ? this.userData.address.number : '',
          [Validators.required, Validators.maxLength(20)]
        );

        (this.complement = new FormControl(
          this.userData ? this.userData.address.complement : '',
          [
            Validators.required,
            Validators.minLength(3),
            Validators.maxLength(60),
          ]
        )),
          (this.city = new FormControl(
            this.userData ? this.userData.address.city : '',
            [
              Validators.required,
              Validators.minLength(3),
              Validators.maxLength(40),
            ]
          ));

        this.state = new FormControl(
          this.userData ? this.userData.address.state : '',
          [
            Validators.required,
            Validators.minLength(2),
            Validators.maxLength(2),
          ]
        );

        this.userForm = new FormGroup({
          id: this.id,
          name: this.name,
          cpf: this.cpf,
          birthday: this.birthday,
          street: this.street,
          number: this.number,
          complement: this.complement,
          city: this.city,
          state: this.state,
        });
      });
    } catch (error) {
      console.error(error);
    }
  }

  submit() {
    const userData = this.userForm.value;
    const dateDirthday = DateUtil.stringToDate(userData.birthday);

    const userDataToSend = {
      name: userData.name,
      cpf: userData.cpf,
      birthday: DateUtil.formatDateSend(dateDirthday!),
      address: {
        street: userData.street,
        number: userData.number,
        complement: userData.complement,
        city: userData.city,
        state: userData.state,
      },
    };

    this.userService.Update(this.userData!.id, userDataToSend).subscribe(() => {
      this.router.navigate(['/usuarios']);
      this.snackBar.openSnackbar("Editado com sucesso!", "green")
    });
  }

  nameErrorMessage() {
    if (this.name.hasError('required')) {
      this.errorInputName = 'Nome é necessário.';
    } else if (this.name.hasError('minlength')) {
      this.errorInputName = 'Nome deve ter pelo menos 3 caracteres.';
    } else if (this.name.hasError('maxlength')) {
      this.errorInputName = 'Nome deve ter no máximo 45 caracteres.';
    } else {
      this.errorInputName = '';
    }
  }

  cpfErrorMessage() {
    if (this.cpf.hasError('required')) {
      this.errorInputCpf = 'CPF é necessário.';
    } else if (this.cpf.hasError('minlength')) {
      this.errorInputCpf = 'CPF deve ter 11 caracteres.';
    } else if (this.cpf.hasError('maxlength')) {
      this.errorInputCpf = 'CPF deve ter 11 caracteres.';
    } else if(this.cpf.hasError('invalidCpf')) {
      this.errorInputCpf = 'CPF deve possuir apenas caracteres númericos.';
    } else {
      this.errorInputCpf = '';
    }
  }

  birthdayErrorMessage() {
    if (this.birthday.hasError('required')) {
      this.errorInputBirthday = 'Data de aniversário é necessária.';
    } else if (this.birthday.hasError('invalidDateFormat')) {
      this.errorInputBirthday = 'Formato de data inválido.';
    } else {
      this.errorInputBirthday = '';
    }
  }

  streetErrorMessage() {
    if (this.street.hasError('required')) {
      this.errorInputStreet = 'Rua é necessária.';
    } else if (this.street.hasError('minlength')) {
      this.errorInputStreet = 'Rua deve ter pelo menos 3 caracteres.';
    } else if (this.street.hasError('maxlength')) {
      this.errorInputStreet = 'Rua deve ter no máximo 60 caracteres.';
    } else {
      this.errorInputStreet = '';
    }
  }

  numberErrorMessage() {
    if (this.number.hasError('required')) {
      this.errorInputNumber = 'Número é necessário.';
    } else if (this.number.hasError('maxlength')) {
      this.errorInputNumber = 'Número deve ter no máximo 20 caracteres.';
    } else {
      this.errorInputNumber = '';
    }
  }

  complementErrorMessage() {
    if (this.complement.hasError('required')) {
      this.errorInputComplement = 'Complemento é necessário.';
    } else if (this.complement.hasError('minlength')) {
      this.errorInputComplement = 'Complemento deve ter pelo menos 3 caracteres.';
    } else if (this.complement.hasError('maxlength')) {
      this.errorInputComplement = 'Complemento deve ter no máximo 60 caracteres.';
    } else {
      this.errorInputComplement = '';
    }
  }

  cityErrorMessage() {
    if (this.city.hasError('required')) {
      this.errorInputCity = 'Cidade é necessária.';
    } else if (this.city.hasError('minlength')) {
      this.errorInputCity = 'Cidade deve ter pelo menos 3 caracteres.';
    } else if (this.city.hasError('maxlength')) {
      this.errorInputCity = 'Cidade deve ter no máximo 40 caracteres.';
    } else {
      this.errorInputCity = '';
    }
  }

  stateErrorMessage() {
    if (this.state.hasError('required')) {
      this.errorInputState = 'Estado é necessário.';
    } else if (this.state.hasError('minlength')) {
      this.errorInputState = 'Estado deve ter 2 caracteres.';
    } else if (this.state.hasError('maxlength')) {
      this.errorInputState = 'Estado deve ter 2 caracteres.';
    } else {
      this.errorInputState = '';
    }
  }
}
