import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { Category, CategoryRequest, CategoryUpdateRequest } from '../interfaces/category.interface';

@Injectable({
  providedIn: 'root',
})
export class CategoryService {
  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  // POST - Listado de categorías (con filtros opcionales)
  getCategories(
    categoryName?: string,
    categoryCategoryId?: number,
    isGestion?: number,
    isPadre?: number
  ): Observable<any> {
    const body: any = {};

    if (categoryName) {
      body.category_name = categoryName;
    }
    if (categoryCategoryId !== undefined) {
      body.category_categoryid = categoryCategoryId;
    }
    if (isGestion !== undefined) {
      body.isGestion = isGestion;
    }
    if (isPadre !== undefined) {
      body.isPadre = isPadre;
    }

    return this.http.post(`${this.apiUrl}/api/rest/category/getCategories`, body);
  }

  // GET - Obtener categoría por ID
  getCategoryById(categoryId: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/api/rest/category/category/${categoryId}`);
  }

  // POST - Crear categoría/subcategoría
  createCategory(data: CategoryRequest): Observable<any> {
    return this.http.post(`${this.apiUrl}/api/rest/category/category`, data);
  }

  // PUT - Editar categoría/subcategoría
  updateCategory(data: CategoryUpdateRequest): Observable<any> {
    return this.http.put(`${this.apiUrl}/api/rest/category/category`, data);
  }
}
