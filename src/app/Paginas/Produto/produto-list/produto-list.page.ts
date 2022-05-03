import { Component, OnInit } from '@angular/core';
import { Produto } from 'src/app/model/produto.model';
import { ActionSheetController, AlertController ,  ViewWillEnter } from '@ionic/angular';
import { finalize } from 'rxjs/operators';
import { Router } from '@angular/router';
import { ProdutoApiServiceService } from 'src/app/ServicesAPI/Produto/produto-api-service.service';
import { MessageService } from 'src/app/services/Mensagem/message.service';

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
        },
       () =>{
            this.messageService.error(`Não foi possível carregar os itens.`,()=>{                   
            this.loading = true;
            });        
            this.listProdutos();
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
          //console.log('Editar Clicado');
          this.router.navigate(['/produto-register', produto.id]);
        }
      },{
        text: 'Deletar',
        role: 'destructive',
        icon: 'trash',
        handler:() => {
          //console.log('Deletar Clicado');
          this.excluir(produto);
        }
      },
      {
        text: 'Cancel',
        icon: 'close',
        role: 'cancel',
        handler: () => {
          //console.log('Cancelar Clicado');
        }
      }]
    });
    await actionSheet.present();

    ///const { role } = await actionSheet.onDidDismiss();
    //console.log('onDidDismiss resolved with role', role);
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
