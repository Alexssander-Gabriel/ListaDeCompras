import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ListaRegisterPage } from './lista-register.page';

const routes: Routes = [
  {
    path: '',
    component: ListaRegisterPage
  },  
  { 
    path: ':id',
    component: ListaRegisterPage,
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ListaRegisterPageRoutingModule {}
