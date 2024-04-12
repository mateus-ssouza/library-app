// Angular Material
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatFormFieldModule } from '@angular/material/form-field';

import {
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { AsyncPipe } from '@angular/common';
import { Copy } from '../../../models/Copy';
import { CopyService } from '../../../services/copy.service';
import { Book } from '../../../models/Book';
import { SnackbarUtil } from '../../../utils/snackbar';

@Component({
  selector: 'app-copy-register-homepage',
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
    AsyncPipe,
    MatAutocompleteModule,
  ],
  templateUrl: './copy-register-homepage.component.html',
  styleUrl: './copy-register-homepage.component.css',
})
export class CopyRegisterHomepageComponent implements OnInit {
  @Output() onSubmit = new EventEmitter<Copy>();
  @Input() copyData: Copy | null = null;

  copyForm!: FormGroup;
  copyCode!: FormControl;
  book!: FormControl;

  errorInputCopyCode = '';
  errorInputBook = '';

  @ViewChild('input')
  input!: ElementRef<HTMLInputElement>;
  options: Book[] = [];
  filteredOptions: Book[];

  constructor(
    private copyService: CopyService,
    private router: Router,
    private snackBar: SnackbarUtil
  ) {
    this.filteredOptions = this.options.slice();
  }

  ngOnInit(): void {
    try {
      this.copyService.GetAllBooksWithoutCopies().subscribe((data) => {
        this.options = data;
      });
    } catch (error) {
      console.error(error);
    }

    this.copyCode = new FormControl(this.copyData ? this.copyData.copyCode : '', [
      Validators.required,
      Validators.minLength(3),
      Validators.maxLength(45),
    ]);

    this.book = new FormControl(this.copyData ? this.copyData.book : '', [
      Validators.required
    ]);

    this.copyForm = new FormGroup({
      copyCode: this.copyCode,
      book: this.book
    });
  }

  filter(): void {
    const filterValue = this.input.nativeElement.value.toLowerCase();
    this.filteredOptions = this.options.filter((o) =>
      o.title.toLowerCase().includes(filterValue)
    );
  }

  displayFn(book: any): string {
    return book && book.title ? book.title : '';
  }

  submit() {
    const idBook = this.copyForm.value.book.id;
    const copy = {
      copyCode: this.copyForm.value.copyCode,
    };

    this.copyService.AddCopy(copy, idBook).subscribe(
      (res) => {
        this.router.navigateByUrl(`/copias/lista/${idBook}`);
        this.snackBar.openSnackbar('Cadastrado com sucesso!', 'green');
      },
      (err) => {
        if (err.status == 400) {
          this.snackBar.openSnackbar('Este código de cópia já está sendo utilizado!', 'red');
        }
      }
    );
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

  bookErrorMessage() {
    if (this.book.hasError('required')) {
      this.errorInputBook = 'Livro é necessário.';
    } else {
      this.errorInputBook = '';
    }
  }
}
