import { Component, OnInit  } from '@angular/core';
import { AlertController, ViewWillEnter } from '@ionic/angular';
import { Lista } from 'src/app/model/lista.model';
import { ListaApiService } from 'src/app/ServicesAPI/Lista/lista-api.service';
import { finalize } from 'rxjs/operators';
import { MessageService } from 'src/app/services/Mensagem/message.service';

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
    private listaApiService : ListaApiService,
    private messageService : MessageService
  ) {
    this.listas = [];
    
   }

  ngOnInit() {
    this.listaApiService.armazenaTotalListas();
    this.totalLista = parseFloat(localStorage.getItem('totalLista'));
    //this.totalLista = this.listaApiService.retornaTotalListas();
  }

  ionViewWillEnter(){
    this.listLista();
    this.listaApiService.armazenaTotalListas();
    //this.totalLista = this.listaApiService.retornaTotalListas();
    this.totalLista = parseFloat(localStorage.getItem('totalLista'));
  }


  excluir(lista: Lista) {
    this.alertController
      .create({
        header: 'Exclusão',
        message: `Você deseja excluir a Lista ${lista.descricao}?`,
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
                (ex)=>{
                  var mensagem = ex.error.error;
                  this.messageService.error(`${mensagem}`,()=>{
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
         localStorage.setItem('listaListas', JSON.stringify(listaCompra));
        },
        (error)=>{
          this.listas = JSON.parse(localStorage.getItem('listaListas'));  
          if (this.listas.length == 0) {
            this.messageService.error(`Erro ao carregar Itens.` ,()=>{
              this.listLista();
            })
          } else {
            this.messageService.error(`Erro ao carregar itens do Servidor, Carregado itens do armazenamento interno, favor recarregar a página.`,()=>{});
          } 
        }
         );
  }

}
