import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { SharedRoutingModule } from './shared-routing-module';

@NgModule({
  declarations: [],
  imports: [CommonModule, SharedRoutingModule, ButtonModule],
  exports: [ButtonModule],
})
export class SharedModule {}
