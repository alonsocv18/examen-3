import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { SharedRoutingModule } from './shared-routing-module';
import { Header } from './header/header';
import { Sidebar } from './sidebar/sidebar';

@NgModule({
  declarations: [Header, Sidebar],
  imports: [CommonModule, SharedRoutingModule, ButtonModule],
  exports: [ButtonModule, Header, Sidebar],
})
export class SharedModule {}
