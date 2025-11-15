import { Component, EventEmitter, Output, Input, OnChanges, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-crear-producto-form',
  standalone: false,
  templateUrl: './crear-producto-form.html',
  styleUrl: './crear-producto-form.scss',
})
export class CrearProductoForm implements OnChanges {
  @Input() productoEditar: any = null;
  @Output() guardar = new EventEmitter<{
    id?: number;
    nombre: string;
    precio: number;
    descripcion: string;
    imagen: string;
    stock: number;
    necesitaPreparacion: boolean;
  }>();
  @Output() cancelar = new EventEmitter<void>();

  nombre: string = '';
  precio: number = 0;
  descripcion: string = '';
  imagen: string = '';
  stock: number = 0;
  necesitaPreparacion: boolean = true;

  ngOnChanges(changes: SimpleChanges) {
    if (changes['productoEditar'] && this.productoEditar) {
      this.nombre = this.productoEditar.product_name || this.productoEditar.nombre || '';
      this.precio = this.productoEditar.product_price || this.productoEditar.precio || 0;
      this.descripcion =
        this.productoEditar.product_description || this.productoEditar.descripcion || '';
      this.imagen = this.productoEditar.product_urlimage || this.productoEditar.imagen || '';
      this.stock = this.productoEditar.product_stock || this.productoEditar.stock || 0;
      this.necesitaPreparacion =
        this.productoEditar.product_needpreparation === '1' ||
        this.productoEditar.necesitaPreparacion === true;
    }
  }

  onSubmit() {
    if (this.nombre.trim()) {
      const data: any = {
        nombre: this.nombre,
        precio: this.precio,
        descripcion: this.descripcion,
        imagen: this.imagen || 'default.png',
        stock: this.stock,
        necesitaPreparacion: this.necesitaPreparacion,
      };
      if (this.productoEditar && (this.productoEditar.product_id || this.productoEditar.id)) {
        data.id = this.productoEditar.product_id || this.productoEditar.id;
      }
      this.guardar.emit(data);
      this.limpiar();
    }
  }

  onCancel() {
    this.cancelar.emit();
    this.limpiar();
  }

  limpiar() {
    if (!this.productoEditar) {
      this.nombre = '';
      this.precio = 0;
      this.descripcion = '';
      this.imagen = '';
      this.stock = 0;
      this.necesitaPreparacion = true;
    }
  }
}
