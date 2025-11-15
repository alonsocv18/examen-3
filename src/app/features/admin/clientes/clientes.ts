import { Component, OnInit } from '@angular/core';
import { ClientesService, Cliente } from '../../../core/services/clientes.service';

@Component({
  selector: 'app-clientes',
  standalone: false,
  templateUrl: './clientes.html',
  styleUrl: './clientes.scss',
})
export class Clientes implements OnInit {
  showModalCliente: boolean = false;
  clientes: Cliente[] = [];
  isLoading: boolean = false;

  constructor(private clientesService: ClientesService) {}

  ngOnInit() {
    this.cargarClientes();
  }

  // GET - Cargar todos los clientes
  cargarClientes() {
    this.isLoading = true;
    this.clientesService.getClientes().subscribe({
      next: (data) => {
        this.clientes = data;
        this.isLoading = false;
      },
      error: (error) => {
        console.error('Error al cargar clientes:', error);
        this.isLoading = false;
      },
    });
  }

  // POST - Crear nuevo cliente
  crearCliente(data: {
    nombre: string;
    tipoDocumento: string;
    numDocumento: string;
    telefono: string;
    correo: string;
    estado: string;
  }) {
    if (data.nombre.trim()) {
      this.clientesService.crearCliente(data).subscribe({
        next: (clienteCreado) => {
          console.log('Cliente creado:', clienteCreado);
          this.showModalCliente = false;
          this.cargarClientes(); // Recargar lista
        },
        error: (error) => {
          console.error('Error al crear cliente:', error);
        },
      });
    }
  }

  // PUT - Actualizar cliente
  actualizarCliente(id: number, data: Cliente) {
    this.clientesService.actualizarCliente(id, data).subscribe({
      next: (cliente) => {
        console.log('Cliente actualizado:', cliente);
        const index = this.clientes.findIndex((c) => c.id === id);
        if (index !== -1) {
          this.clientes[index] = cliente;
        }
      },
      error: (error) => {
        console.error('Error al actualizar cliente:', error);
      },
    });
  }

  // DELETE - Eliminar cliente
  eliminarCliente(id: number) {
    if (confirm('¿Estás seguro de eliminar este cliente?')) {
      this.clientesService.eliminarCliente(id).subscribe({
        next: () => {
          console.log('Cliente eliminado');
          this.clientes = this.clientes.filter((c) => c.id !== id);
        },
        error: (error) => {
          console.error('Error al eliminar cliente:', error);
        },
      });
    }
  }
}
