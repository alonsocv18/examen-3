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
    estado: string;
  }>();
  @Output() cancelar = new EventEmitter<void>();

  nombre: string = '';
  tipoDocumento: string = 'DNI';
  numDocumento: string = '';
  telefono: string = '';
  correo: string = '';
  estado: string = 'Activo';

  ngOnChanges(changes: SimpleChanges) {
    if (changes['clienteEditar'] && this.clienteEditar) {
      this.nombre = this.clienteEditar.nombre || '';
      this.tipoDocumento = this.clienteEditar.tipoDocumento || 'DNI';
      this.numDocumento = this.clienteEditar.numDocumento || '';
      this.telefono = this.clienteEditar.telefono || '';
      this.correo = this.clienteEditar.correo || '';
      this.estado = this.clienteEditar.estado || 'Activo';
    }
  }

  onSubmit() {
    if (this.nombre.trim()) {
      const data: any = {
        nombre: this.nombre,
        tipoDocumento: this.tipoDocumento,
        numDocumento: this.numDocumento,
        telefono: this.telefono,
        correo: this.correo,
        estado: this.estado,
      };
      if (this.clienteEditar && this.clienteEditar.id) {
        data.id = this.clienteEditar.id;
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
    this.estado = 'Activo';
  }
}
