import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full',
  },
  {
    path: 'login',
    loadChildren: () => import('./core/core-module').then((m) => m.CoreModule),
  },
  { path: 'register', loadChildren: () => import('./core/core-module').then((m) => m.CoreModule) },
  {
    path: 'admin',
    loadChildren: () => import('./features/features-module').then((m) => m.FeaturesModule),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
