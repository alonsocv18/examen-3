import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService } from '../../../../core/services/product.service';
import { Product } from '../../../../core/interfaces/product.interface';

@Component({
  selector: 'app-subcategoria',
  standalone: false,
  templateUrl: './subcategoria.html',
  styleUrl: './subcategoria.scss',
})
export class Subcategoria implements OnInit {
  showModalProducto: boolean = false;
  showModalEditar: boolean = false;
  productoSeleccionado: Product | null = null;
  idSubcategoria: number = 0;
  nombreSubcategoria: string = '';
  idCategoria: number = 0;
  nombreCategoria: string = '';

  productos: Product[] = [];
  isLoadingProductos = false;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private productService: ProductService
  ) {}

  ngOnInit() {
    this.route.paramMap.subscribe((params) => {
      const idCat = params.get('id');
      const nombreCat = params.get('nombre');
      const idSub = params.get('id_subcategoria');
      const nombreSub = params.get('nombre_subcategoria');

      if (idCat && nombreCat && idSub && nombreSub) {
        this.idCategoria = Number(idCat);
        this.nombreCategoria = nombreCat;
        this.idSubcategoria = Number(idSub);
        this.nombreSubcategoria = nombreSub;
        this.cargarProductos();
      }
    });
  }

  // Cargar productos de esta subcategoría
  cargarProductos() {
    this.isLoadingProductos = true;
    // Usar idSubcategoria como category_id para filtrar productos de esta subcategoría
    this.productService.getProducts(undefined, this.idSubcategoria, 1).subscribe({
      next: (response) => {
        if (response.tipo === '1' && response.data) {
          // Filtrar productos que pertenecen a esta subcategoría
          this.productos = response.data.filter(
            (prod: Product) => prod.category_id?.toString() === this.idSubcategoria.toString()
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
      category_id: this.idSubcategoria,
      store_id: storeId,
    };

    this.productService.createProduct(nuevoProducto).subscribe({
      next: (response) => {
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

  // Cambiar estado del producto
  eliminarProducto(producto: Product) {
    if (confirm(`¿Desactivar ${producto.product_name}?`)) {
      const productoActualizado = {
        product_id: producto.product_id,
        product_name: producto.product_name,
        product_price: producto.product_price,
        product_description: producto.product_description,
        product_urlimage: producto.product_urlimage,
        product_state: '0',
        product_stock: producto.product_stock,
        product_needpreparation: producto.product_needpreparation,
        category_id: producto.category_id,
        store_id: producto.store_id,
      };

      this.productService.updateProduct(productoActualizado).subscribe({
        next: (response) => {
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
}
