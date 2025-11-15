import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-subcategoria',
  standalone: false,
  templateUrl: './subcategoria.html',
  styleUrl: './subcategoria.scss',
})
export class Subcategoria implements OnInit {
  idSubcategoria: string = '';
  nombreSubcategoria: string = '';
  idCategoria: string = '';
  nombreCategoria: string = '';

  constructor(private route: ActivatedRoute) {}

  // testing
  productosPorSubcategoria: { [key: string]: { id: number; nombre: string; precio: number }[] } = {
    '3': [
      // id de subcategoría "Extras"
      { id: 1, nombre: 'Porción de papas', precio: 5 },
      { id: 2, nombre: 'Ensalada extra', precio: 4 },
      // ...
    ],
    // otras subcategorías...
  };

  get productos() {
    return this.productosPorSubcategoria[this.idSubcategoria] || [];
  }

  ngOnInit() {
    // Obtener todos los parámetros de la ruta actual
    this.route.params.subscribe((params) => {
      this.idSubcategoria = params['id_subcategoria'];
      this.nombreSubcategoria = params['nombre_subcategoria'];
      this.idCategoria = params['id'];
      this.nombreCategoria = params['nombre'];
    });
  }
}
