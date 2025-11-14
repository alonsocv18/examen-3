import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CoreRoutingModule } from './core-routing-module';
import { Login } from './login/login';
import { Register } from './register/register';
import { SharedModule } from '../shared/shared-module';
import { Prueba } from './prueba/prueba';

@NgModule({
  declarations: [Register, Login, Prueba],
  imports: [CommonModule, CoreRoutingModule, SharedModule],
  exports: [Login, Register, Prueba],
})
export class CoreModule {}
