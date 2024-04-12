import { Component, OnInit } from '@angular/core';
import { FormCopyComponent } from '../../../components/form-copy/form-copy.component';
import { CopyService } from '../../../services/copy.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Copy } from '../../../models/Copy';
import { SnackbarUtil } from '../../../utils/snackbar';

@Component({
  selector: 'app-copy-register',
  standalone: true,
  imports: [FormCopyComponent],
  templateUrl: './copy-register.component.html',
  styleUrl: './copy-register.component.css',
})
export class CopyRegisterComponent implements OnInit {
  btnAcao: string = 'Cadastrar';
  txtTitulo: string = 'Cadastro da Cópia';
  idBook!: string | null;

  constructor(
    private copyService: CopyService,
    private router: Router,
    private route: ActivatedRoute,
    private snackBar: SnackbarUtil
  ) {}

  ngOnInit(): void {
    this.idBook = this.route.snapshot.paramMap.get('bookId');
  }

  createCopy(copy: Copy) {
    const dataSend: Object = {
      copyCode: copy.copyCode,
    };

    this.copyService.AddCopy(dataSend, this.idBook!).subscribe(
      (res) => {
        this.router.navigateByUrl(`/copias/lista/${this.idBook}`);
        this.snackBar.openSnackbar('Cadastrado com sucesso!', 'green');
      },
      (err) => {
        if (err.status == 400) {
          this.snackBar.openSnackbar('Este código de cópia já está sendo utilizado!', 'red');
        }
      }
    );
  }
}
