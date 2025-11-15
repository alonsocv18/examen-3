import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-categoria',
  standalone: false,
  templateUrl: './categoria.html',
  styleUrl: './categoria.scss',
})
export class Categoria implements OnInit {
  showModalProducto: boolean = false;
  crearProducto(data: { nombre: string; stock: number; precio: number }) {
    if (data.nombre.trim()) {
      // Aquí podrías agregar lógica para guardar el producto
      // Por ahora solo cierra el modal
      // Ejemplo: alert('Producto creado: ' + data.nombre);
      this.showModalProducto = false;
    }
  }
  showModal: boolean = false;
  idCategoria: string = '';
  nombreCategoria: string = '';
  private categoriaIdOriginal: string = '';
  private categoriaNombreOriginal: string = '';

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

  // Simulación de productos por categoría
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

  constructor(private route: ActivatedRoute, private router: Router) {}

  ngOnInit() {
    // Suscribirse solo para detectar cambios cuando vuelves con el navegador
    this.route.paramMap.subscribe((params) => {
      const id = params.get('id') || '';
      const nombre = params.get('nombre') || '';
      // Solo actualizar si los parámetros son de categoría (no de subcategoría)
      if (id !== '' && nombre !== '' && !params.has('id_subcategoria')) {
        this.idCategoria = id;
        this.nombreCategoria = nombre;
        this.categoriaIdOriginal = id;
        this.categoriaNombreOriginal = nombre;
      }
    });
  }

  irASubcategoria(id: number, nombre: string) {
    this.router.navigate([
      '/admin/categorias-productos/categoria',
      this.categoriaIdOriginal,
      this.categoriaNombreOriginal,
      'subcategorias',
      id,
      nombre,
    ]);
  }
}
