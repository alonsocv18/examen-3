# Guía de uso de Servicios con HTTP en Angular

## 📁 Estructura creada

```
src/app/core/services/
├── categorias.service.ts
├── productos.service.ts
└── clientes.service.ts
```

## 🔧 Configuración

### 1. HttpClient ya está configurado en CoreModule

El `provideHttpClient()` ya está importado en `core-module.ts`

### 2. Los servicios se inyectan en los componentes via constructor:

```typescript
constructor(private categoriasService: CategoriasService) {}
```

## 📡 Métodos HTTP disponibles en cada servicio

### **GET - Obtener datos**

```typescript
// En el componente
cargarCategorias() {
  this.categoriasService.getCategorias().subscribe({
    next: (data) => {
      this.categorias = data;
    },
    error: (error) => {
      console.error('Error:', error);
    }
  });
}
```

### **POST - Crear nuevo registro**

```typescript
crearCategoria(data: { nombre: string }) {
  const nuevaCategoria: Categoria = {
    nombre: data.nombre,
    activo: true
  };

  this.categoriasService.crearCategoria(nuevaCategoria).subscribe({
    next: (categoriaCreada) => {
      this.categorias.push(categoriaCreada); // Agregar a la lista
      this.showModalCategoria = false;
    },
    error: (error) => {
      console.error('Error al crear:', error);
    }
  });
}
```

### **PUT - Actualizar registro existente**

```typescript
actualizarCategoria(id: number, data: { nombre: string }) {
  this.categoriasService.actualizarCategoria(id, data).subscribe({
    next: (categoriaActualizada) => {
      // Actualizar en la lista local
      const index = this.categorias.findIndex(c => c.id === id);
      if (index !== -1) {
        this.categorias[index] = categoriaActualizada;
      }
    },
    error: (error) => {
      console.error('Error al actualizar:', error);
    }
  });
}
```

### **DELETE - Eliminar registro**

```typescript
eliminarCategoria(id: number) {
  if (confirm('¿Estás seguro?')) {
    this.categoriasService.eliminarCategoria(id).subscribe({
      next: () => {
        // Remover de la lista local
        this.categorias = this.categorias.filter(c => c.id !== id);
      },
      error: (error) => {
        console.error('Error al eliminar:', error);
      }
    });
  }
}
```

## 🔄 Flujo completo con modales

### 1. **Template HTML**

```html
<!-- Modal de crear -->
<app-modal
  [visible]="showModalCategoria"
  (visibleChange)="showModalCategoria = $event"
  header="Crear Categoría"
>
  <app-crear-categoria-form
    (guardar)="crearCategoria($event)"
    (cancelar)="showModalCategoria = false"
  ></app-crear-categoria-form>
</app-modal>

<!-- Botón para abrir modal -->
<p-button label="Crear Categoría" (click)="showModalCategoria = true"></p-button>

<!-- Tabla con datos -->
<app-table [data]="categorias" [columns]="columns"></app-table>
```

### 2. **Componente TypeScript**

```typescript
export class CategoriasProductos implements OnInit {
  categorias: Categoria[] = [];
  showModalCategoria = false;

  constructor(private categoriasService: CategoriasService) {}

  ngOnInit() {
    this.cargarCategorias(); // Cargar datos al iniciar
  }

  cargarCategorias() {
    this.categoriasService.getCategorias().subscribe({
      next: (data) => (this.categorias = data),
      error: (err) => console.error(err),
    });
  }

  crearCategoria(data: { nombre: string }) {
    this.categoriasService.crearCategoria(data).subscribe({
      next: (nueva) => {
        this.categorias.push(nueva);
        this.showModalCategoria = false;
      },
    });
  }
}
```

## 🎯 Patrón de uso recomendado

### Para CREAR (POST):

1. Usuario abre modal → `showModalCategoria = true`
2. Usuario llena formulario en `app-crear-categoria-form`
3. Usuario hace submit → `(guardar)="crearCategoria($event)"`
4. Componente llama servicio → `categoriasService.crearCategoria(data)`
5. Servicio hace POST a API
6. Success: cerrar modal, actualizar lista
7. Error: mostrar mensaje de error

### Para EDITAR (PUT):

1. Usuario click en "Editar" de una fila
2. Abrir modal con datos precargados
3. Usuario modifica y hace submit
4. Componente llama → `actualizarCategoria(id, data)`
5. Servicio hace PUT a API
6. Success: actualizar item en lista local

### Para ELIMINAR (DELETE):

1. Usuario click en "Eliminar"
2. Mostrar confirmación → `confirm('¿Estás seguro?')`
3. Si acepta → `eliminarCategoria(id)`
4. Servicio hace DELETE a API
5. Success: remover item de lista local

## ⚙️ Configurar URLs de API

En cada servicio, cambia la URL según tu backend:

```typescript
// categorias.service.ts
private apiUrl = 'http://localhost:3000/api/categorias'; // ← Cambiar aquí

// O usa environment
import { environment } from '../../../environments/environment';
private apiUrl = `${environment.apiUrl}/categorias`;
```

## 🛡️ Manejo de errores mejorado

```typescript
crearCategoria(data: { nombre: string }) {
  this.isLoading = true;

  this.categoriasService.crearCategoria(data).subscribe({
    next: (nueva) => {
      this.categorias.push(nueva);
      this.showModalCategoria = false;
      this.mostrarMensaje('Categoría creada exitosamente', 'success');
      this.isLoading = false;
    },
    error: (error) => {
      console.error('Error:', error);
      this.mostrarMensaje('Error al crear categoría', 'error');
      this.isLoading = false;
    }
  });
}
```

## 📝 Interfaces TypeScript

Cada servicio define su interfaz:

```typescript
// categorias.service.ts
export interface Categoria {
  id?: number; // Opcional para crear (lo genera el backend)
  nombre: string;
  activo?: boolean;
}

// productos.service.ts
export interface Producto {
  id?: number;
  nombre: string;
  stock: number;
  precio: number;
  categoriaId?: number;
  subcategoriaId?: number;
  activo?: boolean;
}
```

## ✅ Ejemplos implementados

Los siguientes componentes ya están actualizados:

- ✅ `categorias-productos.ts` - GET y POST de categorías
- ✅ `clientes.ts` - GET, POST, PUT, DELETE de clientes

Puedes seguir el mismo patrón para:

- `categoria.ts` - usar ProductosService
- `subcategoria.ts` - usar ProductosService
- Cualquier otro componente que necesite datos

## 🚀 Próximos pasos

1. **Configura tu backend** con los endpoints
2. **Actualiza las URLs** en cada servicio
3. **Implementa indicadores de carga** (isLoading)
4. **Agrega notificaciones** (PrimeNG Toast)
5. **Maneja errores** de forma consistente
6. **Implementa edición** (modal con datos precargados)
