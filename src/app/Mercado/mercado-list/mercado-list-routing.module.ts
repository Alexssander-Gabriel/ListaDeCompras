import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MercadoListPage } from './mercado-list.page';

const routes: Routes = [
  {
    path: '',
    component: MercadoListPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MercadoListPageRoutingModule {}
