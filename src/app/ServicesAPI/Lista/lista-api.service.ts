import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Lista } from 'src/app/model/lista.model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ListaApiService {

  constructor(private httpClient: HttpClient){
    this.armazenaTotalListas();
   }

  getListaCompras(): Observable<Lista[]> {
    return this.httpClient.get<Lista[]>(`${environment.apiUrl}/listas`);
  }

  remove(id: number): Observable<void> {
    return this.httpClient.delete<void>(`${environment.apiUrl}/listas/${id}`);
  }

  findById(id: number): Observable<Lista> {
    return this.httpClient.get<Lista>(`${environment.apiUrl}/listas/${id}`);
  }

  save(lista: Lista): Observable<Lista> {
    if(lista.id) {
      return this.httpClient.put<Lista>(`${environment.apiUrl}/listas/${lista.id}`, lista);
    }
    return this.httpClient.post<Lista>(`${environment.apiUrl}/listas`, lista);
  }

  armazenaTotalListas(){
    let totalLista = 0.00;
    this.getListaCompras().subscribe(async(lista)=>{
      await this.getListaCompras()
      .subscribe(async(lista)=>
      {      
        for await (const item of lista){
         await item.produtos.forEach(element => {
           totalLista += element.preco;
         });
       }
       localStorage.setItem('totalLista',''+ totalLista.toFixed(2));
      });
    })
  }

  retornaTotalListas(): number{
    var retorno = 0.00;
    this.getListaCompras().subscribe((lista)=>{
      for (const item of lista) {
        item.produtos.forEach(e => {
          retorno += e.preco;
        })
      }
    });
    return retorno;
  }


}
