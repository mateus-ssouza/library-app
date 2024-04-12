import { Component, Inject } from '@angular/core';
import { MAT_SNACK_BAR_DATA } from '@angular/material/snack-bar';

@Component({
  selector: 'app-snackbar',
  standalone: true,
  imports: [],
  templateUrl: './snackbar.component.html',
  styleUrl: './snackbar.component.css'
})
export class SnackbarComponent {
  message: string;
  color: string;

  constructor(@Inject(MAT_SNACK_BAR_DATA) public data: any) {
    this.message = data.message;
    this.color = data.color;
  }
}
