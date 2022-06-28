import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { DashBoard } from 'src/app/model/dashboard.model';

@Injectable({
  providedIn: 'root'
})
export class DashBoardService {

  constructor(private httpClient: HttpClient){ }

  getDashBoard(): Observable<DashBoard> {
    return this.httpClient.get<DashBoard>(`${environment.apiUrl}/dashboard`);
  }
}
