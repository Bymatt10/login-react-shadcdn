# 🚀 Inicio Rápido

## Servidor de Desarrollo Ya Iniciado ✅

El servidor está corriendo en segundo plano. Abre tu navegador en:
- **Local:** http://localhost:5173

## 🔐 Credenciales de Prueba

Para iniciar sesión, usa:
- **Usuario:** `emilys`
- **Contraseña:** `emilyspass`

## 📌 Rutas Disponibles

1. **`/login`** - Página de inicio de sesión
2. **`/register`** - Página de registro (simulado)
3. **`/dashboard`** - Dashboard protegido (requiere autenticación)

## 🎯 Flujo de Uso

1. Abre http://localhost:5173
2. Te redirige automáticamente a `/login`
3. Ingresa las credenciales de prueba
4. Serás redirigido al dashboard protegido
5. Puedes cerrar sesión desde el botón en el header

## 🛠️ Comandos Útiles

```bash
# Detener el servidor (Ctrl+C en la terminal donde corre)

# Instalar dependencias (ya ejecutado)
npm install

# Iniciar servidor de desarrollo
npm run dev

# Build para producción
npm run build

# Preview del build
npm run preview
```

## 📦 Tecnologías Incluidas

✅ React 18 + Vite
✅ TypeScript
✅ TanStack Query (React Query)
✅ React Hook Form + Zod
✅ React Router DOM
✅ JWT Authentication
✅ shadcn/ui components
✅ Tailwind CSS
✅ Lucide React (iconos)

## 🎨 Características Destacadas

### Sin Código Repetitivo
- **API Client reutilizable** (`src/lib/api.ts`)
- **Token management centralizado** (`src/lib/token.ts`)
- **Hooks personalizados** (`src/hooks/useAuthMutation.ts`)
- **Componentes reutilizables** (FormField, ProtectedRoute, PublicRoute)
- **Esquemas de validación** centralizados con Zod

### Arquitectura Limpia
```
✓ Separación de responsabilidades
✓ Contextos para estado global
✓ Servicios para lógica de negocio
✓ Tipos TypeScript centralizados
✓ Validación con Zod
✓ Componentes UI de shadcn
```

## 🔐 JWT y Autenticación

El proyecto implementa:
- ✅ Login con DummyJSON API
- ✅ Almacenamiento seguro de tokens
- ✅ Validación de tokens expirados
- ✅ Rutas protegidas
- ✅ Redirección automática
- ✅ Contexto de autenticación global
- ✅ Soporte para refresh tokens

## 📚 Usuarios de Prueba Adicionales

Puedes usar cualquier usuario de: https://dummyjson.com/users

Algunos ejemplos:
- `emilys` / `emilyspass`
- `michaelw` / `michaelwpass`
- `sophiab` / `sophiabpass`

## 🎨 Colores del Proyecto

El proyecto usa tu paleta de colores personalizada:
- **Brand Primary:** `#0C3B2E` (verde oscuro)
- **Brand Secondary:** `#6D9773` (verde medio)
- **Primary Button:** Azul de Tailwind
- **Backgrounds:** Grises de Tailwind

---

¡Disfruta construyendo! 🎉

