import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ProdutoRegisterPage } from './produto-register.page';

const routes: Routes = [
  {
    path: '',
    component: ProdutoRegisterPage
  },
  {
    path: ':id',
    component: ProdutoRegisterPage,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProdutoRegisterPageRoutingModule {}
