import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { SharedRoutingModule } from './shared-routing-module';
import { Header } from './header/header';
import { Sidebar } from './sidebar/sidebar';
import { DrawerModule } from 'primeng/drawer';
import { DividerModule } from 'primeng/divider';
import { Modal } from './modal/modal';
import { DialogModule } from 'primeng/dialog';
import { SearchBar } from './search-bar/search-bar';
import { InputTextModule } from 'primeng/inputtext';
import { CardModule } from 'primeng/card';
import { Card } from './card/card';
import { Table } from './table/table';
import { TableModule } from 'primeng/table';
import { SelectModule } from 'primeng/select';
import { Selector } from './selector/selector';
import { CrearCategoriaForm } from './forms/crear-categoria-form/crear-categoria-form';
import { CrearProductoForm } from './forms/crear-producto-form/crear-producto-form';
import { CrearSubcategoriaForm } from './forms/crear-subcategoria-form/crear-subcategoria-form';
import { CrearClienteForm } from './forms/crear-cliente-form/crear-cliente-form';
import { CrearSalonForm } from './forms/crear-salon-form/crear-salon-form';
@NgModule({
  declarations: [
    Header,
    Sidebar,
    Modal,
    SearchBar,
    Card,
    Table,
    Selector,
    CrearCategoriaForm,
    CrearProductoForm,
    CrearSubcategoriaForm,
    CrearClienteForm,
    CrearSalonForm,
  ],
  imports: [
    CommonModule,
    FormsModule,
    SharedRoutingModule,
    ButtonModule,
    DrawerModule,
    DividerModule,
    DialogModule,
    InputTextModule,
    CardModule,
    TableModule,
    SelectModule,
  ],
  exports: [
    ButtonModule,
    Header,
    Sidebar,
    DrawerModule,
    DividerModule,
    DialogModule,
    Modal,
    InputTextModule,
    CardModule,
    Card,
    TableModule,
    Table,
    SelectModule,
    Selector,
    CrearCategoriaForm,
    CrearProductoForm,
    CrearSubcategoriaForm,
    CrearClienteForm,
    CrearSalonForm,
    FormsModule,
  ],
})
export class SharedModule {}
