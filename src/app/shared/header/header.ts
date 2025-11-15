import { Component } from '@angular/core';

@Component({
  selector: 'app-header',
  standalone: false,
  templateUrl: './header.html',
  styleUrl: './header.scss',
})
export class Header {
  visible: boolean = false;
  public navItems: any[] = [
    { label: 'Salones y Mesas', path: '/salones' },
    { label: 'Categorías y Productos', path: '/categorias' },
    { label: 'Clientes', path: '/clientes' },
  ];
}
