import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ListaListPage } from './lista-list.page';

const routes: Routes = [
  {
    path: '',
    component: ListaListPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ListaListPageRoutingModule {}
