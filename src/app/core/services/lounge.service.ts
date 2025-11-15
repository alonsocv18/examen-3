import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class LoungeService {
  private url = environment.apiUrl + '/api/rest/lounge';

  constructor(private http: HttpClient) {}

  getLounges(lounge_name?: string, store_id?: number): Observable<any> {
    const body: any = {};
    if (lounge_name) body.lounge_name = lounge_name;
    if (store_id) body.store_id = store_id;

    return this.http.post<any>(`${this.url}/getLounges`, body);
  } // Crear nuevo salón (POST)
  createLounge(data: any): Observable<any> {
    return this.http.post(`${this.url}/lounge`, data);
  }

  // Actualizar salón (PUT)
  updateLounge(data: any): Observable<any> {
    return this.http.put(`${this.url}/lounge`, data);
  }
}
