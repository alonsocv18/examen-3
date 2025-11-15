import { Component, EventEmitter, Output, Input, OnChanges, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-crear-salon-form',
  standalone: false,
  templateUrl: './crear-salon-form.html',
  styleUrl: './crear-salon-form.scss',
})
export class CrearSalonForm implements OnChanges {
  @Input() salonEditar: any = null;
  @Output() guardar = new EventEmitter<{ id?: number; nombre: string; cantidadMesas: number }>();
  @Output() cancelar = new EventEmitter<void>();

  nombre: string = '';
  cantidadMesas: number = 0;

  ngOnChanges(changes: SimpleChanges) {
    if (changes['salonEditar'] && this.salonEditar) {
      this.nombre = this.salonEditar.lounge_name || this.salonEditar.nombre || '';
      this.cantidadMesas = this.salonEditar.cantidad_mesas || this.salonEditar.cantidadMesas || 0;
    }
  }

  onSubmit() {
    if (this.nombre.trim()) {
      const data: any = { nombre: this.nombre, cantidadMesas: this.cantidadMesas };
      if (
        this.salonEditar &&
        (this.salonEditar.id !== undefined || this.salonEditar.lounge_id !== undefined)
      ) {
        data.id = this.salonEditar.id || this.salonEditar.lounge_id;
        // Al editar, mantener la cantidad de mesas original
        data.cantidadMesas = this.salonEditar.cantidad_mesas || this.salonEditar.cantidadMesas;
      }
      this.guardar.emit(data);
      this.limpiar();
    }
  }

  onCancel() {
    this.cancelar.emit();
    this.limpiar();
  }

  incrementar() {
    this.cantidadMesas++;
  }

  decrementar() {
    if (this.cantidadMesas > 0) {
      this.cantidadMesas--;
    }
  }

  private limpiar() {
    this.nombre = '';
    this.cantidadMesas = 0;
  }
}
