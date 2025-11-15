export interface Product {
  product_id: number;
  product_name: string;
  product_price: number;
  product_description: string;
  product_urlimage: string;
  product_state: string; // "1" activo, "0" inactivo
  product_stock: number;
  product_needpreparation: string; // "1" necesita preparación, "0" no necesita
  category_id: number;
  store_id?: number;
}

export interface ProductRequest {
  product_name: string;
  product_price: number;
  product_description: string;
  product_urlimage: string;
  product_state: string;
  product_stock: number;
  product_needpreparation: string;
  category_id: number;
  store_id?: number;
}

export interface ProductUpdateRequest extends ProductRequest {
  product_id: number;
}
