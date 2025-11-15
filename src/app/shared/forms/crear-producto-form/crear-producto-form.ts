import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-crear-producto-form',
  standalone: false,
  templateUrl: './crear-producto-form.html',
  styleUrl: './crear-producto-form.scss',
})
export class CrearProductoForm {
  @Output() guardar = new EventEmitter<{ nombre: string; stock: number; precio: number }>();
  @Output() cancelar = new EventEmitter<void>();

  nombre: string = '';
  stock: number = 0;
  precio: number = 0;

  onSubmit() {
    if (this.nombre.trim()) {
      this.guardar.emit({ nombre: this.nombre, stock: this.stock, precio: this.precio });
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
