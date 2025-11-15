export interface Customer {
  customer_id: number;
  customer_name: string;
  customer_typedocument: string; // "DNI", "RUC", "CE"
  customer_document: string;
  customer_phone: string;
  customer_email: string;
  customer_state: string; // "1" activo, "0" inactivo
  store_id?: number;
}

export interface CustomerRequest {
  customer_name: string;
  customer_typedocument: string;
  customer_document: string;
  customer_phone: string;
  customer_email: string;
  customer_state: string;
  store_id: number;
}

export interface CustomerUpdateRequest extends CustomerRequest {
  customer_id: number;
}
