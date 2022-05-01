import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ListaRegisterPageRoutingModule } from './lista-register-routing.module';

import { ListaRegisterPage } from './lista-register.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReactiveFormsModule,
    ListaRegisterPageRoutingModule
  ],
  declarations: [ListaRegisterPage]
})
export class ListaRegisterPageModule {}
