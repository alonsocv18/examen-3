import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { CoreRoutingModule } from './core-routing-module';
import { Login } from './login/login';
import { Register } from './register/register';
import { SharedModule } from '../shared/shared-module';
import { CategoriasService } from './services/categorias.service';
import { ProductosService } from './services/productos.service';
import { ClientesService } from './services/clientes.service';

@NgModule({
  declarations: [Register, Login],
  imports: [CommonModule, CoreRoutingModule, SharedModule],
  exports: [Login, Register],
  providers: [
    provideHttpClient(withInterceptorsFromDi()),
    CategoriasService,
    ProductosService,
    ClientesService,
  ],
})
export class CoreModule {}
