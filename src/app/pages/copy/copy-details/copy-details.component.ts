// Material Angular
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';

import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { CopyService } from '../../../services/copy.service';
import { Copy } from '../../../models/Copy';

@Component({
  selector: 'app-copy-details',
  standalone: true,
  imports: [RouterModule, MatButtonModule, MatCardModule, MatInputModule],
  templateUrl: './copy-details.component.html',
  styleUrl: './copy-details.component.css'
})
export class CopyDetailsComponent implements OnInit {
  copy?: Copy;
  copyId!: string;
  bookId!: string | null;

  constructor(
    private copyService: CopyService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.bookId = this.route.snapshot.paramMap.get('bookId');
    this.copyId = this.route.snapshot.paramMap.get('copyId')!;

    this.copyService.GetById(this.copyId).subscribe((data) => {
      const dados = data;
      this.copy = dados;
    });
  }
}
