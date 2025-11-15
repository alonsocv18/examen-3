import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CategoryService } from '../../../../core/services/category.service';
import { ProductService } from '../../../../core/services/product.service';
import { Category } from '../../../../core/interfaces/category.interface';
import { Product } from '../../../../core/interfaces/product.interface';

@Component({
  selector: 'app-categoria',
  standalone: false,
  templateUrl: './categoria.html',
  styleUrl: './categoria.scss',
})
export class Categoria implements OnInit {
  showModalProducto: boolean = false;
  showModalEditar: boolean = false;
  showModalSubcategoria: boolean = false;
  productoSeleccionado: Product | null = null;
  idCategoria: number = 0;
  nombreCategoria: string = '';

  subcategorias: Category[] = [];
  productos: Product[] = [];
  isLoadingSubcategorias = false;
  isLoadingProductos = false;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private categoryService: CategoryService,
    private productService: ProductService
  ) {}

  ngOnInit() {
    this.route.paramMap.subscribe((params) => {
      const id = params.get('id');
      const nombre = params.get('nombre');
      if (id && nombre) {
        this.idCategoria = Number(id);
        this.nombreCategoria = nombre;
        this.cargarSubcategorias();
        this.cargarProductos();
      }
    });
  }

  // Cargar subcategorías de esta categoría
  cargarSubcategorias() {
    this.isLoadingSubcategorias = true;
    // Traer todas las categorías y filtrar manualmente las que tienen como padre esta categoría
    this.categoryService.getCategories(undefined, undefined, 1, undefined).subscribe({
      next: (response) => {
        console.log('Respuesta subcategorías:', response);
        if (response.tipo === '1' && response.data) {
          // Filtrar subcategorías donde category_categoryid coincide con idCategoria
          this.subcategorias = response.data.filter((cat: Category) => {
            const parentId = cat.category_categoryid?.toString();
            const currentId = this.idCategoria.toString();
            return parentId === currentId;
          });
          console.log('Subcategorías filtradas:', this.subcategorias);
        } else {
          this.subcategorias = [];
        }
        this.isLoadingSubcategorias = false;
      },
      error: (error) => {
        console.error('Error al cargar subcategorías:', error);
        this.subcategorias = [];
        this.isLoadingSubcategorias = false;
      },
    });
  }

  // Cargar productos de esta categoría
  cargarProductos() {
    this.isLoadingProductos = true;
    this.productService.getProducts(undefined, this.idCategoria, 1).subscribe({
      next: (response) => {
        if (response.tipo === '1' && response.data) {
          // Filtrar productos que pertenecen a esta categoría
          this.productos = response.data.filter(
            (prod: Product) => prod.category_id?.toString() === this.idCategoria.toString()
          );
          console.log(
            `Productos filtrados para categoría ${this.idCategoria}:`,
            this.productos.length
          );
        } else {
          this.productos = [];
        }
        this.isLoadingProductos = false;
      },
      error: (error) => {
        console.error('Error al cargar productos:', error);
        this.productos = [];
        this.isLoadingProductos = false;
      },
    });
  }

  // POST - Crear nuevo producto
  crearProducto(data: {
    nombre: string;
    precio: number;
    descripcion: string;
    imagen: string;
    stock: number;
    necesitaPreparacion: boolean;
  }) {
    const storeId = parseInt(localStorage.getItem('store_id') || '1', 10);

    const nuevoProducto = {
      product_name: data.nombre,
      product_price: data.precio,
      product_description: data.descripcion,
      product_urlimage: data.imagen || 'default.png',
      product_state: '1',
      product_stock: data.stock,
      product_needpreparation: data.necesitaPreparacion ? '1' : '0',
      category_id: this.idCategoria,
      store_id: storeId,
    };

    this.productService.createProduct(nuevoProducto).subscribe({
      next: (response) => {
        console.log('Producto creado:', response);
        if (response.tipo === '1') {
          this.showModalProducto = false;
          this.cargarProductos();
        }
      },
      error: (error) => {
        console.error('Error al crear producto:', error);
      },
    });
  }

  // PUT - Actualizar producto
  actualizarProducto(data: {
    id?: number;
    nombre: string;
    precio: number;
    descripcion: string;
    imagen: string;
    stock: number;
    necesitaPreparacion: boolean;
  }) {
    if (!this.productoSeleccionado || !data.id) return;

    const productoActualizado = {
      product_id: data.id,
      product_name: data.nombre,
      product_price: data.precio,
      product_description: data.descripcion,
      product_urlimage: data.imagen || 'default.png',
      product_state: this.productoSeleccionado.product_state,
      product_stock: data.stock,
      product_needpreparation: data.necesitaPreparacion ? '1' : '0',
      category_id: this.productoSeleccionado.category_id,
      store_id: this.productoSeleccionado.store_id,
    };

    this.productService.updateProduct(productoActualizado).subscribe({
      next: (response) => {
        console.log('Producto actualizado:', response);
        if (response.tipo === '1') {
          this.showModalEditar = false;
          this.productoSeleccionado = null;
          this.cargarProductos();
        }
      },
      error: (error) => {
        console.error('Error al actualizar producto:', error);
      },
    });
  }

  // Abrir modal para editar producto
  editarProducto(producto: Product) {
    this.productoSeleccionado = { ...producto };
    this.showModalEditar = true;
  }

  // Cambiar estado del producto (no hay DELETE, solo cambio de estado)
  eliminarProducto(producto: Product) {
    if (confirm(`¿Desactivar ${producto.product_name}?`)) {
      const productoActualizado = {
        product_id: producto.product_id,
        product_name: producto.product_name,
        product_price: producto.product_price,
        product_description: producto.product_description,
        product_urlimage: producto.product_urlimage,
        product_state: '0', // Desactivar
        product_stock: producto.product_stock,
        product_needpreparation: producto.product_needpreparation,
        category_id: producto.category_id,
        store_id: producto.store_id,
      };

      this.productService.updateProduct(productoActualizado).subscribe({
        next: (response) => {
          console.log('Producto desactivado:', response);
          if (response.tipo === '1') {
            this.cargarProductos();
          }
        },
        error: (error) => {
          console.error('Error al desactivar producto:', error);
        },
      });
    }
  }

  // Crear subcategoría
  crearSubcategoria(data: { nombre: string; imagen: string }) {
    const storeId = parseInt(localStorage.getItem('store_id') || '1', 10);

    const nuevaSubcategoria = {
      category_name: data.nombre,
      category_categoryid: this.idCategoria, // Padre es la categoría actual
      category_urlimage: data.imagen || 'default.png',
      category_state: '1',
      store_id: storeId,
    };

    this.categoryService.createCategory(nuevaSubcategoria).subscribe({
      next: (response) => {
        console.log('Subcategoría creada:', response);
        if (response.tipo === '1') {
          this.showModalSubcategoria = false;
          this.cargarSubcategorias();
        }
      },
      error: (error) => {
        console.error('Error al crear subcategoría:', error);
      },
    });
  }

  // Navegar a subcategoría
  irASubcategoria(subcategoria: Category) {
    this.router.navigate([
      '/admin/categorias-productos/categoria',
      this.idCategoria,
      this.nombreCategoria,
      'subcategoria',
      subcategoria.category_id,
      subcategoria.category_name,
    ]);
  }

  // Helper para parseInt en el template
  parseInt(value: string): number {
    return parseInt(value, 10);
  }
}
