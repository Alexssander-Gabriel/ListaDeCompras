import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ProdutoListPageRoutingModule } from './produto-list-routing.module';

import { ProdutoListPage } from './produto-list.page';

import { Ng2SearchPipeModule } from 'ng2-search-filter';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ProdutoListPageRoutingModule,
    Ng2SearchPipeModule
  ],
  declarations: [ProdutoListPage]
})
export class ProdutoListPageModule {}
