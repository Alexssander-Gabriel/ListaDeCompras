import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MercadoRegisterPage } from './mercado-register.page';

const routes: Routes = [
  {
    path: '',
    component: MercadoRegisterPage
  },
  {
    path: ':id',
    component: MercadoRegisterPage,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MercadoRegisterPageRoutingModule {}
