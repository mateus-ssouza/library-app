// Material Angular
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';

import { UserService } from './../../../services/user.service';
import { Component, OnInit } from '@angular/core';
import { User } from '../../../models/User';
import { ActivatedRoute, RouterModule } from '@angular/router';

@Component({
  selector: 'app-user-profile',
  standalone: true,
  imports: [RouterModule, MatButtonModule, MatCardModule, MatInputModule],
  templateUrl: './user-profile.component.html',
  styleUrl: './user-profile.component.css'
})
export class UserProfileComponent implements OnInit {
  user?: User;

  constructor(
    private userService: UserService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.userService.GetProfile().subscribe((data) => {
      const dados = data;
      dados.birthday = new Date(dados.birthday).toLocaleDateString('pt-BR');
      this.user = dados;
    });
  }
}
