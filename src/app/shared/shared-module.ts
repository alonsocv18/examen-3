import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
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
@NgModule({
  declarations: [Header, Sidebar, Modal, SearchBar, Card, Table],
  imports: [
    CommonModule,
    SharedRoutingModule,
    ButtonModule,
    DrawerModule,
    DividerModule,
    DialogModule,
    InputTextModule,
    CardModule,
    TableModule,
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
  ],
})
export class SharedModule {}
