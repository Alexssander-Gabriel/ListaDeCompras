import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ProdutoApiServiceService } from 'src/app/ServicesAPI/Produto/produto-api-service.service';
import { ListaApiService } from 'src/app/ServicesAPI/Lista/lista-api.service';
import { Chart } from 'chart.js';
import { MercadoApiServiceService } from 'src/app/ServicesAPI/Mercado/mercado-api-service.service';
import { ViewWillLeave, ViewWillEnter } from '@ionic/angular';
import { MessageService } from 'src/app/services/Mensagem/message.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.page.html',
  styleUrls: ['./dashboard.page.scss'],
})
export class DashboardPage implements OnInit, ViewWillEnter, ViewWillLeave {
  @ViewChild('barCanvas') public barcanvas : ElementRef;
  loading: boolean;
  barChart : any;
  PrcMedioLista: number;
  PrcMedioProduto: number;
  QtMercados : number;
  QtProdutos: number;
  QtListas : number;
  QtTotLista : number;
  labels = ['Higiene','Alimentos','Cosmético','Limpeza','Frutas e Legumes','Outros'];
  labelsValue = [0,0,0,0,0,0];
  
  ngOnInit() {
    this.loading = false;
    this.QtTotLista = 0.00;
  }

  ionViewWillEnter(){
    this.retornaResumo();
  }

  ionViewWillLeave(){
    localStorage.setItem('totalLista',''+ this.QtTotLista);
  }

  
  constructor(
    private listaApiService : ListaApiService,
    private produtoApiService: ProdutoApiServiceService,
    private mercadoApiService: MercadoApiServiceService,
    private messageService : MessageService
  ) {

   }

   barcanvasMethod(){
    this.barChart = new Chart(this.barcanvas.nativeElement,{
          type: 'bar',
          data: {
              labels: this.labels,
              datasets: [{
                  label: 'Produtos Por Categoria',
                  data: this.labelsValue, 
                  hoverBackgroundColor: 'blue',
                  backgroundColor: [
                    'rgba(255, 99, 132, 1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)',
                    'rgba(75, 192, 192, 1)',
                    'rgba(153, 102, 255, 1)',
                    'rgba(255, 159, 64, 1)'
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
              scales: {
                  y: {
                      beginAtZero: true
                  }
              },
              responsive: true
          }
      })
  }


  async retornaResumo(){
    this.PrcMedioProduto = 0.00;
    this.QtProdutos = 0;

    await this.produtoApiService
    .getProdutos()
     .subscribe(
       async (produtinho)=>{
         this.loading =true;
         await produtinho.forEach(element => {
          this.labelsValue[this.labels.indexOf(element.categoria)] += 1;
           this.QtProdutos += 1; 
           this.PrcMedioProduto += element.preco;
         });
        this.PrcMedioProduto = parseFloat( (this.PrcMedioProduto / this.QtProdutos).toFixed(2));
        
        let titulos = this.labels;
        let valores = this.labelsValue;
        this.labels = [];
        this.labelsValue = [];

        for (let ii = 0; ii <= valores.length; ii++){
          if (valores[ii] > 0) {
            this.labels.push(titulos[ii]);
            this.labelsValue.push(valores[ii]);
          }
        }
        this.barcanvasMethod();
        this.loading = false;
       },
       (error)=>{
        this.messageService.error('Erro ao Carregar dados do Servidor, Favor Recarregar a Página!',()=>{});
       }
     );

     this.PrcMedioLista = 0.00;
     this.QtListas = 0;

     await this.listaApiService.getListaCompras()
     .subscribe(async(lista)=>
     {      
       for await (const item of lista){
        this.loading = true;
        this.QtListas += 1;  
        await item.produtos.forEach(element => {
          this.PrcMedioLista += element.preco;
          this.QtTotLista += element.preco;
        });
      }
      this.PrcMedioLista = parseFloat((this.PrcMedioLista / this.QtListas).toFixed(2));
      this.loading = false;
     });

     this.QtMercados = 0;
     await this.mercadoApiService.findAll()
     .subscribe((mercado)=>{
       this.loading = true;
       mercado.forEach(element => {
         this.QtMercados += 1;
       });
       this.loading = false;
     });
  }

}
