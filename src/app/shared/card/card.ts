import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-card',
  standalone: false,
  templateUrl: './card.html',
  styleUrl: './card.scss',
})
export class Card {
  @Input() nombre: string = '';
  @Input() cantidad: number = 0;
  @Input() id: number = 0;

  constructor(private router: Router) {}

  irACategoria() {
    this.router.navigate(['admin/categorias-productos/categoria', this.id, this.nombre]);
  }
}
