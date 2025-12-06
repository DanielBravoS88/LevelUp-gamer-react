# Pruebas Unitarias - LevelUp Gamer

## Tecnologías Utilizadas
- **Jasmine**: Framework de pruebas unitarias
- **Karma**: Test Runner para ejecutar las pruebas en el navegador

## Estructura de Pruebas

### 1. Pruebas de Utilidades (`src/utils/slug.spec.js`)
- Conversión de texto a slugs
- Manejo de espacios y caracteres especiales
- Validación de strings vacíos

### 2. Pruebas de Autenticación (`src/auth/auth.spec.js`)
- Validación de formato de email
- Validación de longitud de contraseña
- Gestión de roles (admin/usuario)
- Verificación de tokens JWT

### 3. Pruebas de Carrito de Compras (`src/components/cart.spec.js`)
- Cálculo de subtotales
- Aplicación de descuentos DUOC (20%)
- Gestión de cantidades
- Validación de edad (18+)
- Validación de email DUOC

## Cómo Ejecutar las Pruebas

```bash
npm test
```

Este comando ejecutará todas las pruebas y mostrará los resultados en la consola.

## Resultados Esperados

Las pruebas verifican:
- ✅ 5 pruebas de slugs
- ✅ 4 pruebas de autenticación
- ✅ 8 pruebas de carrito de compras

**Total: 17 pruebas unitarias**

## Cobertura

Las pruebas cubren:
- Lógica de negocio del carrito
- Validaciones de usuario
- Transformación de datos
- Cálculos de precios y descuentos

## Notas

- Las pruebas NO modifican el código de producción
- Se ejecutan en Chrome Headless (no abre ventanas)
- Son independientes entre sí
- Cada prueba valida un caso específico
