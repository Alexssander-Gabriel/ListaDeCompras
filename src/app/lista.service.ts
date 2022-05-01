import { Injectable } from '@angular/core';
import { Atendimento, Categoria, Lista, Tipo, Unidade } from './app.module';

@Injectable({
  providedIn: 'root'
})
export class ListaService {
  private lista : Lista[];
  private contador = 2;

  constructor() {
    this.lista = [
      {
        "id": 1,
        "descricao": "Primeira Lista",
        "produtos":[
          {
            "id": 2,
            "descricao": "Tomate",
            "categoria": Categoria.F,
            "preco": 8.9,
            "foto": "https://www.drogariaminasbrasil.com.br/media/product/075/extrato-de-tomate-concentrado-sache-fugini-340g-48a.jpg",
            "unidade": Unidade.KG
          }       
        ],
        "mercado":[
          {
            "id": 1,
            "nome": "Pellegrim2",
            "endereco": "Morro da fumaça",
            "contato": "99999-7070",
            "foto": "https://bpm.com.br/wp-content/uploads/2017/10/imagemobra_640x480-2-9.jpg",
            "atendimento": Atendimento.FF
           },
        ],
        "categoria": Tipo.CB      
      }
    ]
   }

   public getLista(){
     return this.lista;
   }


  public remove(nome: string) {
    this.lista = this.lista.filter((lista) => lista.descricao !== nome);
  }

  public save(lista: Lista) {
    if (lista.id) {
      const index = this.lista.findIndex(g => g.id === lista.id);
      this.lista[index] = lista;
    } else {
      const id = this.contador++;
      this.lista.push({ ...lista, id });
    }
  }

  public findById(id: number) {
    return this.lista.find(game => game.id === id);
  }
}
