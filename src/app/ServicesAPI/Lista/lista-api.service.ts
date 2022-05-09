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
    return this.httpClient.get<Lista[]>(`${environment.apiUrl}/listaCompras`);
  }

  remove(id: number): Observable<void> {
    return this.httpClient.delete<void>(`${environment.apiUrl}/listaCompras/${id}`);
  }

  findById(id: number): Observable<Lista> {
    return this.httpClient.get<Lista>(`${environment.apiUrl}/listaCompras/${id}`);
  }

  save(lista: Lista): Observable<Lista> {
    if(lista.id) {
      return this.httpClient.put<Lista>(`${environment.apiUrl}/listaCompras/${lista.id}`, lista);
    }
    return this.httpClient.post<Lista>(`${environment.apiUrl}/listaCompras`, lista);
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


}
