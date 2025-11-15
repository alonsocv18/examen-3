import { Component } from '@angular/core';

@Component({
  selector: 'app-sidebar',
  standalone: false,
  templateUrl: './sidebar.html',
  styleUrl: './sidebar.scss',
})
export class Sidebar {
  public navItems: any[] = [
    { label: 'Salones y Mesas', path: '/salones' },
    { label: 'Categorías y Productos', path: '/categorias' },
    { label: 'Clientes', path: '/clientes' },
  ];
}
