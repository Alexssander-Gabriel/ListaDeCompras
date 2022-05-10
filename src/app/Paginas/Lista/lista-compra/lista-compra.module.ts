import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ListaCompraPageRoutingModule } from './lista-compra-routing.module';

import { ListaCompraPage } from './lista-compra.page';
import { Ng2SearchPipeModule } from 'ng2-search-filter';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    Ng2SearchPipeModule,
    ListaCompraPageRoutingModule
  ],
  declarations: [ListaCompraPage]
})
export class ListaCompraPageModule {}
