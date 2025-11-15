import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CoreRoutingModule } from './core-routing-module';
import { Login } from './login/login';
import { Register } from './register/register';
import { SharedModule } from '../shared/shared-module';

@NgModule({
  declarations: [Register, Login],
  imports: [CommonModule, CoreRoutingModule, SharedModule],
  exports: [Login, Register],
  providers: [],
})
export class CoreModule {}
