import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { Product, ProductRequest, ProductUpdateRequest } from '../interfaces/product.interface';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  // POST - Listado de productos (con filtros opcionales)
  getProducts(
    productName?: string,
    categoryId?: number,
    isGestion?: number,
    limit: number = 100,
    offset: number = 0
  ): Observable<any> {
    const body: any = {};

    if (productName) {
      body.product_name = productName;
    }
    if (categoryId !== undefined) {
      body.category_id = categoryId;
    }
    if (isGestion !== undefined) {
      body.isGestion = isGestion;
    }
    if (limit !== undefined) {
      body.limit = limit;
    }
    if (offset !== undefined) {
      body.offset = offset;
    }

    return this.http.post(`${this.apiUrl}/api/rest/product/getProducts`, body);
  }

  // POST - Crear producto
  createProduct(data: ProductRequest): Observable<any> {
    return this.http.post(`${this.apiUrl}/api/rest/product/product`, data);
  }

  // PUT - Editar producto
  updateProduct(data: ProductUpdateRequest): Observable<any> {
    return this.http.put(`${this.apiUrl}/api/rest/product/product`, data);
  }
}
