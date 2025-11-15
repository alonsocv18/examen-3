import { Component } from '@angular/core';

@Component({
  selector: 'app-categorias-productos',
  standalone: false,
  templateUrl: './categorias-productos.html',
  styleUrl: './categorias-productos.scss',
})
export class CategoriasProductos {
  showModalCategoria: boolean = false;
  nuevaCategoria = { nombre: '' };

  crearCategoria() {
    if (this.nuevaCategoria.nombre.trim()) {
      // Aquí podrías agregar lógica para guardar la categoría
      // Por ahora solo cierra el modal y limpia el campo
      // Ejemplo: alert('Categoría creada: ' + this.nuevaCategoria.nombre);
      this.nuevaCategoria = { nombre: '' };
      this.showModalCategoria = false;
    }
  }
  categorias = [
    { id: 1, nombre: 'Bebidas', cantidad: 24 },
    { id: 2, nombre: 'Pollo a la brasa', cantidad: 21 },
    { id: 3, nombre: 'Combos Familiares', cantidad: 11 },
    { id: 4, nombre: 'Pollo Broaster', cantidad: 15 },
    { id: 5, nombre: 'Piezas de Pollo a la Brasa', cantidad: 5 },
    { id: 6, nombre: 'tryrty', cantidad: 0 },
    { id: 7, nombre: 'Prueba Academia EDIT', cantidad: 0 },
    { id: 8, nombre: 'Eldersito', cantidad: 0 },
  ];
}
