import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common'; // Importa CommonModule
import { LoungeService } from '../../../core/services/lounge.service';
import { Lounge } from '../../../core/interfaces/lounge.interface';
import { TableModel } from '../../../core/interfaces/table.interface';
import { TableService } from '../../../core/services/table.service';

@Component({
  selector: 'app-salones-mesas',
  standalone: false,
  templateUrl: './salones-mesas.html',
  styleUrl: './salones-mesas.scss',
})
export class SalonesMesas implements OnInit {
  salones: Lounge[] = [];
  mesas: TableModel[] = [];
  salonSeleccionado: Lounge | null = null;
  mesaSeleccionada: TableModel | null = null;

  // Flags de carga
  loadingSalones: boolean = false;
  loadingMesas: boolean = false;

  // Modales
  showModal: boolean = false;
  showModalEditar: boolean = false;
  salonParaEditar: Lounge | null = null;

  constructor(private loungeService: LoungeService, private tableService: TableService) {}

  ngOnInit(): void {
    this.cargarSalones();
  }

  cargarSalones(): void {
    this.loadingSalones = true;
    this.loungeService.getLounges().subscribe({
      next: (data) => {
        this.salones = data;
        this.loadingSalones = false;
      },
      error: () => {
        this.loadingSalones = false;
      },
    });
  }

  seleccionarSalon(salon: Lounge): void {
    this.salonSeleccionado = salon;
    this.mesaSeleccionada = null;
    this.cargarMesas(salon.store_id, salon.lounge_id);
  }

  cargarMesas(storeId: number, loungeId: number): void {
    this.loadingMesas = true;
    this.tableService.getTablesByLounge(storeId, loungeId).subscribe({
      next: (data) => {
        this.mesas = data;
        this.loadingMesas = false;
      },
      error: () => {
        this.loadingMesas = false;
      },
    });
  }

  seleccionarMesa(mesa: TableModel): void {
    this.mesaSeleccionada = mesa;
  }

  verMesa(mesa: TableModel): void {
    console.log('Detalles mesa:', mesa);
  }

  crearSalon(data: { nombre: string; cantidadMesas: number }): void {
    const nuevoSalon: Lounge = {
      lounge_id: 0,
      store_id: 1,
      lounge_name: data.nombre,
      lounge_state: 'activo',
      cantidad_mesas: data.cantidadMesas,
    };

    this.loungeService.createLounge(nuevoSalon).subscribe({
      next: () => {
        this.showModal = false;
        this.cargarSalones();
      },
      error: (err) => {
        console.error('Error al crear salón:', err);
      },
    });
  }

  abrirModalEditar(salon: Lounge): void {
    this.salonParaEditar = { ...salon };
    this.showModalEditar = true;
  }

  actualizarSalon(data: { id?: number; nombre: string; cantidadMesas: number }): void {
    if (!this.salonParaEditar) return;

    const salonActualizado: Lounge = {
      ...this.salonParaEditar,
      lounge_name: data.nombre,
    };

    this.loungeService.updateLounge(this.salonParaEditar.lounge_id, salonActualizado).subscribe({
      next: () => {
        this.showModalEditar = false;
        this.salonParaEditar = null;
        this.cargarSalones();
      },
      error: (err) => {
        console.error('Error al actualizar salón:', err);
      },
    });
  }

  cambiarEstadoSalon(salon: Lounge): void {
    const salonActualizado: Lounge = {
      ...salon,
      lounge_state: salon.lounge_state === 'activo' ? 'inactivo' : 'activo',
    };

    this.loungeService.updateLounge(salon.lounge_id, salonActualizado).subscribe({
      next: () => {
        this.cargarSalones();
      },
      error: (err) => {
        console.error('Error al cambiar estado:', err);
      },
    });
  }
}
