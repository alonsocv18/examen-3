import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FeaturesRoutingModule } from './features-routing-module';
import { AdminModule } from './admin/admin-module';

@NgModule({
  declarations: [],
  imports: [CommonModule, FeaturesRoutingModule, AdminModule],
  exports: [],
})
export class FeaturesModule {}
