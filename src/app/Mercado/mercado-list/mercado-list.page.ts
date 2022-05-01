import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { ActionSheetController, AlertController,
  ViewDidEnter,
  ViewDidLeave,
  ViewWillEnter,
  ViewWillLeave
} from '@ionic/angular';
import { Mercado } from 'src/app/app.module';
import { MercadoService } from 'src/app/mercado.service';
import { MercadoApiServiceService } from 'src/app/ServicesAPI/Mercado/mercado-api-service.service';
import { finalize } from 'rxjs/operators';
import { MessageService } from 'src/app/services/message.service';

@Component({
  selector: 'app-mercado-list',
  templateUrl: './mercado-list.page.html',
  styleUrls: ['./mercado-list.page.scss'],
})
export class MercadoListPage implements
OnInit,
OnDestroy,
ViewWillEnter,
ViewDidEnter,
ViewWillLeave,
ViewDidLeave  
 
 {
  mercados : Mercado[];
  consulta : string;
  loading : boolean;

  constructor(
    public actionSheetController: ActionSheetController,
    public alertController:  AlertController,
    private router: Router,
    private mercadoService : MercadoService,
    private mercadoApiService : MercadoApiServiceService,
    private messageService: MessageService
  ) {
    //this.mercados = this.mercadoService.getMercados();

    this.loading = false;
    this.mercados = [];
  }

  ngOnInit() {
  }

  ionViewDidEnter(): void {
    console.log('GamesListPage ionViewDidEnter');
  }

  ngOnDestroy(): void {
    console.log('GamesListPage ngOnDestroy');
  }

  ionViewWillLeave(): void {
    console.log('GamesListPage ionViewWillLeave');
  }

  ionViewDidLeave(): void {
    console.log('GamesListPage ionViewDidLeave');
  }

  ionViewWillEnter(): void {
    this.listMercados();
    console.log('GamesListPage ionViewWillEnter');
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
       (mercados) => (this.mercados = mercados),
       () =>{
          //{alert('Erro ao buscar a lista de games')};
          //this.messageService.error('Erro ao buscar a lista de games', () =>
           this.listMercados();
           this.loading = false;
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
              //this.mercadoService.remove(mercado.nome);
              //this.mercados = this.mercadoService.getMercados();
              this.mercadoApiService
              .remove(mercado.id)
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
