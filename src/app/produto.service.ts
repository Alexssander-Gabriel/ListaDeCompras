import { Injectable } from '@angular/core';
import { Produto, Categoria, Unidade } from 'src/app/app.module';

@Injectable({
  providedIn: 'root'
})

export class ProdutoService {
  private produto : Produto[];
  private contador = 4;


  constructor() { 
    this.produto = [
      {id: 1,
       descricao:  'Frango Assado',
       categoria : Categoria.A,
       preco: 50.00,
       foto: 'https://www.kitano.com.br/wp-content/uploads/2019/07/SSP_2480-Frango-assado-com-salsa-e-cebolinha-1.jpg',
       unidade : Unidade.UN
      },
      {id: 2,
        descricao:  'Tomate',
        categoria : Categoria.F,
        preco: 8.90,
        foto: 'https://www.drogariaminasbrasil.com.br/media/product/075/extrato-de-tomate-concentrado-sache-fugini-340g-48a.jpg',
        unidade : Unidade.KG,
       },
       {id: 3,
        descricao:  'Arroz Branco',
        categoria : Categoria.A,
        preco: 5.90,
        foto: 'https://statics.angeloni.com.br/super/files/produtos/2132168/2132168_1_zoom.jpg',
        unidade : Unidade.KG,
       }
    ];
  }

  public getProduto(consulta?: string){
    if (consulta || consulta !== undefined) {
      if ((this.produto.filter((produto) => produto.descricao.indexOf(consulta) > -1))){
        console.log(this.produto.filter((produto) => produto.descricao.indexOf(consulta) > -1));
      } else{
        console.log(this.produto);
      }
      //return this.produto = this.produto.filter((produto) => produto.descricao.indexOf(consulta) > -1);
      console.log(this.produto.filter((produto) => produto.descricao.indexOf(consulta) > -1));
    } else {
    }
    return this.produto;
  }

  public getProdutoPesquisa(nome : string){

    this.produto = this.produto.filter((produto) => produto.descricao.indexOf(nome) > -1);
    console.log(this.produto = this.produto.filter((produto) => produto.descricao.indexOf(nome) > -1));
    console.log(nome);
  }

  public save(produto: Produto) {
    if (produto.id) {
      const index = this.produto.findIndex(g => g.id === produto.id);
      this.produto[index] = produto;
    } else {
      const id = this.contador++;
      this.produto.push({ ...produto, id });
    }
  }

  public findById(id: number) {
    return this.produto.find(produto => produto.id === id);
  }

   public remove(nome: string) {
    this.produto = this.produto.filter((produto) => produto.descricao !== nome);
   }
}
