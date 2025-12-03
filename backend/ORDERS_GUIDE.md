# 🛒 Guía Completa de Órdenes - API LevelUp Gamer

## 📦 Sistema de Órdenes Implementado

El sistema completo de órdenes está listo para:
- ✅ Crear órdenes desde el frontend
- ✅ Gestionar stock automáticamente
- ✅ Seguimiento de estados de pago y envío
- ✅ Cancelación de órdenes
- ✅ Estadísticas para administradores

---

## 🔗 URL Base
```
http://localhost:5000/api/orders
```

---

## 🛍️ Endpoints de Usuario (Requieren autenticación)

### 1. Crear Nueva Orden (Realizar Compra)

**Request:**
```http
POST http://localhost:5000/api/orders
Authorization: Bearer <user_token>
Content-Type: application/json

{
  "productos": [
    {
      "producto": "674380a1b2c3d4e5f6a7b8c9",
      "nombre": "Spider-Man 2",
      "cantidad": 1,
      "precio": 59990,
      "imagen": "/img/spiderman2.jpg"
    },
    {
      "producto": "674380a1b2c3d4e5f6a7b8ca",
      "nombre": "God of War Ragnarök",
      "cantidad": 2,
      "precio": 49990,
      "imagen": "/img/gow.jpg"
    }
  ],
  "direccionEnvio": {
    "calle": "Av. Providencia 1234",
    "ciudad": "Santiago",
    "region": "Región Metropolitana",
    "codigoPostal": "7500000"
  },
  "metodoPago": "Tarjeta de Crédito",
  "precioProductos": 159970,
  "precioEnvio": 5000,
  "precioTotal": 164970
}
```

**Response:**
```json
{
  "success": true,
  "message": "Orden creada exitosamente",
  "data": {
    "_id": "674390b1c2d3e4f5a6b7c8d9",
    "numeroOrden": "ORD-A6B7C8D9",
    "usuario": {
      "_id": "674380a1b2c3d4e5f6a7b8c9",
      "nombre": "Juan",
      "apellido": "Pérez",
      "email": "juan@ejemplo.com"
    },
    "productos": [...],
    "direccionEnvio": {...},
    "metodoPago": "Tarjeta de Crédito",
    "precioTotal": 164970,
    "estadoPago": "Pendiente",
    "estadoEnvio": "Procesando",
    "createdAt": "2024-11-24T10:30:00.000Z"
  }
}
```

**⚠️ Notas importantes:**
- El `producto` debe ser un ID válido de MongoDB del producto
- El sistema verifica automáticamente el stock disponible
- El stock se reduce automáticamente al crear la orden

---

### 2. Ver Mis Órdenes

**Request:**
```http
GET http://localhost:5000/api/orders/mis-ordenes
Authorization: Bearer <user_token>
```

**Response:**
```json
{
  "success": true,
  "cantidad": 3,
  "data": [
    {
      "_id": "674390b1c2d3e4f5a6b7c8d9",
      "numeroOrden": "ORD-A6B7C8D9",
      "productos": [
        {
          "nombre": "Spider-Man 2",
          "cantidad": 1,
          "precio": 59990
        }
      ],
      "precioTotal": 64990,
      "estadoPago": "Pagado",
      "estadoEnvio": "Enviado",
      "createdAt": "2024-11-24T10:30:00.000Z"
    }
  ]
}
```

---

### 3. Ver Detalle de una Orden

**Request:**
```http
GET http://localhost:5000/api/orders/674390b1c2d3e4f5a6b7c8d9
Authorization: Bearer <user_token>
```

**Response:**
```json
{
  "success": true,
  "data": {
    "_id": "674390b1c2d3e4f5a6b7c8d9",
    "numeroOrden": "ORD-A6B7C8D9",
    "usuario": {
      "nombre": "Juan",
      "apellido": "Pérez",
      "email": "juan@ejemplo.com",
      "telefono": "987654321"
    },
    "productos": [...],
    "direccionEnvio": {...},
    "estadoPago": "Pagado",
    "estadoEnvio": "En Camino",
    "fechaPago": "2024-11-24T10:35:00.000Z",
    "fechaEnvio": "2024-11-24T14:00:00.000Z"
  }
}
```

---

### 4. Marcar Orden como Pagada

**Request:**
```http
PUT http://localhost:5000/api/orders/674390b1c2d3e4f5a6b7c8d9/pagar
Authorization: Bearer <user_token>
```

**Response:**
```json
{
  "success": true,
  "message": "Pago registrado exitosamente",
  "data": {
    "estadoPago": "Pagado",
    "fechaPago": "2024-11-24T10:35:00.000Z"
  }
}
```

---

### 5. Cancelar Orden

**Request:**
```http
PUT http://localhost:5000/api/orders/674390b1c2d3e4f5a6b7c8d9/cancelar
Authorization: Bearer <user_token>
```

**Response:**
```json
{
  "success": true,
  "message": "Orden cancelada exitosamente",
  "data": {
    "estadoEnvio": "Cancelado",
    "estadoPago": "Rechazado"
  }
}
```

**⚠️ Restricciones:**
- Solo puedes cancelar órdenes que no han sido enviadas
- El stock se devuelve automáticamente a los productos

---

## 👑 Endpoints de Administrador (Requieren rol admin)

### 6. Ver Todas las Órdenes (Admin)

**Request:**
```http
GET http://localhost:5000/api/orders/admin/todas
Authorization: Bearer <admin_token>
```

**Response:**
```json
{
  "success": true,
  "cantidad": 45,
  "data": [
    {
      "_id": "674390b1c2d3e4f5a6b7c8d9",
      "numeroOrden": "ORD-A6B7C8D9",
      "usuario": {
        "nombre": "Juan",
        "apellido": "Pérez",
        "email": "juan@ejemplo.com"
      },
      "precioTotal": 64990,
      "estadoPago": "Pagado",
      "estadoEnvio": "Procesando",
      "createdAt": "2024-11-24T10:30:00.000Z"
    }
  ]
}
```

---

### 7. Actualizar Estado de Envío (Admin)

**Request:**
```http
PUT http://localhost:5000/api/orders/674390b1c2d3e4f5a6b7c8d9/envio
Authorization: Bearer <admin_token>
Content-Type: application/json

{
  "estadoEnvio": "Enviado"
}
```

**Estados válidos:**
- `"Procesando"` - Estado inicial
- `"Enviado"` - Orden despachada (registra fecha de envío)
- `"En Camino"` - Orden en tránsito
- `"Entregado"` - Orden recibida (registra fecha de entrega)
- `"Cancelado"` - Orden cancelada

**Response:**
```json
{
  "success": true,
  "message": "Estado de envío actualizado exitosamente",
  "data": {
    "estadoEnvio": "Enviado",
    "fechaEnvio": "2024-11-24T14:00:00.000Z"
  }
}
```

---

### 8. Ver Estadísticas de Órdenes (Admin)

**Request:**
```http
GET http://localhost:5000/api/orders/admin/estadisticas
Authorization: Bearer <admin_token>
```

**Response:**
```json
{
  "success": true,
  "data": {
    "resumen": {
      "totalOrdenes": 45,
      "ordenesPendientes": 12,
      "ordenesPagadas": 33,
      "ordenesEnviadas": 20,
      "ordenesEntregadas": 10,
      "ordenesCanceladas": 3,
      "ingresosTotales": 2849550
    },
    "ultimasOrdenes": [
      {
        "_id": "...",
        "numeroOrden": "ORD-A6B7C8D9",
        "usuario": {...},
        "precioTotal": 64990,
        "createdAt": "2024-11-24T10:30:00.000Z"
      }
    ]
  }
}
```

---

## 📊 Estados de la Orden

### Estados de Pago
| Estado | Descripción |
|--------|-------------|
| `Pendiente` | Pago no confirmado (estado inicial) |
| `Pagado` | Pago confirmado |
| `Rechazado` | Pago rechazado o orden cancelada |

### Estados de Envío
| Estado | Descripción |
|--------|-------------|
| `Procesando` | Orden recibida, preparando envío |
| `Enviado` | Orden despachada |
| `En Camino` | Orden en tránsito |
| `Entregado` | Orden recibida por el cliente |
| `Cancelado` | Orden cancelada |

---

## 🛠️ Métodos de Pago Válidos

- `"Tarjeta de Crédito"`
- `"Tarjeta de Débito"`
- `"Transferencia"`
- `"PayPal"`
- `"Mercado Pago"`

---

## 💡 Casos de Uso Comunes

### Flujo Completo de Compra

```bash
# 1. Usuario ve productos y agrega al carrito (frontend)

# 2. Usuario completa el checkout y crea la orden
POST /api/orders
{
  "productos": [...],
  "direccionEnvio": {...},
  "metodoPago": "Tarjeta de Crédito",
  "precioTotal": 164970
}
# → Orden creada, stock reducido automáticamente

# 3. Usuario confirma el pago (simulación o integración real)
PUT /api/orders/<order_id>/pagar

# 4. Admin actualiza estado a "Enviado"
PUT /api/orders/<order_id>/envio
{
  "estadoEnvio": "Enviado"
}

# 5. Admin actualiza estado a "Entregado"
PUT /api/orders/<order_id>/envio
{
  "estadoEnvio": "Entregado"
}
```

---

### Usuario Cancela una Orden

```bash
# Usuario decide cancelar antes del envío
PUT /api/orders/<order_id>/cancelar

# → Stock se devuelve automáticamente
# → Estado cambia a "Cancelado"
# → Pago marcado como "Rechazado"
```

---

## 🔍 Validaciones Implementadas

✅ **Al crear orden:**
- Verifica que todos los productos existan
- Verifica stock suficiente para cada producto
- Reduce stock automáticamente
- Valida campos obligatorios

✅ **Al cancelar orden:**
- Solo el dueño o admin puede cancelar
- No se puede cancelar si ya fue enviada
- Devuelve stock automáticamente

✅ **Permisos:**
- Usuarios solo ven sus propias órdenes
- Admin puede ver y gestionar todas las órdenes

---

## 🧪 Testing en Postman

### Obtener ID de Productos

Primero necesitas obtener IDs de productos reales:

```http
GET http://localhost:5000/api/products
```

Copia los `_id` de los productos que quieras comprar.

### Crear Orden de Prueba

```http
POST http://localhost:5000/api/orders
Authorization: Bearer <user_token>
Content-Type: application/json

{
  "productos": [
    {
      "producto": "<ID_PRODUCTO_1>",
      "nombre": "Producto Test",
      "cantidad": 1,
      "precio": 50000,
      "imagen": "/img/test.jpg"
    }
  ],
  "direccionEnvio": {
    "calle": "Calle Test 123",
    "ciudad": "Santiago",
    "region": "RM",
    "codigoPostal": "8320000"
  },
  "metodoPago": "Tarjeta de Crédito",
  "precioProductos": 50000,
  "precioEnvio": 5000,
  "precioTotal": 55000
}
```

---

## ❌ Errores Comunes

### 400 - No hay productos en la orden
```json
{
  "success": false,
  "message": "No hay productos en la orden"
}
```
**Solución:** Asegúrate de enviar el array `productos` con al menos un item.

---

### 400 - Stock insuficiente
```json
{
  "success": false,
  "message": "Stock insuficiente para Spider-Man 2. Stock disponible: 2"
}
```
**Solución:** Reduce la cantidad o elige otro producto.

---

### 403 - No tienes permiso
```json
{
  "success": false,
  "message": "No tienes permiso para ver esta orden"
}
```
**Solución:** Solo puedes ver tus propias órdenes (o usa token de admin).

---

### 404 - Producto no encontrado
```json
{
  "success": false,
  "message": "Producto Spider-Man 2 no encontrado"
}
```
**Solución:** Verifica que el ID del producto sea correcto y que el producto exista.

---

## 📦 Estructura Completa de una Orden

```json
{
  "_id": "674390b1c2d3e4f5a6b7c8d9",
  "numeroOrden": "ORD-A6B7C8D9",
  "usuario": {
    "_id": "674380a1b2c3d4e5f6a7b8c9",
    "nombre": "Juan",
    "apellido": "Pérez",
    "email": "juan@ejemplo.com"
  },
  "productos": [
    {
      "producto": "674370a1b2c3d4e5f6a7b8c9",
      "nombre": "Spider-Man 2",
      "cantidad": 1,
      "precio": 59990,
      "imagen": "/img/spiderman2.jpg",
      "_id": "674390b1c2d3e4f5a6b7c8da"
    }
  ],
  "direccionEnvio": {
    "calle": "Av. Providencia 1234",
    "ciudad": "Santiago",
    "region": "Región Metropolitana",
    "codigoPostal": "7500000"
  },
  "metodoPago": "Tarjeta de Crédito",
  "precioProductos": 59990,
  "precioEnvio": 5000,
  "precioTotal": 64990,
  "estadoPago": "Pagado",
  "estadoEnvio": "Enviado",
  "fechaPago": "2024-11-24T10:35:00.000Z",
  "fechaEnvio": "2024-11-24T14:00:00.000Z",
  "createdAt": "2024-11-24T10:30:00.000Z",
  "updatedAt": "2024-11-24T14:00:00.000Z"
}
```

---

## 🎯 Resumen Rápido

| Acción | Método | Endpoint | Autenticación |
|--------|--------|----------|---------------|
| Crear orden | POST | `/orders` | User Token |
| Mis órdenes | GET | `/orders/mis-ordenes` | User Token |
| Ver orden | GET | `/orders/:id` | User Token |
| Pagar orden | PUT | `/orders/:id/pagar` | User Token |
| Cancelar orden | PUT | `/orders/:id/cancelar` | User Token |
| Todas las órdenes | GET | `/orders/admin/todas` | Admin Token |
| Estadísticas | GET | `/orders/admin/estadisticas` | Admin Token |
| Actualizar envío | PUT | `/orders/:id/envio` | Admin Token |

---

**✨ ¡Sistema de órdenes completamente funcional!**
