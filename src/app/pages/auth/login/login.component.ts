// Angular Material
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';

import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { LoginModel } from '../../../models/LoginModel';
import { AuthService } from '../../../services/auth.service';
import { SnackbarComponent } from '../../../components/snackbar/snackbar.component';
import { SnackbarUtil } from '../../../utils/snackbar';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    MatCardModule,
    MatButtonModule,
    MatInputModule,
    MatIconModule,
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent implements OnInit {
  @Output() onSubmit = new EventEmitter<LoginModel>();
  @Input() loginData: LoginModel | null = null;

  loginForm!: FormGroup;
  email!: FormControl;
  password!: FormControl;
  errorInputEmail = '';
  errorInputPassword = '';

  constructor(
    private authService: AuthService,
    private route: ActivatedRoute,
    private router: Router,
    private snackBar: SnackbarUtil
  ) {}

  ngOnInit(): void {
    this.email = new FormControl(this.loginData ? this.loginData.email : '', [
      Validators.required,
      Validators.email,
    ]);

    this.password = new FormControl(
      this.loginData ? this.loginData.password : '',
      Validators.required
    );

    this.loginForm = new FormGroup({
      email: this.email,
      password: this.password,
    });
  }

  submit() {
    const data = this.loginForm.value;

    this.authService.Login(data).subscribe(
      (res) => {
        this.router.navigate(['/usuarios']);
        this.snackBar.openSnackbar('Logado com sucesso!', 'green')
      },
      (err) => {
        this.snackBar.openSnackbar('Erro no login!', 'red')
        console.error(err);
      }
    );
  }

  emailErrorMessage() {
    if (this.email.hasError('required')) {
      this.errorInputEmail = 'E-mail é necessário.';
    } else if (this.email.hasError('email')) {
      this.errorInputEmail = 'E-mail inválido.';
    } else {
      this.errorInputEmail = '';
    }
  }

  passwordErrorMessage() {
    if (this.email.hasError('required')) {
      this.errorInputPassword = 'Senha é necessária.';
    } else {
      this.errorInputPassword = '';
    }
  }
}
