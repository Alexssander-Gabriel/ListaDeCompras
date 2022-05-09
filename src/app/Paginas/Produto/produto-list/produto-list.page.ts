import { Component, OnInit } from '@angular/core';
import { Produto } from 'src/app/model/produto.model';
import { ActionSheetController, AlertController ,  ViewWillEnter } from '@ionic/angular';
import { finalize } from 'rxjs/operators';
import { Router } from '@angular/router';
import { ProdutoApiServiceService } from 'src/app/ServicesAPI/Produto/produto-api-service.service';
import { MessageService } from 'src/app/services/Mensagem/message.service';
import { JsonpClientBackend } from '@angular/common/http';

@Component({
  selector: 'app-produto-list',
  templateUrl: './produto-list.page.html',
  styleUrls: ['./produto-list.page.scss'],
})

export class ProdutoListPage implements OnInit, ViewWillEnter  
  {
  produtos : Produto[];
  consulta : string;
  loading : boolean;
  carregaLista : number;


  constructor(
    private produtosApiserice : ProdutoApiServiceService,
    public actionSheetController: ActionSheetController,
    public alertController:  AlertController,
    private messageService: MessageService,
    private router: Router
    ) {
      this.loading = false;
      this.produtos = [];
   }

  ngOnInit() {
  }

  ionViewWillEnter(): void {
    this.listProdutos();
  }

  listProdutos(){
    this.loading = true; 
    this.produtosApiserice
     .getProdutos()
     .pipe(
       finalize(() => {
         this.loading = false;
       })
     )
     .subscribe(
       (produtos) => {
          this.produtos = produtos;
          localStorage.setItem('listaProdutos',JSON.stringify(this.produtos));
        },
       async (error) =>{
        this.produtos = JSON.parse(localStorage.getItem('listaProdutos')); 
        if(this.produtos.length == 0){
          await this.messageService.error('Não foi possível buscar itens do armazenamento interno.',()=>{});
         } else {
           await this.messageService.error('Não foi possível Carregar os itens do servidor! Carregado Itens do armazenamento Interno.',()=>{});
         } 
            
          }
         );
  }
  
  async abrirListaAcao(produto : Produto) {
    
    const actionSheet = await this.actionSheetController.create({
      header: `${produto.descricao}`,
      cssClass: 'my-custom-class',
      buttons: [{
        text: 'Editar',
        role: 'destructive',
        icon: 'pencil',
        handler: () => {
          this.router.navigate(['/produto-register', produto.id]);
        }
      },{
        text: 'Deletar',
        role: 'destructive',
        icon: 'trash',
        handler:() => {
          this.excluir(produto);
        }
      },
      {
        text: 'Cancel',
        icon: 'close',
        role: 'cancel',
        handler: () => {
        }
      }]
    });
    await actionSheet.present();
  }



  excluir(produto: Produto) {
    this.loading = true;
    
    this.alertController
      .create({
        header: 'Exclusão',
        message: `Você deseja excluir o Produto ${produto.descricao}?`,
        buttons: [
          {
            text: 'Sim',
            handler: () => {
              this.produtosApiserice
                .remove(produto.id)
                .pipe(
                  finalize(() => {
                    this.loading = false;
                  })
                )
                .subscribe(
                  ()=>{
                    this.messageService.success(`Produto ${produto.descricao} excluido com sucesso`);
                    this.listProdutos();
                  },
                  ()=>{
                      this.messageService.error(`Erro ao excluir o Produto ${produto.descricao}`,()=>{                   
                      this.loading = true;
                      this.excluir(produto);
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

  /*
  getPesquisaProduto(consulta : any){
    let nome = consulta.target.value; 
    if (nome && nome.trim() != '' ){
      this.produtos = this.produtoService.getProduto(nome);
     // console.log('Filtrado pelo nome:'+ nome);
    } else {
      this.produtos = this.produtoService.getProduto();
    //  console.log('Não encontrado');
    }
    
  }
  */


}
