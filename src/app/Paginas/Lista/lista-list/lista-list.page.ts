import { Component, OnInit  } from '@angular/core';
import { AlertController, ViewWillEnter } from '@ionic/angular';
import { Lista } from 'src/app/model/lista.model';
import { ListaApiService } from 'src/app/ServicesAPI/Lista/lista-api.service';
import { finalize } from 'rxjs/operators';
import { MessageService } from 'src/app/services/Mensagem/message.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-lista-list',
  templateUrl: './lista-list.page.html',
  styleUrls: ['./lista-list.page.scss'],
})

export class ListaListPage implements OnInit, ViewWillEnter
{
  listas : Lista[];
  loading : boolean;
  totalLista : number;


  constructor(
    private alertController : AlertController,
    private route : Router,
    private listaApiService : ListaApiService,
    private messageService : MessageService
  ) {
    this.listas = [];
    
   }

  ngOnInit() {
    this.listaApiService.armazenaTotalListas();
    this.totalLista = parseFloat(localStorage.getItem('totalLista'));
  }

  ionViewWillEnter(){
    this.listLista();
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
              this.listaApiService
              .remove(lista.id)
              .pipe(
                finalize(()=>{
                  this.loading = false;
                })
              )
              .subscribe(
                ()=>{
                  this.messageService.success(`Lista ${lista.descricao} excluida com sucesso`);
                  this.listLista();
                },
                ()=>{
                  this.messageService.error(`Erro ao excluir a Lista ${lista.descricao}`,()=>{
                  this.loading = false;
                    this.excluir(lista);
                  });    
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
       (listaCompra) => {
         this.listas = listaCompra;
        },
        (error)=>{
          this.messageService.error('Erro ao Carregar Lista do servidor',()=>{
          this.loading = true
          this.listLista();
          })  
        }
         );
  }

}
