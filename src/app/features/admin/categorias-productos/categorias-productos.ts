import { Component } from '@angular/core';
// import { CategoriasService, Categoria } from '../../../core/services/categorias.service';

@Component({
  selector: 'app-categorias-productos',
  standalone: false,
  templateUrl: './categorias-productos.html',
  styleUrl: './categorias-productos.scss',
})
export class CategoriasProductos {
  showModalCategoria: boolean = false;
  // categorias: Categoria[] = [];
  // isLoading: boolean = false;

  // constructor(private categoriasService: CategoriasService) {}

  // ngOnInit() {
  //   this.cargarCategorias();
  // }

  // GET - Cargar todas las categorías
  // cargarCategorias() {
  //   this.isLoading = true;
  //   this.categoriasService.getCategorias().subscribe({
  //     next: (data) => {
  //       this.categorias = data;
  //       this.isLoading = false;
  //     },
  //     error: (error) => {
  //       console.error('Error al cargar categorías:', error);
  //       this.isLoading = false;
  //       // Aquí puedes mostrar un mensaje de error al usuario
  //     },
  //   });
  // }

  // POST - Crear nueva categoría
  crearCategoria(data: { nombre: string }) {
    // const nuevaCategoria: Categoria = {
    //   nombre: data.nombre,
    //   activo: true,
    // };

    // this.categoriasService.crearCategoria(nuevaCategoria).subscribe({
    //   next: (categoriaCreada) => {
    //     console.log('Categoría creada:', categoriaCreada);
    //     this.showModalCategoria = false;
    //     // Recargar la lista de categorías
    //     this.cargarCategorias();
    //     // O agregar directamente a la lista:
    //     // this.categorias.push(categoriaCreada);
    //   },
    //   error: (error) => {
    //     console.error('Error al crear categoría:', error);
    //     // Mostrar mensaje de error al usuario
    //   },
    // });
    this.categorias.push({ id: this.categorias.length + 1, nombre: data.nombre, cantidad: 0 });
    this.showModalCategoria = false;
  }

  // PUT - Actualizar categoría
  // actualizarCategoria(id: number, data: { nombre: string }) {
  //   const categoriaActualizada: Categoria = {
  //     nombre: data.nombre,
  //     activo: true,
  //   };

  //   this.categoriasService.actualizarCategoria(id, categoriaActualizada).subscribe({
  //     next: (categoria) => {
  //       console.log('Categoría actualizada:', categoria);
  //       // Actualizar la lista local
  //       const index = this.categorias.findIndex((c) => c.id === id);
  //       if (index !== -1) {
  //         this.categorias[index] = categoria;
  //       }
  //     },
  //     error: (error) => {
  //       console.error('Error al actualizar categoría:', error);
  //     },
  //   });
  // }

  // DELETE - Eliminar categoría
  // eliminarCategoria(id: number) {
  //   if (confirm('¿Estás seguro de eliminar esta categoría?')) {
  //     this.categoriasService.eliminarCategoria(id).subscribe({
  //       next: () => {
  //         console.log('Categoría eliminada');
  //         // Remover de la lista local
  //         this.categorias = this.categorias.filter((c) => c.id !== id);
  //       },
  //       error: (error) => {
  //         console.error('Error al eliminar categoría:', error);
  //       },
  //     });
  //   }
  // }

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
