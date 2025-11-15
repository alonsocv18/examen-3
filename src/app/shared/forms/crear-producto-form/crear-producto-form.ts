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
    stock: number;
    precio: number;
  }>();
  @Output() cancelar = new EventEmitter<void>();

  nombre: string = '';
  stock: number = 0;
  precio: number = 0;

  ngOnChanges(changes: SimpleChanges) {
    if (changes['productoEditar'] && this.productoEditar) {
      this.nombre = this.productoEditar.nombre || '';
      this.stock = this.productoEditar.stock || 0;
      this.precio = this.productoEditar.precio || 0;
    }
  }

  onSubmit() {
    if (this.nombre.trim()) {
      const data: any = { nombre: this.nombre, stock: this.stock, precio: this.precio };
      if (this.productoEditar && this.productoEditar.id) {
        data.id = this.productoEditar.id;
      }
      this.guardar.emit(data);
      this.nombre = '';
      this.stock = 0;
      this.precio = 0;
    }
  }

  onCancel() {
    this.cancelar.emit();
    this.nombre = '';
    this.stock = 0;
    this.precio = 0;
  }
}
