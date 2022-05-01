import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  constructor(
    private router: Router
  ) {

  }

  public items =[
    {icon :'basket-outline' , text: 'Produtos' , rota: '../produto-list'},
    {icon :'clipboard-outline' , text: 'Lista de Compras' , rota: '../lista-list'},
    {icon :'storefront-outline' , text: 'Mercados' , rota: '../mercado-list'},
    {icon :'bar-chart-outline' , text: 'DashBoard' , rota: '../dashboard'}
  ]

}
