import { Injectable } from '@angular/core';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';
import { SnackbarComponent } from '../components/snackbar/snackbar.component';

@Injectable({
  providedIn: 'root',
})
export class SnackbarUtil{

  constructor(private snackBar: MatSnackBar) { }

  openSnackbar(message: string, color: string) {
    const horizontalPosition: MatSnackBarHorizontalPosition = 'center';
    const verticalPosition: MatSnackBarVerticalPosition = 'top';

    this.snackBar.openFromComponent(SnackbarComponent, {
      data: { message, color },
      horizontalPosition,
      verticalPosition,
      duration: 3000,
    });
  }
}
