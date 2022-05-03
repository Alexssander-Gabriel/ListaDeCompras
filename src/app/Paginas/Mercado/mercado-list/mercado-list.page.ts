import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ActionSheetController, AlertController } from '@ionic/angular';
import { Mercado } from 'src/app/model/mercado.model';
import { MercadoApiServiceService } from 'src/app/ServicesAPI/Mercado/mercado-api-service.service';
import { finalize } from 'rxjs/operators';
import { MessageService } from 'src/app/services/Mensagem/message.service';

@Component({
  selector: 'app-mercado-list',
  templateUrl: './mercado-list.page.html',
  styleUrls: ['./mercado-list.page.scss'],
})
export class MercadoListPage implements OnInit  
 
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
          } ,
       () =>{
            this.loading = true;   
            this.listMercados();
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
