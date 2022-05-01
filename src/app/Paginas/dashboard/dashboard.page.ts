import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Lista, Produto } from 'src/app/app.module';
import { ProdutoApiServiceService } from 'src/app/ServicesAPI/Produto/produto-api-service.service';
import { ListaApiService } from 'src/app/ServicesAPI/Lista/lista-api.service';
import { Chart } from 'chart.js';
import { ThrowStmt } from '@angular/compiler';
import { convertToParamMap } from '@angular/router';
import { MercadoApiServiceService } from 'src/app/ServicesAPI/Mercado/mercado-api-service.service';
//import {  } from 'ng2-charts';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.page.html',
  styleUrls: ['./dashboard.page.scss'],
})
export class DashboardPage implements OnInit {
  @ViewChild('barCanvas') public barcanvas : ElementRef;
  barChart : any;
  PrcMedioLista: number;
  PrcMedioProduto: number;
  QtMercados : number;
  labels = ['Higiene','Alimentos','Cosmético','Limpeza','Frutas e Legumes','Outros'];
  labelsValue = [0,0,0,0,0,0];

  ionViewWillEnter(){
    this.retornaResumo();
    //this.barcanvasMethod();
  }

  barcanvasMethod(){
    this.barChart = new Chart(this.barcanvas.nativeElement,{
          type: 'bar',
          
          data: {
              labels: this.labels,
              //labels : ['Higiene', 'Alimentos', 'Cosmético', 'Limpeza', 'Frutas e Legumes', 'Outros'],
              //label: this.labels,
              datasets: [{
                  //barPercentage: 0.8,
                  //barThickness: 'flex',
                  label: 'Produtos Por Categoria',
                  data: this.labelsValue, 
                  //data: [12, 19, 3, 5, 2, 3],
                  hoverBackgroundColor: 'blue',
                  backgroundColor: [
                      'rgba(255, 99, 132, 0.2)',
                      'rgba(54, 16  2, 235, 0.2)',
                      'rgba(255, 206, 86, 0.2)',
                      'rgba(75, 192, 192, 0.2)',
                      'rgba(153, 102, 255, 0.2)',
                      'rgba(255, 159, 64, 0.2)'
                  ],
                  borderColor: [
                      'rgba(255, 99, 132, 1)',
                      'rgba(54, 162, 235, 1)',
                      'rgba(255, 206, 86, 1)',
                      'rgba(75, 192, 192, 1)',
                      'rgba(153, 102, 255, 1)',
                      'rgba(255, 159, 64, 1)'
                  ],
                  
                  borderWidth: 0.5,
                  
              }]
          },
          options: {
              color: 'blue',
              
              backgroundColor: 'blue',
              scales: {
                  y: {
                      beginAtZero: true
                  }
              },
              responsive: true
          }
      })
  }


  produtos : Produto[];
  listas : Lista;
  loading: boolean;
  QtProdutos: number;
  QtListas : number;
  
  constructor(
    private listaApiService : ListaApiService,
    private produtoApiService: ProdutoApiServiceService,
    private mercadoApiService: MercadoApiServiceService
  ) {
    //this.loadDados();
    ///this.retornaResumo();
   }

  ngOnInit() {
    this.loading = false;
    //this.retornaResumo();
    //this.barcanvasMethod();

  }

  loadDados(){
    this.listaApiService
     .findById(1)
      .subscribe(
        (lista)=>{
          this.listas = lista;
          console.log(lista.descricao)
        }
      )
  }

  retornaResumo(){
    this.PrcMedioProduto = 0.00;
    
    //this.labels = ['Higiene','Alimento','Cosmético','Limpeza','Frutas e Legumes','Outros'];

    this.produtoApiService
    .getProdutos()
     .subscribe(
       (produtinho)=>{
         this.loading =true;
         let quantidade = 0;
         let valor = 0;
         produtinho.forEach(element => {
          if (this.labels.indexOf(element.categoria)> -1){
            console.log('numero :' + this.labels.indexOf(element.categoria)+'  categoria ' + element.categoria );
          }
          this.labelsValue[this.labels.indexOf(element.categoria)] += 1;
          //this.labelsValue[this.labels.indexOf(element.categoria)]
          
           quantidade += 2;
           valor+= element.preco;
           this.PrcMedioProduto += element.preco;
           
           

         });
         this.QtProdutos = quantidade;
         this.PrcMedioProduto = parseFloat( (this.PrcMedioProduto / quantidade).toFixed(2));
        this.produtos = produtinho;
        this.loading = false;
        console.log('consegui aqui>:',this.labelsValue);
        for (let ii = 0; ii <= this.labelsValue.length; ii++){
          if (this.labelsValue[ii] <= 0){
            this.labels[ii] = undefined;
            this.labelsValue[ii] = undefined;
            console.log('ta chegando')
          }
        }
        this.barcanvasMethod();
       }
     );



     this.PrcMedioLista = 0.00;
     let precolista = 0.00;
     this.QtListas = 0;
     this.listaApiService.getListaCompras()
     .subscribe(async(lista)=>
     {      
       for await (const item of lista){
        this.loading = true;
        this.QtListas += 1;
         
         const awaitListProdutos  =  await this.listaApiService.findAllProdutos(item.id);
         awaitListProdutos.forEach(element => {
          element.forEach(element => {
            console.log(element.preco);
            precolista += element.preco;
            console.log('aqui', precolista);

          });

          this.PrcMedioLista =  parseFloat((precolista / this.QtListas).toFixed(2));
          console.log('finalll',this.PrcMedioLista);
          this.loading = false;
         });            
      }
     });

     this.QtMercados = 0;
     this.mercadoApiService.findAll()
     .subscribe((mercado)=>{
       this.loading = true;
       mercado.forEach(element => {
         this.QtMercados += 1;
       });
       this.loading = false;
     });

     console.log('labels', this.labels);
     console.log('labelsValue', this.labelsValue);
     //this.barcanvasMethod();

  }

}
