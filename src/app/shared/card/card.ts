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
  @Input() id: string | number = 0;
  @Input() disableNavigation: boolean = false;

  constructor(private router: Router) {}

  irACategoria() {
    if (!this.disableNavigation) {
      this.router.navigate(['admin/categorias-productos/categoria', this.id, this.nombre]);
    }
  }
}
