// Material Angular
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

// Imports
import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { UserService } from '../../services/user.service';
import { User } from '../../models/User';
import { SnackbarUtil } from '../../utils/snackbar';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterModule, MatToolbarModule, MatButtonModule, MatIconModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css',
})
export class NavbarComponent {
  user?: User;

  constructor(
    private authService: AuthService,
    private userService: UserService,
    private router: Router,
    private snackBar: SnackbarUtil
  ) {}

  ngOnInit(): void {
    try {
      this.userService.GetProfile().subscribe((data) => {
        const dados = data;
        this.user = dados;
      });
    } catch (error) {
      console.error(error);
    }
  }

  profile() {
    if (this.user) {
      this.router.navigate(['meu-perfil']);
    }
  }

  logout() {
    const logout = this.authService.Logout();
    if (logout) {
      this.router.navigate(['/login']);
      this.snackBar.openSnackbar('Deslogado com sucesso!', 'green')
    }
    else {
      this.snackBar.openSnackbar('Erro na operação', 'red')
    }
  }
}
