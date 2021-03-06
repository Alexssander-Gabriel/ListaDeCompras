import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Produto } from 'src/app/model/produto.model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProdutoApiServiceService {

  constructor(private httpClient: HttpClient){ }

  getProdutos(): Observable<Produto[]> {
    return this.httpClient.get<Produto[]>(`${environment.apiUrl}/produtos`);
  }

  remove(id: number): Observable<void> {
    return this.httpClient.delete<void>(`${environment.apiUrl}/produtos/${id}`);
  }

  findById(id: number): Observable<Produto> {
    return this.httpClient.get<Produto>(`${environment.apiUrl}/produtos/${id}`);
  }
  

  save(produto: Produto): Observable<Produto> {
    console.log(produto);
    if(produto.id) {
      return this.httpClient.put<Produto>(`${environment.apiUrl}/produtos/${produto.id}`, produto);
    }
    return this.httpClient.post<Produto>(`${environment.apiUrl}/produtos`, produto);
  }
}



