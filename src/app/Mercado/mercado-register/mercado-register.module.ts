import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MercadoRegisterPageRoutingModule } from './mercado-register-routing.module';

import { MercadoRegisterPage } from './mercado-register.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReactiveFormsModule,
    MercadoRegisterPageRoutingModule
  ],
  declarations: [MercadoRegisterPage]
})
export class MercadoRegisterPageModule {}
