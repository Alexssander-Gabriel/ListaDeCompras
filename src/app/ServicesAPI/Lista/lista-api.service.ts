import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Lista, Produto } from 'src/app/app.module';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ListaApiService {

  constructor(private httpClient: HttpClient){ }

  getListaCompras(): Observable<Lista[]> {
    return this.httpClient.get<Lista[]>(`${environment.apiUrl}/listaCompras`);
  }

  remove(id: number): Observable<void> {
    return this.httpClient.delete<void>(`${environment.apiUrl}/listaCompras/${id}`);
  }

  findById(id: number): Observable<Lista> {
    return this.httpClient.get<Lista>(`${environment.apiUrl}/listaCompras/${id}`);
  }

   findAllProdutos(id: number): Observable<Produto[]> {
    return this.httpClient.get<Produto[]>(`${environment.apiUrl}/listaCompras/${id}/produtos`);
  }

  save(lista: Lista): Observable<Lista> {
    if(lista.id) {
      return this.httpClient.put<Lista>(`${environment.apiUrl}/listaCompras/${lista.id}`, lista);
    }
    return this.httpClient.post<Lista>(`${environment.apiUrl}/listaCompras`, lista);
  }
}
