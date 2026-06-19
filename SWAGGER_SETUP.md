# Swagger/OpenAPI Setup Guide

## Descripción

La documentación interactiva de la API está disponible en `/api-docs`. Usa Swagger UI para explorar, probar y documentar todos los endpoints.

## 🚀 Acceso

Cuando el servidor esté corriendo:

```
http://localhost:3001/api-docs
```

## 📦 Dependencias Instaladas

```json
{
  "swagger-ui-express": "^4.6.0",
  "swagger-jsdoc": "^6.2.8"
}
```

## 📁 Estructura de Archivos

```
apps/admin-api/src/
├── config/
│   └── swagger/
│       └── swagger.ts           ← Configuración central
├── modules/
│   ├── auth/
│   │   └── docs/
│   │       └── auth.swagger.ts  ← Documentación de Auth
│   ├── products/
│   │   └── docs/
│   │       └── products.swagger.ts  ← Documentación de Products
│   └── ...
└── config/
    └── healthCheck/
        └── healthCheck.swagger.ts  ← Documentación de Health
```

## 🔧 Configuración

### swagger.ts - Configuración Central

Define:
- **Metadata**: Título, versión, descripción
- **Servers**: URLs de desarrollo y producción
- **Security**: Esquema Bearer Auth (JWT)
- **Componentes reutilizables**: Schemas comunes (User, Product, Error)

### Estructura de Documentación

Cada módulo tiene un archivo `*.swagger.ts` con comentarios JSDoc:

```typescript
/**
 * @swagger
 * /api/endpoint:
 *   post:
 *     summary: Descripción corta
 *     description: Descripción detallada
 *     tags:
 *       - Category
 *     security:
 *       - BearerAuth: []
 *     requestBody:
 *       ...
 *     responses:
 *       ...
 */
```

## ✏️ Cómo Agregar Documentación a un Endpoint

### 1. Crear archivo de documentación

```typescript
// apps/admin-api/src/modules/stores/docs/stores.swagger.ts
/**
 * @swagger
 * /api/stores:
 *   get:
 *     summary: Listar tiendas
 *     description: Obtiene todas las tiendas del usuario autenticado
 *     tags:
 *       - Stores
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       200:
 *         description: Lista de tiendas
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Store'
 *       401:
 *         description: No autorizado
 */
```

### 2. Referencia en componentes

Si necesitas reutilizar un schema:

```typescript
// En swagger.ts - components.schemas
Store: {
  type: 'object',
  properties: {
    id: { type: 'number' },
    name: { type: 'string' },
    // ...
  }
}

// En documentación
$ref: '#/components/schemas/Store'
```

### 3. Tipos de parámetros

**Path parameters:**
```typescript
parameters:
  - in: path
    name: id
    required: true
    schema:
      type: integer
```

**Query parameters:**
```typescript
parameters:
  - in: query
    name: page
    schema:
      type: integer
```

**Request body:**
```typescript
requestBody:
  required: true
  content:
    application/json:
      schema:
        type: object
        properties:
          email: { type: string, format: email }
```

### 4. Códigos de respuesta

```typescript
responses:
  200:
    description: Exitoso
    content:
      application/json:
        schema: { ... }
  400:
    description: Datos inválidos
  401:
    description: No autorizado
  404:
    description: No encontrado
  500:
    description: Error del servidor
```

## 📋 Endpoints Documentados

- ✅ **Authentication** (`/api/auth/*`)
  - `POST /register` - Registrar usuario
  - `POST /login` - Autenticar usuario
  - `POST /refresh-token` - Refrescar tokens
  - `POST /forgot-password` - Solicitar reset
  - `POST /verify-otp` - Verificar OTP
  - `PATCH /reset-password` - Reset password

- ✅ **Products** (`/api/products/*`)
  - `GET /` - Listar productos
  - `POST /` - Crear producto
  - `GET /{id}` - Obtener producto
  - `PUT /{id}` - Actualizar producto
  - `DELETE /{id}` - Eliminar producto
  - `POST /{id}/images` - Subir imágenes

- ✅ **Health** (`/healthCheck`)
  - `GET /` - Estado de la API

## 🔐 Autenticación en Swagger

1. **Obtener token:**
   - Ir a `POST /api/auth/login`
   - Ejecutar con credenciales válidas
   - Copiar `accessToken` de la respuesta

2. **Usar token:**
   - Click en botón "Authorize" (arriba a la derecha)
   - Pegar token en formato: `Bearer <token>`
   - Todos los endpoints protegidos ahora incluirán el header

## 📝 Mejores Prácticas

### 1. **Ser Descriptivo**
```typescript
// ✅ BUENO
description: 'Crea un nuevo producto con nombre, precio y categoría. Las imágenes se pueden subir después.'

// ❌ MALO
description: 'Create product'
```

### 2. **Incluir Ejemplos**
```typescript
// ✅ BUENO
example: 'john@example.com'
example: 1299.99

// ❌ MALO
type: string  // ¿Qué debería poner aquí?
```

### 3. **Documentar Errores**
```typescript
responses:
  400:
    description: Email inválido o ya registrado
  401:
    description: Credenciales incorrectas
  429:
    description: Demasiados intentos. Intenta en 15 minutos
```

### 4. **Usar Tags**
```typescript
tags:
  - Authentication    // Para agrupar en Swagger UI
  - Products
  - Stores
```

## 🚨 Problemas Comunes

### "Swagger no está mostrando mis cambios"

1. Reinicia el servidor:
   ```bash
   npm run api-admin:dev
   ```

2. Limpia el cache de Swagger:
   - Abre DevTools (F12)
   - Application → Cookies → Elimina swagger-ui cookies

3. Verifica la ruta en `swagger.ts`:
   ```typescript
   apis: [
     './src/modules/*/docs/*.swagger.ts',  // ← Asegúrate que coincida
   ]
   ```

### "El endpoint no aparece en Swagger"

Checklist:
- [ ] ¿Está en un archivo `*.swagger.ts`?
- [ ] ¿Está dentro de un comentario `/** @swagger ... */`?
- [ ] ¿La ruta comienza con `/api/`?
- [ ] ¿La indentación es correcta?
- [ ] ¿Reiniciaste el servidor?

### "El schema no se resuelve"

```typescript
// ❌ Incorrecto
$ref: '#/components/schemas/MySchema'  // No existe

// ✅ Correcto - Define primero en swagger.ts
components:
  schemas:
    MySchema: { ... }
```

## 📊 Mantenimiento

### Checklist Mensual

- [ ] Verificar que todos los endpoints estén documentados
- [ ] Revisar que los ejemplos sean realistas
- [ ] Actualizar URLs de servidor si hay cambios
- [ ] Revisar esquemas de error
- [ ] Verificar códigos HTTP correctos

### Script para Verificar Cobertura

```bash
# Ver endpoints sin documentar
grep -r "app\.\(get\|post\|put\|delete\)" src/modules \
  --include="*.ts" | grep -v swagger
```

## 🔄 Exportar Documentación

### OpenAPI JSON

```bash
curl http://localhost:3001/api-docs.json > openapi.json
```

### Postman

1. Ve a `http://localhost:3001/api-docs.json`
2. Postman → Import → Paste Raw Text
3. Importa la colección

### ReDoc (Documentación alternativa)

```bash
# Instala ReDoc CLI
npm install -g redoc-cli

# Genera documentación HTML
redoc-cli build openapi.json -o docs.html
```

## 📚 Recursos Útiles

- [OpenAPI 3.0 Specification](https://spec.openapis.org/oas/v3.0.3)
- [Swagger JSDoc Docs](https://github.com/Surnet/swagger-jsdoc)
- [ReDoc Documentation](https://redoc.ly/)

## ✅ Próximos Pasos

Documenta estos módulos:
- [ ] Brands (`/api/brands`)
- [ ] Categories (`/api/categories`)
- [ ] Stores (`/api/stores`)
- [ ] Users (`/api/user`)
- [ ] Sales (`/api/sales`)
- [ ] Stats (`/api/stats`)
- [ ] Settings (`/api/settings`)

---

**Última actualización:** 2026-06-18  
**Versión:** 1.0.0
