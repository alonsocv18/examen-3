import { Component, Input, Output, EventEmitter } from '@angular/core';
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
  @Output() cardClick = new EventEmitter<void>();

  constructor(private router: Router) {}

  irACategoria() {
    if (this.disableNavigation) {
      // Si la navegación está deshabilitada, emitir evento
      this.cardClick.emit();
    } else {
      // Navegar normalmente
      this.router.navigate(['admin/categorias-productos/categoria', this.id, this.nombre]);
    }
  }
}
