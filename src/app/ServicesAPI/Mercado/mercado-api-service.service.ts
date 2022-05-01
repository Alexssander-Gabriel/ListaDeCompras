import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Mercado } from 'src/app/app.module';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class MercadoApiServiceService {

  constructor(private httpClient: HttpClient){ }

  getMercados(): Observable<Mercado[]> {
    return this.httpClient.get<Mercado[]>(`${environment.apiUrl}/mercados`);
  }

  remove(id: number): Observable<void> {
    return this.httpClient.delete<void>(`${environment.apiUrl}/mercados/${id}`);
  }

  findById(id: number): Observable<Mercado> {
    return this.httpClient.get<Mercado>(`${environment.apiUrl}/mercados/${id}`);
  }

 
  findAll(): Observable<Mercado[]> {
    return this.httpClient.get<Mercado[]>(`${environment.apiUrl}/mercados`);
  }

  save(mercado: Mercado): Observable<Mercado> {
    if(mercado.id) {
      return this.httpClient.put<Mercado>(`${environment.apiUrl}/mercados/${mercado.id}`, mercado);
    }
    return this.httpClient.post<Mercado>(`${environment.apiUrl}/mercados`, mercado);
  }
}
