import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Login } from './login/login';
import { Register } from './register/register';
import { Prueba } from './prueba/prueba';

const routes: Routes = [
  {
    path: '',
    component: Login,
  },
  {
    path: 'register',
    component: Register,
  },
  {
    path: 'prueba',
    component: Prueba,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CoreRoutingModule {}
