import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreateComponent } from './user/create/create.component';
import { EditComponent } from './user/edit/edit.component';
import { GetComponent } from './user/get/get.component';

const routes: Routes = [
  {
    path: 'create',
    component: CreateComponent,
  },{
    path: 'edit/:id',
    component: EditComponent,
  },{
    path: 'get',
    component: GetComponent,
  },{
    path: '',
    pathMatch: 'full',
    redirectTo: 'get'
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
