import { Component, OnInit, OnDestroy } from '@angular/core';
import { AlertController,
  ViewDidEnter,
  ViewDidLeave,
  ViewWillEnter,
  ViewWillLeave, } from '@ionic/angular';
import { Lista } from 'src/app/app.module';
import { ListaService } from 'src/app/lista.service' 
import { ListaApiService } from 'src/app/ServicesAPI/Lista/lista-api.service';
import { finalize } from 'rxjs/operators';
import { MessageService } from 'src/app/services/message.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-lista-list',
  templateUrl: './lista-list.page.html',
  styleUrls: ['./lista-list.page.scss'],
})
export class ListaListPage implements 
OnInit, 
OnDestroy,
ViewWillEnter,
ViewDidEnter,
ViewWillLeave,
ViewDidLeave 
{
  listas : Lista[];
  loading : boolean;


  constructor(
    private alertController : AlertController,
    private route : Router,
    //private listaService : ListaService,
    private listaApiService : ListaApiService,
    private messageService : MessageService
  ) {
    //this.listas = this.listaService.getLista();
    this.listas = [];
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
    this.listLista();
    console.log('GamesListPage ionViewWillEnter');
  }

  excluir(lista: Lista) {
    this.alertController
      .create({
        header: 'Exclusão',
        message: `Você deseja excluir o game ${lista.descricao}?`,
        buttons: [
          {
            text: 'Sim',
            handler: () => {
              //this.listaService.remove(lista.descricao);
              //this.listas = this.listaService.getLista();
              this.listaApiService
              .remove(lista.id)
              .subscribe(
                ()=>{
                  this.messageService.success(`Lista ${lista.descricao} excluida com sucesso`);
                  this.listLista();
                },
                ()=>{
                  this.messageService.error(`Erro ao excluir a Lista ${lista.descricao}`,()=>{
                    this.excluir(lista);
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

  listLista(){
    this.loading = true; 
    this.listaApiService
     .getListaCompras()
     .pipe(
       finalize(() => {
         this.loading = false;
       })
     )
     .subscribe(
       (listaCompra) => (this.listas = listaCompra),
       () =>{
          //{alert('Erro ao buscar a lista de games')};
          //this.messageService.error('Erro ao buscar a lista de games', () =>
           this.listLista();
           this.loading = false;
          }
         );
  }




}
