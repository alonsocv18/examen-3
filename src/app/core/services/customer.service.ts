import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { Customer, CustomerRequest, CustomerUpdateRequest } from '../interfaces/customer.interface';

@Injectable({
  providedIn: 'root',
})
export class CustomerService {
  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  // POST - Listado de clientes (con filtros opcionales)
  getCustomers(customerName?: string, isGestion?: number): Observable<any> {
    const body: any = {};

    if (customerName) {
      body.customer_name = customerName;
    }
    if (isGestion !== undefined) {
      body.isGestion = isGestion;
    }

    return this.http.post(`${this.apiUrl}/api/rest/customer/getCustomers`, body);
  }

  // POST - Crear cliente
  createCustomer(data: CustomerRequest): Observable<any> {
    return this.http.post(`${this.apiUrl}/api/rest/customer/customer`, data);
  }

  // PUT - Actualizar cliente
  updateCustomer(data: CustomerUpdateRequest): Observable<any> {
    return this.http.put(`${this.apiUrl}/api/rest/customer/customer`, data);
  }
}
