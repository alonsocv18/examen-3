import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SalonesMesas } from './salones-mesas/salones-mesas';
import { Admin } from './admin';

const routes: Routes = [];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdminRoutingModule {}
