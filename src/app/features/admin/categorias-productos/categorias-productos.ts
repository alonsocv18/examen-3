import { Component } from '@angular/core';

@Component({
  selector: 'app-categorias-productos',
  standalone: false,
  templateUrl: './categorias-productos.html',
  styleUrl: './categorias-productos.scss',
})
export class CategoriasProductos {
  categorias = [
    { nombre: 'Bebidas', cantidad: 24 },
    { nombre: 'Pollo a la brasa', cantidad: 21 },
    { nombre: 'Combos Familiares', cantidad: 11 },
    { nombre: 'Pollo Broaster', cantidad: 15 },
    { nombre: 'Piezas de Pollo a la Brasa', cantidad: 5 },
    { nombre: 'tryrty', cantidad: 0 },
    { nombre: 'Prueba Academia EDIT', cantidad: 0 },
  ];
}
