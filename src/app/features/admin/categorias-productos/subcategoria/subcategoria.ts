import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-subcategoria',
  standalone: false,
  templateUrl: './subcategoria.html',
  styleUrl: './subcategoria.scss',
})
export class Subcategoria implements OnInit {
  showModalProducto: boolean = false;
  nuevoProducto = { nombre: '', stock: 0, precio: 0 };
  crearProducto() {
    if (this.nuevoProducto.nombre.trim()) {
      // Aquí podrías agregar lógica para guardar el producto
      // Por ahora solo cierra el modal y limpia el campo
      // Ejemplo: alert('Producto creado: ' + this.nuevoProducto.nombre);
      this.nuevoProducto = { nombre: '', stock: 0, precio: 0 };
      this.showModalProducto = false;
    }
  }
  showModal: boolean = false;
  nuevaSubcategoria = { nombre: '' };
  crearSubcategoria() {
    if (this.nuevaSubcategoria.nombre.trim()) {
      // Aquí podrías agregar lógica para guardar la subcategoría
      // Por ahora solo cierra el modal y limpia el campo
      // Ejemplo: alert('Subcategoría creada: ' + this.nuevaSubcategoria.nombre);
      this.nuevaSubcategoria.nombre = '';
      this.showModal = false;
    }
  }
  idSubcategoria: string = '';
  nombreSubcategoria: string = '';
  idCategoria: string = '';
  nombreCategoria: string = '';

  constructor(private route: ActivatedRoute) {}

  // testing
  productosPorSubcategoria: { [key: string]: { id: number; nombre: string; precio: number }[] } = {
    '3': [
      // id de subcategoría "Extras"
      { id: 1, nombre: 'Porción de papas', precio: 5 },
      { id: 2, nombre: 'Ensalada extra', precio: 4 },
      // ...
    ],
    // otras subcategorías...
  };

  get productos() {
    return this.productosPorSubcategoria[this.idSubcategoria] || [];
  }

  ngOnInit() {
    // Obtener todos los parámetros de la ruta actual
    this.route.params.subscribe((params) => {
      this.idSubcategoria = params['id_subcategoria'];
      this.nombreSubcategoria = params['nombre_subcategoria'];
      this.idCategoria = params['id'];
      this.nombreCategoria = params['nombre'];
    });
  }
}
