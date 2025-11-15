import { Component, EventEmitter, Output, Input, OnChanges, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-crear-categoria-form',
  standalone: false,
  templateUrl: './crear-categoria-form.html',
  styleUrl: './crear-categoria-form.scss',
})
export class CrearCategoriaForm implements OnChanges {
  @Input() categoriaEditar: any = null;
  @Output() guardar = new EventEmitter<{ id?: number; nombre: string; imagen: string }>();
  @Output() cancelar = new EventEmitter<void>();

  nombre: string = '';
  imagen: string = '';

  ngOnChanges(changes: SimpleChanges) {
    if (changes['categoriaEditar'] && this.categoriaEditar) {
      this.nombre = this.categoriaEditar.category_name || '';
      this.imagen = this.categoriaEditar.category_urlimage || '';
    }
  }

  onSubmit() {
    if (this.nombre.trim()) {
      const data: any = { nombre: this.nombre, imagen: this.imagen || 'default.png' };
      if (this.categoriaEditar && this.categoriaEditar.category_id) {
        data.id = this.categoriaEditar.category_id;
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
    if (!this.categoriaEditar) {
      this.nombre = '';
      this.imagen = '';
    }
  }
}
