import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ListaListPageRoutingModule } from './lista-list-routing.module';

import { ListaListPage } from './lista-list.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ListaListPageRoutingModule
  ],
  declarations: [ListaListPage]
})
export class ListaListPageModule {}
