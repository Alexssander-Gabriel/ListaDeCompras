import { Component, OnInit } from '@angular/core';
import { finalize } from 'rxjs/operators';
import { Categoria } from 'src/app/model/enums';
import { Lista } from 'src/app/model/lista.model';
import { Produto } from 'src/app/model/produto.model';
import { ListaApiService } from 'src/app/ServicesAPI/Lista/lista-api.service';
import { ActivatedRoute } from '@angular/router'; 

@Component({
  selector: 'app-lista-compra',
  templateUrl: './lista-compra.page.html',
  styleUrls: ['./lista-compra.page.scss'],
})
export class ListaCompraPage implements OnInit {
  loading : boolean;
  quantidades : [];
  lista : Lista;
  Produtos : Produto[];
  consulta : string;
  categoriazinha: ['Higiene','Alimentos','Cosmético','Limpeza','Frutas e Legumes','Outros'];

  constructor(
    private route : ActivatedRoute,
    private listaApiService : ListaApiService
  ) { }

  ngOnInit() {
    this.loading = false;
    this.Produtos = [];
    this.route.params.subscribe((parametros)=>{
      if(parametros['id']){
        this.listLista(parametros['id']);
      };
    });
  }

  listLista(id: number){
    this.loading = true; 
    this.listaApiService
     .findById(id)
     .pipe(
       finalize(() => {
         this.loading = false;
       })
     )
     .subscribe(
        async(listaCompra) => {
          await listaCompra.produtos
          .sort((a : Produto,b: Produto)=>{
            let x =  a.categoria.toUpperCase().trim();
            let y = b.categoria.toUpperCase().trim();
            return x == y ? 0 : x > y ?  1 : -1;
            } 
            )
          .forEach(element => {
              this.Produtos.push(element);
              console.log(element.categoria)
              //element.descricao
          });

          },
          (error)=>{
          }
         );

         console.log(this.lista); 
  }

  addProduto(id: number){

  }

  removeProduto(id : number){

  }
}
