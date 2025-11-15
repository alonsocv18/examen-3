export interface Category {
  category_id: string | number;
  category_name: string;
  category_categoryid: string | number; // "0" si es categoría padre
  category_urlimage: string;
  category_state: string; // "1" activo, "0" inactivo
  store_id?: number;
  cantidad_productos?: string | number; // Viene de la API
}

export interface CategoryRequest {
  category_name: string;
  category_categoryid: string | number;
  category_urlimage: string;
  category_state: string;
  store_id?: number;
}

export interface CategoryUpdateRequest extends CategoryRequest {
  category_id: string | number;
}
