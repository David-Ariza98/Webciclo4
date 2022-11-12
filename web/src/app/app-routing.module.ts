import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ErrorComponent } from './assets/error/error.component';
import { IndexComponent } from './assets/index/index.component';

const routes: Routes = [
  {
  path: 'index',
  component: IndexComponent,
  },
  {
    path: 'security',
    loadChildren: () => import('./modulos/security/security.module').then(m => m.SecurityModule)
  },{
    path: 'admin',
    loadChildren: () => import('./modulos/admin/admin.module').then(m => m.AdminModule)
  },{
    path: 'airoplanes',
    loadChildren: () => import('./modulos/airoplanes/airoplanes.module').then(m => m.AiroplanesModule)
  },{
    path: 'flights',
    loadChildren: () => import('./modulos/flight/flight.module').then(m => m.FlightModule)
  },{
    path: 'airports',
    loadChildren: () => import('./modulos/airports/airports.module').then(m => m.AirportsModule)
  },{
    path: 'routes',
    loadChildren: () => import('./modulos/routes/routes.module').then(m => m.RoutesModule)
  },

  {
  path: '',
  pathMatch: 'full',
  redirectTo: '/index'
  },
  {
  path: 'error',
  component: ErrorComponent,
  },{
  path: '**',
  redirectTo: '/error'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
