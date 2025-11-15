import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-categoria',
  standalone: false,
  templateUrl: './categoria.html',
  styleUrl: './categoria.scss',
})
export class Categoria implements OnInit {
  idCategoria: string = '';
  nombreCategoria: string = '';

  subcategorias = [
    { id: 1, nombre: 'Bebidas Frias' },
    { id: 2, nombre: 'Bebidas Calientes' },
  ];

  // Simulación de productos por categoría
  productos = [
    { id: 1, nombre: '1/2 Pollo a la brasa', stock: 10, precio: 40, categoriaId: 2, activo: true },
    { id: 2, nombre: '1/4 Pollo a la brasa', stock: 19, precio: 15, categoriaId: 2, activo: false },
    {
      id: 3,
      nombre: '1 Pollo entero a la brasa',
      stock: 36,
      precio: 65.9,
      categoriaId: 2,
      activo: false,
    },
    { id: 4, nombre: '1/8 Pollo a la brasa', stock: 18, precio: 12, categoriaId: 2, activo: false },
    { id: 5, nombre: 'Parte Contramuslo', stock: 20, precio: 8, categoriaId: 2, activo: false },
    { id: 6, nombre: 'Parte Ala', stock: 15, precio: 7, categoriaId: 2, activo: false },
    { id: 6, nombre: 'Parte Ala', stock: 15, precio: 7, categoriaId: 1, activo: false },
  ];

  get productosFiltrados() {
    return this.productos.filter((p) => p.categoriaId === Number(this.idCategoria));
  }

  constructor(private route: ActivatedRoute, private router: Router) {}

  ngOnInit() {
    this.route.params.subscribe((params) => {
      this.idCategoria = params['id'];
      this.nombreCategoria = params['nombre'];
    });
  }

  irASubcategoria(id: number, nombre: string) {
    this.router.navigate(['subcategorias', id, nombre], { relativeTo: this.route });
  }
}
