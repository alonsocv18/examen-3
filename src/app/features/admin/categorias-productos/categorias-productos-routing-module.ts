import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Categoria } from './categoria/categoria';
import { Subcategoria } from './subcategoria/subcategoria';
import { CategoriasProductos } from './categorias-productos';

const routes: Routes = [
  {
    path: '',
    component: CategoriasProductos,
  },
  {
    path: 'categoria/:id/:nombre',
    component: Categoria,
    children: [
      {
        path: 'subcategorias/:id_subcategoria/:nombre_subcategoria',
        component: Subcategoria,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CategoriasProductosRoutingModule {}
