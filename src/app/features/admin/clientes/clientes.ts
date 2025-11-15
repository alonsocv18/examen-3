import { Component } from '@angular/core';
// import { ClientesService, Cliente } from '../../../core/services/clientes.service';

@Component({
  selector: 'app-clientes',
  standalone: false,
  templateUrl: './clientes.html',
  styleUrl: './clientes.scss',
})
export class Clientes {
  showModalCliente: boolean = false;
  showModalEditar: boolean = false;
  clienteSeleccionado: any = null;
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
    {
      id: 2,
      nombre: 'Ana Torres',
      tipoDocumento: 'RUC',
      numDocumento: '20123456789',
      telefono: '912345678',
      correo: 'ana.torres@empresa.com',
      estado: 'Inactivo',
    },
    {
      id: 3,
      nombre: 'Carlos Ruiz',
      tipoDocumento: 'DNI',
      numDocumento: '87654321',
      telefono: '998877665',
      correo: 'carlos.ruiz@mail.com',
      estado: 'Activo',
    },
  ];

  crearCliente(data: {
    id?: number;
    nombre: string;
    tipoDocumento: string;
    numDocumento: string;
    telefono: string;
    correo: string;
    estado: string;
  }) {
    if (data.nombre.trim()) {
      this.clientes.push({
        id: this.clientes.length + 1,
        ...data,
      });
      this.showModalCliente = false;
    }
  }

  actualizarCliente(data: {
    id?: number;
    nombre: string;
    tipoDocumento: string;
    numDocumento: string;
    telefono: string;
    correo: string;
    estado: string;
  }) {
    if (data.id && data.nombre.trim()) {
      const index = this.clientes.findIndex((c) => c.id === data.id);
      if (index !== -1) {
        this.clientes[index] = {
          id: data.id,
          nombre: data.nombre,
          tipoDocumento: data.tipoDocumento,
          numDocumento: data.numDocumento,
          telefono: data.telefono,
          correo: data.correo,
          estado: data.estado,
        };
      }
      this.showModalEditar = false;
      this.clienteSeleccionado = null;
    }
  }

  editarCliente(cliente: any) {
    this.clienteSeleccionado = { ...cliente };
    this.showModalEditar = true;
  }

  eliminarCliente(cliente: any) {
    if (confirm(`¿Estás seguro de eliminar a ${cliente.nombre}?`)) {
      this.clientes = this.clientes.filter((c) => c.id !== cliente.id);
    }
  }
}
