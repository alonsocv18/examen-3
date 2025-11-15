import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-crear-categoria-form',
  standalone: false,
  templateUrl: './crear-categoria-form.html',
  styleUrl: './crear-categoria-form.scss',
})
export class CrearCategoriaForm {
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
