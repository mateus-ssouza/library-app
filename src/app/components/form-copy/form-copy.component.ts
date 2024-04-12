// Angular Material
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';

import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { RouterModule } from '@angular/router';
import { Copy } from '../../models/Copy';

@Component({
  selector: 'app-form-copy',
  standalone: true,
  imports: [
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    MatCardModule,
    MatButtonModule,
    MatInputModule,
    MatSelectModule,
  ],
  templateUrl: './form-copy.component.html',
  styleUrl: './form-copy.component.css'
})
export class FormCopyComponent implements OnInit {
  @Output() onSubmit = new EventEmitter<Copy>();
  @Input() btnAcao!: string;
  @Input() txtTitulo!: string;
  @Input() idBook!: string | null;
  @Input() copyData: Copy | null = null;

  copyForm!: FormGroup;
  id!: FormControl;
  copyCode!: FormControl;

  errorInputCopyCode = '';

  constructor() {}

  ngOnInit(): void {

    this.id = new FormControl(this.copyData ? this.copyData.id : '');

    this.copyCode = new FormControl(this.copyData ? this.copyData.copyCode : '', [
      Validators.required,
      Validators.minLength(3),
      Validators.maxLength(45),
    ]);

    this.copyForm = new FormGroup({
      id: this.id,
      copyCode: this.copyCode
    });
  }

  submit() {
    this.onSubmit.emit(this.copyForm.value);
  }

  copyCodeErrorMessage() {
    if (this.copyCode.hasError('required')) {
      this.errorInputCopyCode = 'Código da cópia é necessário.';
    } else if (this.copyCode.hasError('minlength')) {
      this.errorInputCopyCode = 'Código da cópia deve ter pelo menos 3 caracteres.';
    } else if (this.copyCode.hasError('maxlength')) {
      this.errorInputCopyCode = 'Código da cópia deve ter no máximo 80 caracteres.';
    } else {
      this.errorInputCopyCode = '';
    }
  }
}
