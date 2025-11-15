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
    { span: 'Salones y Mesas', path: '/admin/salones-mesas' },
    { span: 'Categorías y Productos', path: '/admin/categorias-productos' },
    { span: 'Clientes', path: '/admin/clientes' },
  ];
}
