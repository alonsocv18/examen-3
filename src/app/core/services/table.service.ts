import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { TableModel } from '../interfaces/table.interface';

@Injectable({
  providedIn: 'root',
})
export class TableService {
  private url = environment.apiUrl + '/api/rest/tablee';

  constructor(private http: HttpClient) {}

  // Obtener mesas por salón
  getTableeByLoungeId(loungeId: number, esGestion: number = 1): Observable<any> {
    return this.http.get<any>(`${this.url}/getTableeByLoungeId/${loungeId}/${esGestion}`);
  }

  // Obtener mesa por ID
  getTableById(tableId: number): Observable<any> {
    return this.http.get<any>(`${this.url}/tablee/${tableId}`);
  }

  // Obtener todas las mesas
  getAllTables(): Observable<any> {
    return this.http.get<any>(`${this.url}/getTables`);
  }

  // Actualizar/Editar mesa
  updateTable(data: any): Observable<any> {
    return this.http.put(`${this.url}/tablee`, data);
  }
}
