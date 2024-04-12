// Material Angular
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';

import { UserService } from './../../../services/user.service';
import { Component, OnInit } from '@angular/core';
import { User } from '../../../models/User';
import { ActivatedRoute, RouterModule } from '@angular/router';

@Component({
  selector: 'app-details',
  standalone: true,
  imports: [RouterModule, MatButtonModule, MatCardModule, MatInputModule],
  templateUrl: './details.component.html',
  styleUrl: './details.component.css'
})
export class DetailsComponent implements OnInit {
  user?: User;
  id!: string;

  constructor(
    private userService: UserService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get('id')!;
    this.userService.GetById(this.id).subscribe((data) => {
      const dados = data;
      dados.birthday = new Date(dados.birthday).toLocaleDateString('pt-BR');
      this.user = dados;
    });
  }
}
