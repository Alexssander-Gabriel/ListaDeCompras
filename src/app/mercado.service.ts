import { Injectable } from '@angular/core';
import { Mercado, Atendimento } from 'src/app/app.module';

@Injectable({
  providedIn: 'root'
})
export class MercadoService {
  private mercado : Mercado[];
  private contador = 6; 

  constructor() {
    this.mercado = [
      {
        id: 1,
        nome: 'Pellegrim',
        endereco: 'Morro da fumaça',
        contato: '99999-7070',
        foto: 'https://bpm.com.br/wp-content/uploads/2017/10/imagemobra_640x480-2-9.jpg',
        atendimento: Atendimento.FF
      },
      {
        id: 2,
        nome: 'Macarri',
        endereco: 'Morro da fumaça',
        contato: '96729-6578',
        foto: 'https://lh5.googleusercontent.com/p/AF1QipOF8f_YgAV5yg23McxPmvNScMSfYqh_j_fmqV_6=w1080-k-no',
        atendimento: Atendimento.FF
      },
      {
        id: 3,
        nome: 'Mercado Polla',
        endereco: 'Morro da fumaça',
        contato: '99821-8564',
        foto: 'https://lh5.googleusercontent.com/p/AF1QipMKfeiYA7l3CzZO-IE8dpF8lT6d5Ho9qC_M04Oy=w1080-k-no',
        atendimento: Atendimento.FS
      },
      {
        id: 4,
        nome: 'Giassi',
        endereco: 'Criciúma',
        contato: '99849-5128',
        foto: 'https://www.giassi.com.br/upload/notice_image/2017/08/2017_jaragua02.jpg',
        atendimento: Atendimento.FF
      },
      {
        id: 5,
        nome: 'Angeloni',
        endereco: 'Criciuma',
        contato: '98549-7070',
        foto: 'https://fastly.4sqi.net/img/general/600x600/IyL_6EZexN8TIeZl5yejpQC5LH_ohr7W81YVlK3x4MQ.jpg',
        atendimento: Atendimento.FF
      },
    ];
   }

   public getMercados(){
     return this.mercado;
   }

   public remove(nome: string) {
    this.mercado = this.mercado.filter((game) => game.nome !== nome);
  }

  public save(game: Mercado) {
    if (game.id) {
      const index = this.mercado.findIndex(g => g.id === game.id);
      this.mercado[index] = game;
    } else {
      const id = this.contador++;
      this.mercado.push({ ...game, id });
    }
  }

  public findById(id: number) {
    return this.mercado.find(game => game.id === id);
  }


}
