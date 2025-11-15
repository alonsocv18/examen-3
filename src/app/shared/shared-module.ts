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
@NgModule({
  declarations: [Header, Sidebar, Modal],
  imports: [
    CommonModule,
    SharedRoutingModule,
    ButtonModule,
    DrawerModule,
    DividerModule,
    DialogModule,
  ],
  exports: [ButtonModule, Header, Sidebar, DrawerModule, DividerModule, DialogModule, Modal],
})
export class SharedModule {}
