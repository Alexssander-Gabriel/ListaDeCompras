import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ActionSheetController, AlertController, ViewWillEnter } from '@ionic/angular';
import { Mercado } from 'src/app/model/mercado.model';
import { MercadoApiServiceService } from 'src/app/ServicesAPI/Mercado/mercado-api-service.service';
import { finalize } from 'rxjs/operators';
import { MessageService } from 'src/app/services/Mensagem/message.service';

@Component({
  selector: 'app-mercado-list',
  templateUrl: './mercado-list.page.html',
  styleUrls: ['./mercado-list.page.scss'],
})
export class MercadoListPage implements OnInit, ViewWillEnter  
 
 {
  mercados : Mercado[];
  consulta : string;
  loading : boolean;

  constructor(
    public actionSheetController: ActionSheetController,
    public alertController:  AlertController,
    private router: Router,
    private mercadoApiService : MercadoApiServiceService,
    private messageService: MessageService
  ) {
    this.loading = false;
    this.mercados = [];
  }

  ngOnInit() {
  }

  ionViewWillEnter(){
      this.listMercados();
  }

  listMercados(){
    this.loading = true; 
    this.mercadoApiService
     .getMercados()
     .pipe(
       finalize(() => {
         this.loading = false;
       })
     )
     .subscribe(
       (mercados) => {
           this.mercados = mercados;
           localStorage.setItem('listaMercados', JSON.stringify(mercados));        
          } ,
       () =>{
            this.mercados = JSON.parse(localStorage.getItem('listaMercados'));
            if (this.mercados.length == 0){
              this.messageService.error(`Erro ao carregar Itens.` ,()=>{
                // não esta funcionando mais deveria.
                this.listMercados();
              })
            } else {
              this.messageService.error(`Erro ao carregar itens do Servidor, Carregado itens do armazenamento interno, favor recarregar a página.`,()=>{});
            }
            //this.listMercados();
          }
         );
  }


  excluir(mercado: Mercado) {
    this.alertController
      .create({
        header: 'Exclusão',
        message: `Você deseja excluir o Mercado ${mercado.nome}?`,
        buttons: [
          {
            text: 'Sim',
            handler: () => {
              this.mercadoApiService
              .remove(mercado.id)
              .pipe(
                finalize(()=>{
                  this.loading = true;
                })
              )
              .subscribe(
                ()=>{
                  this.messageService.success(`Mercado ${mercado.nome} excluido com sucesso`);
                  this.listMercados();
                },
                ()=>{
                  this.messageService.error(`Erro ao excluir o Mercado ${mercado.nome}`,()=>{
                    this.excluir(mercado);
                  });
                  this.loading = true;       
                }
              )
            },
          },
          {
            text: 'Não',
          },
        ],
      })
      .then((alert) => alert.present());
  }
}
