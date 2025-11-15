import { Component } from '@angular/core';

@Component({
  selector: 'app-clientes',
  standalone: false,
  templateUrl: './clientes.html',
  styleUrl: './clientes.scss',
})
export class Clientes {
  showModalCliente: boolean = false;
  nuevoCliente = {
    nombre: '',
    tipoDocumento: '',
    numDocumento: '',
    telefono: '',
    correo: '',
    estado: '',
  };

  crearCliente() {
    if (this.nuevoCliente.nombre.trim()) {
      // Aquí podrías agregar lógica para guardar el cliente
      // Por ahora solo cierra el modal y limpia el campo
      // Ejemplo: alert('Cliente creado: ' + this.nuevoCliente.nombre);
      this.nuevoCliente = {
        nombre: '',
        tipoDocumento: '',
        numDocumento: '',
        telefono: '',
        correo: '',
        estado: '',
      };
      this.showModalCliente = false;
    }
  }
  // Datos de ejemplo de clientes
  clientes = [
    {
      id: 1,
      nombre: 'Juan Pérez',
      tipoDocumento: 'DNI',
      numDocumento: '12345678',
      telefono: '987654321',
      correo: 'juan.perez@example.com',
      estado: 'Activo',
    },
  ];
}
