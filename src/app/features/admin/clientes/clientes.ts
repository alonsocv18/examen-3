import { Component, OnInit } from '@angular/core';
import { CustomerService } from '../../../core/services/customer.service';
import { Customer } from '../../../core/interfaces/customer.interface';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-clientes',
  standalone: false,
  templateUrl: './clientes.html',
  styleUrl: './clientes.scss',
})
export class Clientes implements OnInit {
  showModalCliente: boolean = false;
  showModalEditar: boolean = false;
  clienteSeleccionado: Customer | null = null;
  clientes: Customer[] = [];
  isLoading = false;

  constructor(private customerService: CustomerService, private messageService: MessageService) {}

  ngOnInit() {
    this.cargarClientes();
  }

  // Cargar todos los clientes
  cargarClientes() {
    this.isLoading = true;
    this.customerService.getCustomers(undefined, 1).subscribe({
      next: (response) => {
        if (response.tipo === '1' && response.data) {
          this.clientes = response.data;
        } else {
          this.clientes = [];
        }
        this.isLoading = false;
      },
      error: (error) => {
        console.error('Error al cargar clientes:', error);
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'No se pudieron cargar los clientes',
        });
        this.clientes = [];
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
  }) {
    const storeId = parseInt(localStorage.getItem('store_id') || '1', 10);

    const nuevoCliente = {
      customer_name: data.nombre,
      customer_typedocument: data.tipoDocumento,
      customer_document: data.numDocumento,
      customer_phone: data.telefono,
      customer_email: data.correo,
      customer_state: '1', // Activo por defecto
      store_id: storeId,
    };

    this.customerService.createCustomer(nuevoCliente).subscribe({
      next: (response) => {
        if (response.tipo === '1') {
          this.messageService.add({
            severity: 'success',
            summary: 'Éxito',
            detail: 'Cliente creado correctamente',
          });
          this.showModalCliente = false;
          this.cargarClientes();
        }
      },
      error: (error) => {
        console.error('Error al crear cliente:', error);
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'No se pudo crear el cliente',
        });
      },
    });
  }

  // PUT - Actualizar cliente
  actualizarCliente(data: {
    id?: number;
    nombre: string;
    tipoDocumento: string;
    numDocumento: string;
    telefono: string;
    correo: string;
  }) {
    if (!this.clienteSeleccionado || !data.id) return;

    const clienteActualizado = {
      customer_id: data.id,
      customer_name: data.nombre,
      customer_typedocument: data.tipoDocumento,
      customer_document: data.numDocumento,
      customer_phone: data.telefono,
      customer_email: data.correo,
      customer_state: this.clienteSeleccionado.customer_state,
      store_id:
        this.clienteSeleccionado.store_id || parseInt(localStorage.getItem('store_id') || '1', 10),
    };

    this.customerService.updateCustomer(clienteActualizado).subscribe({
      next: (response) => {
        if (response.tipo === '1') {
          this.messageService.add({
            severity: 'success',
            summary: 'Éxito',
            detail: 'Cliente actualizado correctamente',
          });
          this.showModalEditar = false;
          this.clienteSeleccionado = null;
          this.cargarClientes();
        }
      },
      error: (error) => {
        console.error('Error al actualizar cliente:', error);
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'No se pudo actualizar el cliente',
        });
      },
    });
  }

  // Abrir modal para editar cliente
  editarCliente(cliente: Customer) {
    this.clienteSeleccionado = { ...cliente };
    this.showModalEditar = true;
  }

  // Cambiar estado del cliente (activar/desactivar)
  eliminarCliente(cliente: Customer) {
    const nuevoEstado = cliente.customer_state === '1' ? '0' : '1';
    const accion = nuevoEstado === '0' ? 'desactivar' : 'activar';
    const accionTexto = nuevoEstado === '0' ? 'desactivado' : 'activado';

    if (
      confirm(`¿${accion.charAt(0).toUpperCase() + accion.slice(1)} a ${cliente.customer_name}?`)
    ) {
      const clienteActualizado = {
        customer_id: cliente.customer_id,
        customer_name: cliente.customer_name,
        customer_typedocument: cliente.customer_typedocument,
        customer_document: cliente.customer_document,
        customer_phone: cliente.customer_phone,
        customer_email: cliente.customer_email,
        customer_state: nuevoEstado,
        store_id: cliente.store_id || parseInt(localStorage.getItem('store_id') || '1', 10),
      };

      this.customerService.updateCustomer(clienteActualizado).subscribe({
        next: (response) => {
          if (response.tipo === '1') {
            this.messageService.add({
              severity: 'success',
              summary: 'Éxito',
              detail: `Cliente ${accionTexto} correctamente`,
            });
            this.cargarClientes();
          }
        },
        error: (error) => {
          console.error(`Error al ${accion} cliente:`, error);
          this.messageService.add({
            severity: 'error',
            summary: 'Error',
            detail: `No se pudo ${accion} el cliente`,
          });
        },
      });
    }
  }

  // Helper para mostrar el estado como texto
  getEstadoTexto(estado: string): string {
    return estado === '1' ? 'Activo' : 'Inactivo';
  }
}
