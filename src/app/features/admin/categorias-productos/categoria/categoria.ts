import { Component } from '@angular/core';
// import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-categoria',
  standalone: false,
  templateUrl: './categoria.html',
  styleUrl: './categoria.scss',
})
export class Categoria {
  showModalProducto: boolean = false;
  showModalEditar: boolean = false;
  productoSeleccionado: any = null;
  showModal: boolean = false;
  idCategoria: string = '2';
  nombreCategoria: string = 'Pollo a la brasa';
  // private categoriaIdOriginal: string = '';
  // private categoriaNombreOriginal: string = '';

  subcategoriasPorCategoria: { [key: string]: { id: number; nombre: string }[] } = {
    '1': [
      { id: 1, nombre: 'Bebidas Frias' },
      { id: 2, nombre: 'Bebidas Calientes' },
    ],
    '2': [{ id: 3, nombre: 'Extras' }],
    // Agrega más categorías y subcategorías según tu necesidad
  };

  get subcategorias() {
    return this.subcategoriasPorCategoria[this.idCategoria] || [];
  }

  productos = [
    { id: 1, nombre: '1/2 Pollo a la brasa', stock: 10, precio: 40, categoriaId: 2, activo: true },
    { id: 2, nombre: '1/4 Pollo a la brasa', stock: 19, precio: 15, categoriaId: 2, activo: false },
    {
      id: 3,
      nombre: '1 Pollo entero a la brasa',
      stock: 36,
      precio: 65.9,
      categoriaId: 2,
      activo: false,
    },
    { id: 4, nombre: '1/8 Pollo a la brasa', stock: 18, precio: 12, categoriaId: 2, activo: false },
    { id: 5, nombre: 'Parte Contramuslo', stock: 20, precio: 8, categoriaId: 2, activo: false },
    { id: 6, nombre: 'Parte Ala', stock: 15, precio: 7, categoriaId: 2, activo: false },
    { id: 6, nombre: 'Parte Ala', stock: 15, precio: 7, categoriaId: 1, activo: false },
  ];

  get productosFiltrados() {
    return this.productos.filter((p) => p.categoriaId === Number(this.idCategoria));
  }

  // constructor(private route: ActivatedRoute, private router: Router) {}

  // ngOnInit() {
  //   // Suscribirse solo para detectar cambios cuando vuelves con el navegador
  //   this.route.paramMap.subscribe((params) => {
  //     const id = params.get('id') || '';
  //     const nombre = params.get('nombre') || '';
  //     // Solo actualizar si los parámetros son de categoría (no de subcategoría)
  //     if (id !== '' && nombre !== '' && !params.has('id_subcategoria')) {
  //       this.idCategoria = id;
  //       this.nombreCategoria = nombre;
  //       this.categoriaIdOriginal = id;
  //       this.categoriaNombreOriginal = nombre;
  //     }
  //   });
  // }

  crearProducto(data: { nombre: string; stock: number; precio: number }) {
    if (data.nombre.trim()) {
      this.productos.push({
        id: this.productos.length + 1,
        nombre: data.nombre,
        stock: data.stock,
        precio: data.precio,
        categoriaId: Number(this.idCategoria),
        activo: true,
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
          stock: data.stock,
          precio: data.precio,
          categoriaId: this.productos[index].categoriaId,
          activo: this.productos[index].activo,
        };
      }
      this.showModalEditar = false;
      this.productoSeleccionado = null;
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

  irASubcategoria(id: number, nombre: string) {
    // this.router.navigate([
    //   '/admin/categorias-productos/categoria',
    //   this.categoriaIdOriginal,
    //   this.categoriaNombreOriginal,
    //   'subcategorias',
    //   id,
    //   nombre,
    // ]);
  }
}
