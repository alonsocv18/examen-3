import { Component } from '@angular/core';
// import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-subcategoria',
  standalone: false,
  templateUrl: './subcategoria.html',
  styleUrl: './subcategoria.scss',
})
export class Subcategoria {
  showModalProducto: boolean = false;
  showModalEditar: boolean = false;
  productoSeleccionado: any = null;
  showModal: boolean = false;
  idSubcategoria: string = '3';
  nombreSubcategoria: string = 'Extras';
  idCategoria: string = '2';
  nombreCategoria: string = 'Pollo a la brasa';

  productos: { id: number; nombre: string; precio: number }[] = [
    { id: 1, nombre: 'Porción de papas', precio: 5 },
    { id: 2, nombre: 'Ensalada extra', precio: 4 },
    { id: 3, nombre: 'Arroz chaufa', precio: 8 },
    { id: 4, nombre: 'Gaseosa 500ml', precio: 3 },
  ];

  crearProducto(data: { nombre: string; stock: number; precio: number }) {
    if (data.nombre.trim()) {
      this.productos.push({
        id: this.productos.length + 1,
        nombre: data.nombre,
        precio: data.precio,
      });
      this.showModalProducto = false;
    }
  }

  actualizarProducto(data: { id?: number; nombre: string; stock: number; precio: number }) {
    if (data.id && data.nombre.trim()) {
      const index = this.productos.findIndex((p) => p.id === data.id);
      if (index !== -1) {
        this.productos[index] = {
          id: data.id,
          nombre: data.nombre,
          precio: data.precio,
        };
      }
      this.showModalEditar = false;
      this.productoSeleccionado = null;
    }
  }

  crearSubcategoria(data: { nombre: string }) {
    if (data.nombre.trim()) {
      // Aquí podrías agregar lógica para guardar la subcategoría
      // Por ahora solo cierra el modal
      // Ejemplo: alert('Subcategoría creada: ' + data.nombre);
      this.showModal = false;
    }
  }

  editarProducto(producto: any) {
    this.productoSeleccionado = { ...producto };
    this.showModalEditar = true;
  }

  eliminarProducto(producto: any) {
    if (confirm(`¿Estás seguro de eliminar ${producto.nombre}?`)) {
      this.productos = this.productos.filter((p) => p.id !== producto.id);
    }
  }
}
