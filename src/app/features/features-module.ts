import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FeaturesRoutingModule } from './features-routing-module';
import { AdminModule } from './admin/admin-module';
import { SharedModule } from '../shared/shared-module';

@NgModule({
  declarations: [],
  imports: [CommonModule, FeaturesRoutingModule, AdminModule, SharedModule],
  exports: [],
})
export class FeaturesModule {}
