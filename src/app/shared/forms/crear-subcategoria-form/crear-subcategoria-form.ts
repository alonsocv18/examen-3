import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-crear-subcategoria-form',
  standalone: false,
  templateUrl: './crear-subcategoria-form.html',
  styleUrl: './crear-subcategoria-form.scss',
})
export class CrearSubcategoriaForm {
  @Output() guardar = new EventEmitter<{ nombre: string }>();
  @Output() cancelar = new EventEmitter<void>();

  nombre: string = '';

  onSubmit() {
    if (this.nombre.trim()) {
      this.guardar.emit({ nombre: this.nombre });
      this.nombre = '';
    }
  }

  onCancel() {
    this.cancelar.emit();
    this.nombre = '';
  }
}
