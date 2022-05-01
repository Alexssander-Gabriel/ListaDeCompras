import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MercadoListPageRoutingModule } from './mercado-list-routing.module';

import { MercadoListPage } from './mercado-list.page';
import { Ng2SearchPipeModule } from 'ng2-search-filter';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MercadoListPageRoutingModule,
    Ng2SearchPipeModule
  ],
  declarations: [MercadoListPage]
})
export class MercadoListPageModule {}
