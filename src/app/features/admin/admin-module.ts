import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Admin } from './admin';
import { SalonesMesas } from './salones-mesas/salones-mesas';
import { CategoriasProductos } from './categorias-productos/categorias-productos';
import { Clientes } from './clientes/clientes';
import { AdminRoutingModule } from './admin-routing-module';
import { SharedModule } from '../../shared/shared-module';

@NgModule({
  declarations: [Admin, SalonesMesas, CategoriasProductos, Clientes],
  imports: [CommonModule, AdminRoutingModule, SharedModule],
})
export class AdminModule {}
