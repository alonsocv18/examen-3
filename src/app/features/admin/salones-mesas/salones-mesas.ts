import { Component } from '@angular/core';

@Component({
  selector: 'app-salones-mesas',
  standalone: false,
  templateUrl: './salones-mesas.html',
  styleUrl: './salones-mesas.scss',
})
export class SalonesMesas {
  showModal: boolean = false;

  //array de prueba de salones
  salones = [
    { nombre: 'Pollito pio', cantidadMesas: 5 },
    { nombre: 'Salón Azul', cantidadMesas: 8 },
    { nombre: 'Ganimedes', cantidadMesas: 4 },
    { nombre: 'Brasita lol', cantidadMesas: 6 },
  ];

  // Para crear salón
  nuevoSalon = {
    nombre: '',
    cantidadMesas: 0,
  };

  showDialog() {
    this.showModal = true;
  }

  closeDialog() {
    this.showModal = false;
    this.nuevoSalon = { nombre: '', cantidadMesas: 0 };
  }

  crearSalon() {
    if (this.nuevoSalon.nombre.trim()) {
      this.salones.push({
        nombre: this.nuevoSalon.nombre,
        cantidadMesas: this.nuevoSalon.cantidadMesas,
      });
      this.closeDialog();
    }
  }

  // Para editar salón
  modalIndex: number | null = null;

  openModal(index: number) {
    this.modalIndex = index;
  }

  closeModal() {
    this.modalIndex = null;
  }

  guardarCambios(index: number) {
    // Aquí puedes agregar lógica para guardar cambios si es necesario
    this.closeModal();
  }
}
