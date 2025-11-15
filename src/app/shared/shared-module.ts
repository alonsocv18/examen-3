import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { SharedRoutingModule } from './shared-routing-module';
import { Header } from './header/header';
import { Sidebar } from './sidebar/sidebar';
import { DrawerModule } from 'primeng/drawer';
import { DividerModule } from 'primeng/divider';
@NgModule({
  declarations: [Header, Sidebar],
  imports: [CommonModule, SharedRoutingModule, ButtonModule, DrawerModule, DividerModule],
  exports: [ButtonModule, Header, Sidebar, DrawerModule, DividerModule],
})
export class SharedModule {}
