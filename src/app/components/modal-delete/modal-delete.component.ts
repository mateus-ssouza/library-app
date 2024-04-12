// Material Angular
import { MatButtonModule } from '@angular/material/button';
import {
  MAT_DIALOG_DATA,
  MatDialogModule,
  MatDialogRef,
} from '@angular/material/dialog';

import { Component, EventEmitter, Inject, OnInit, Output } from '@angular/core';
import { SnackbarUtil } from '../../utils/snackbar';

@Component({
  selector: 'app-modal-delete',
  standalone: true,
  imports: [MatButtonModule, MatDialogModule],
  templateUrl: './modal-delete.component.html',
  styleUrl: './modal-delete.component.css',
})
export class ModalDeleteComponent implements OnInit {
  @Output() deleteClick: EventEmitter<void> = new EventEmitter<void>();

  inputdata: any;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private ref: MatDialogRef<ModalDeleteComponent>,
    private snackBar: SnackbarUtil
  ) {}

  ngOnInit(): void {
    this.inputdata = this.data;
  }

  delete() {
    this.inputdata.service.Delete(this.inputdata.id).subscribe(() => {
      this.ref.close();
      this.snackBar.openSnackbar('Removido com sucesso!', 'red');
      setTimeout(() => {
        window.location.reload();
      }, 1000);
    });
  }
}
