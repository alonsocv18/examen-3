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

  // Obtener todos los salones (GET con filtros opcionales)
  getLounges(lounge_name?: string, store_id?: number): Observable<any> {
    let params = new HttpParams();
    if (lounge_name) params = params.set('lounge_name', lounge_name);
    if (store_id) params = params.set('store_id', store_id.toString());

    return this.http.get<any>(`${this.url}/getLounges`, { params });
  }

  // Crear nuevo salón (POST)
  createLounge(data: any): Observable<any> {
    return this.http.post(`${this.url}/lounge`, data);
  }

  // Actualizar salón (PUT)
  updateLounge(data: any): Observable<any> {
    return this.http.put(`${this.url}/lounge`, data);
  }
}
