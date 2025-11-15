import { Component, EventEmitter, Output, Input, OnChanges, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-crear-cliente-form',
  standalone: false,
  templateUrl: './crear-cliente-form.html',
  styleUrl: './crear-cliente-form.scss',
})
export class CrearClienteForm implements OnChanges {
  @Input() clienteEditar: any = null;
  @Output() guardar = new EventEmitter<{
    id?: number;
    nombre: string;
    tipoDocumento: string;
    numDocumento: string;
    telefono: string;
    correo: string;
  }>();
  @Output() cancelar = new EventEmitter<void>();

  nombre: string = '';
  tipoDocumento: string = 'DNI';
  numDocumento: string = '';
  telefono: string = '';
  correo: string = '';

  ngOnChanges(changes: SimpleChanges) {
    if (changes['clienteEditar'] && this.clienteEditar) {
      this.nombre = this.clienteEditar.customer_name || this.clienteEditar.nombre || '';
      this.tipoDocumento =
        this.clienteEditar.customer_typedocument || this.clienteEditar.tipoDocumento || 'DNI';
      this.numDocumento =
        this.clienteEditar.customer_document || this.clienteEditar.numDocumento || '';
      this.telefono = this.clienteEditar.customer_phone || this.clienteEditar.telefono || '';
      this.correo = this.clienteEditar.customer_email || this.clienteEditar.correo || '';
    }
  }

  onSubmit() {
    if (this.nombre.trim() && this.correo.trim()) {
      const data: any = {
        nombre: this.nombre,
        tipoDocumento: this.tipoDocumento,
        numDocumento: this.numDocumento,
        telefono: this.telefono,
        correo: this.correo,
      };
      if (this.clienteEditar) {
        data.id = this.clienteEditar.customer_id || this.clienteEditar.id;
      }
      this.guardar.emit(data);
      this.limpiar();
    }
  }

  onCancel() {
    this.cancelar.emit();
    this.limpiar();
  }

  private limpiar() {
    this.nombre = '';
    this.tipoDocumento = 'DNI';
    this.numDocumento = '';
    this.telefono = '';
    this.correo = '';
  }
}
