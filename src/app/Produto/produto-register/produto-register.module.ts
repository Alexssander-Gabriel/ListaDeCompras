import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ProdutoRegisterPageRoutingModule } from './produto-register-routing.module';

import { ProdutoRegisterPage } from './produto-register.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReactiveFormsModule,
    ProdutoRegisterPageRoutingModule
  ],
  declarations: [ProdutoRegisterPage]
})
export class ProdutoRegisterPageModule {}
