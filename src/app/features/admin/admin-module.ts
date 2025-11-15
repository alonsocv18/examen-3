import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Admin } from './admin';
import { SalonesMesas } from './salones-mesas/salones-mesas';
import { CategoriasProductos } from './categorias-productos/categorias-productos';
import { Clientes } from './clientes/clientes';
import { AdminRoutingModule } from './admin-routing-module';
import { SharedModule } from '../../shared/shared-module';
import { FormsModule } from '@angular/forms';
import { Categoria } from './categorias-productos/categoria/categoria';
import { Subcategoria } from './categorias-productos/subcategoria/subcategoria';

@NgModule({
  declarations: [Admin, SalonesMesas, CategoriasProductos, Clientes, Categoria, Subcategoria],
  imports: [CommonModule, AdminRoutingModule, SharedModule, FormsModule],
})
export class AdminModule {}
