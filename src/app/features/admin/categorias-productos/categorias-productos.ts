import { Component, OnInit } from '@angular/core';
import { CategoryService } from '../../../core/services/category.service';
import { ProductService } from '../../../core/services/product.service';
import { Category } from '../../../core/interfaces/category.interface';

interface CategoryWithCount extends Category {
  productCount?: number;
}

@Component({
  selector: 'app-categorias-productos',
  standalone: false,
  templateUrl: './categorias-productos.html',
  styleUrl: './categorias-productos.scss',
})
export class CategoriasProductos implements OnInit {
  showModalCategoria: boolean = false;
  showModalEditar: boolean = false;
  categoriaEditar: Category | null = null;
  categorias: CategoryWithCount[] = [];
  isLoading: boolean = false;

  constructor(private categoryService: CategoryService, private productService: ProductService) {}

  ngOnInit() {
    this.cargarCategorias();
  }

  // GET - Cargar todas las categorías padre (category_categoryid = 0)
  cargarCategorias() {
    this.isLoading = true;
    // Traer todas las categorías con isGestion=1
    this.categoryService.getCategories(undefined, undefined, 1, undefined).subscribe({
      next: (response) => {
        console.log('Respuesta de categorías:', response);
        if (response.tipo === '1' && response.data) {
          // Filtrar solo categorías padre (category_categoryid === "0" o === 0)
          this.categorias = response.data
            .filter(
              (cat: Category) => cat.category_categoryid === '0' || cat.category_categoryid === 0
            )
            .map((cat: Category) => ({
              ...cat,
              productCount: parseInt(cat.cantidad_productos?.toString() || '0', 10),
            }));
          console.log('Categorías padre filtradas:', this.categorias);
        } else {
          this.categorias = [];
        }
        this.isLoading = false;
      },
      error: (error) => {
        console.error('Error al cargar categorías:', error);
        this.isLoading = false;
      },
    });
  }

  // POST - Crear nueva categoría
  crearCategoria(data: { nombre: string; imagen: string }) {
    const storeId = parseInt(localStorage.getItem('store_id') || '1', 10);

    const nuevaCategoria = {
      category_name: data.nombre,
      category_categoryid: 0, // 0 = categoría padre
      category_urlimage: data.imagen || 'default.png',
      category_state: '1', // 1 = activo
      store_id: storeId,
    };

    this.categoryService.createCategory(nuevaCategoria).subscribe({
      next: (response) => {
        console.log('Categoría creada:', response);
        if (response.tipo === '1') {
          this.showModalCategoria = false;
          this.cargarCategorias();
        }
      },
      error: (error) => {
        console.error('Error al crear categoría:', error);
      },
    });
  }

  // Abrir modal para edición
  abrirModalEditar(categoria: Category) {
    this.categoriaEditar = { ...categoria };
    this.showModalEditar = true;
  }

  // PUT - Actualizar categoría
  actualizarCategoria(data: { id?: number; nombre: string; imagen: string }) {
    if (!this.categoriaEditar || !data.id) return;

    const categoriaActualizada = {
      category_id: data.id,
      category_name: data.nombre,
      category_categoryid: this.categoriaEditar.category_categoryid,
      category_urlimage: data.imagen || 'default.png',
      category_state: this.categoriaEditar.category_state,
      store_id: this.categoriaEditar.store_id,
    };

    this.categoryService.updateCategory(categoriaActualizada).subscribe({
      next: (response) => {
        console.log('Categoría actualizada:', response);
        if (response.tipo === '1') {
          this.showModalEditar = false;
          this.categoriaEditar = null;
          this.cargarCategorias();
        }
      },
      error: (error) => {
        console.error('Error al actualizar categoría:', error);
      },
    });
  }

  // Cambiar estado de categoría
  cambiarEstadoCategoria(categoria: Category) {
    const nuevoEstado = categoria.category_state === '1' ? '0' : '1';

    const categoriaActualizada = {
      category_id: categoria.category_id,
      category_name: categoria.category_name,
      category_categoryid: categoria.category_categoryid,
      category_urlimage: categoria.category_urlimage,
      category_state: nuevoEstado,
      store_id: categoria.store_id,
    };

    this.categoryService.updateCategory(categoriaActualizada).subscribe({
      next: (response) => {
        console.log('Estado cambiado:', response);
        if (response.tipo === '1') {
          this.cargarCategorias();
        }
      },
      error: (error) => {
        console.error('Error al cambiar estado:', error);
      },
    });
  }

  // Helper para determinar si está activo
  esActivo(estado: string): boolean {
    return estado === '1';
  }
}
