import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-crear-cliente-form',
  standalone: false,
  templateUrl: './crear-cliente-form.html',
  styleUrl: './crear-cliente-form.scss',
})
export class CrearClienteForm {
  @Output() guardar = new EventEmitter<{
    nombre: string;
    tipoDocumento: string;
    numDocumento: string;
    telefono: string;
    correo: string;
    estado: string;
  }>();
  @Output() cancelar = new EventEmitter<void>();

  nombre: string = '';
  tipoDocumento: string = '';
  numDocumento: string = '';
  telefono: string = '';
  correo: string = '';
  estado: string = '';

  onSubmit() {
    if (this.nombre.trim()) {
      this.guardar.emit({
        nombre: this.nombre,
        tipoDocumento: this.tipoDocumento,
        numDocumento: this.numDocumento,
        telefono: this.telefono,
        correo: this.correo,
        estado: this.estado,
      });
      this.limpiar();
    }
  }

  onCancel() {
    this.cancelar.emit();
    this.limpiar();
  }

  private limpiar() {
    this.nombre = '';
    this.tipoDocumento = '';
    this.numDocumento = '';
    this.telefono = '';
    this.correo = '';
    this.estado = '';
  }
}
