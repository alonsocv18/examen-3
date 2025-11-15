import { Component } from '@angular/core';

@Component({
  selector: 'app-sidebar',
  standalone: false,
  templateUrl: './sidebar.html',
  styleUrl: './sidebar.scss',
})
export class Sidebar {
  visible: boolean = false;
  public navItems: any[] = [
    { label: 'Salones y Mesas', path: '/admin/salones-mesas' },
    { label: 'Categorías y Productos', path: '/admin/categorias-productos' },
    { label: 'Clientes', path: '/admin/clientes' },
  ];
}
