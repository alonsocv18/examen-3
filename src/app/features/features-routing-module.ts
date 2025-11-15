import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CategoriasProductos } from './admin/categorias-productos/categorias-productos';
import { Admin } from './admin/admin';
import { SalonesMesas } from './admin/salones-mesas/salones-mesas';

const routes: Routes = [
  {
    path: '',
    component: Admin,
    children: [
      {
        path: 'salones-mesas',
        component: SalonesMesas,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FeaturesRoutingModule {}
