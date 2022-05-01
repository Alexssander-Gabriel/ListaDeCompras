import { NgModule, CUSTOM_ELEMENTS_SCHEMA, Component } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';

import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { HttpClientModule } from '@angular/common/http';

import { NgChartsModule } from 'ng2-charts';

@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [BrowserModule, 
            IonicModule.forRoot(), 
            AppRoutingModule, 
            Ng2SearchPipeModule, 
            HttpClientModule,
            NgChartsModule
            ],
  providers: [{ provide: RouteReuseStrategy, useClass: IonicRouteStrategy}],
  bootstrap: [AppComponent],
})
export class AppModule {}

export enum Categoria{
  H = 'Higiene',
  A = 'Alimentos',
  C = 'Cosmético',
  L = 'Limpeza',
  F = 'Frutas e Legumes',
  O = 'Outros'
}

export enum Unidade{
  PC = 'Peça',
  KG = 'Kilo',
  CX = 'Caixa',
  SC = 'Saco',
  GR = 'Gramas',
  MT = 'Metros',
  UN = 'Unidade'
}


export interface Produto {
  id: number;
  descricao: string;
  categoria : Categoria;
  preco: number;
  foto: string;
  unidade : Unidade;
}

export interface Lista {
  id: number;
  descricao: string;
  produtos: Produto[];
  mercado: Mercado[];
  categoria: Tipo; 
}

export enum Tipo{
  RA = 'Rancho',
  RE = 'Receita',
  CB = 'Compras Básicas'
}

export interface Mercado {
  id: number;
  nome: string;
  endereco : string;
  contato: string;
  foto: string;
  atendimento : Atendimento;
}

export enum Atendimento{
  FS = 'Finais de Semana',
  FF = 'Finais de Semana e Feriados',
  SA = 'Segunda a Sexta'
}