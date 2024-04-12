import { Component, OnInit } from '@angular/core';
import { Copy } from '../../../models/Copy';
import { CopyService } from '../../../services/copy.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormCopyComponent } from "../../../components/form-copy/form-copy.component";
import { SnackbarUtil } from '../../../utils/snackbar';

@Component({
    selector: 'app-copy-edit',
    standalone: true,
    templateUrl: './copy-edit.component.html',
    styleUrl: './copy-edit.component.css',
    imports: [FormCopyComponent]
})
export class CopyEditComponent implements OnInit {

  btnAcao: string = "Editar";
  txtTitulo: string = "Editar Cópia";
  copy!: Copy | null;
  idCopy!: string | null
  idBook!: string | null;

  constructor(
    private copyService: CopyService,
    private route: ActivatedRoute,
    private router: Router,
    private snackBar: SnackbarUtil
  ) {}

  ngOnInit(): void {
    this.idBook = this.route.snapshot.paramMap.get('idBook');
    this.idCopy = this.route.snapshot.paramMap.get('idCopy');

    this.copyService.GetById(this.idCopy!).subscribe((data) => {
      this.copy = data;
    });
  }

  updateCopy(copy: Copy) {
    this.copyService.Update(this.idCopy!, copy).subscribe(() => {
      this.router.navigate([`/copias/lista/${this.idBook}`]);
      this.snackBar.openSnackbar('Editado com sucesso!', 'green');
    });
  }
}
