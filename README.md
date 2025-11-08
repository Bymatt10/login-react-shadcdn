# 🚀 React + Vite Auth App

Mini proyecto de autenticación con React, Vite, shadcn/ui, TanStack Query, React Hook Form y JWT.

## ✨ Características

- ✅ **Autenticación JWT** con DummyJSON API
- ✅ **React Hook Form** + **Zod** para validación de formularios
- ✅ **TanStack Query** para gestión de estado del servidor
- ✅ **shadcn/ui** para componentes de UI
- ✅ **Rutas protegidas** con React Router
- ✅ **TypeScript** para type safety
- ✅ **Tailwind CSS** para estilos
- ✅ Sin código repetitivo (DRY)

## 🛠️ Tecnologías

- React 18
- Vite
- TypeScript
- TanStack Query (React Query)
- React Hook Form
- Zod
- React Router DOM
- shadcn/ui
- Tailwind CSS
- jwt-decode
- Lucide React (iconos)

## 📦 Instalación

```bash
# Instalar dependencias
npm install

# Instalar tailwindcss-animate para shadcn
npm install tailwindcss-animate

# Iniciar servidor de desarrollo
npm run dev
```

## 🎯 Uso

### Credenciales de prueba

La aplicación utiliza la API de [DummyJSON](https://dummyjson.com/docs/auth) para autenticación.

**Usuario de prueba:**
- Username: `emilys`
- Password: `emilyspass`

Puedes usar cualquier usuario de [https://dummyjson.com/users](https://dummyjson.com/users)

### Flujo de la aplicación

1. **Login** (`/login`): Página de inicio de sesión
2. **Registro** (`/register`): Formulario de registro (simulado)
3. **Dashboard** (`/dashboard`): Panel protegido que muestra información del usuario

## 📁 Estructura del proyecto

```
src/
├── components/
│   ├── auth/
│   │   ├── LoginForm.tsx          # Formulario de login
│   │   ├── RegisterForm.tsx       # Formulario de registro
│   │   ├── ProtectedRoute.tsx     # HOC para rutas protegidas
│   │   └── PublicRoute.tsx        # HOC para rutas públicas
│   └── ui/                        # Componentes de shadcn
│       ├── button.tsx
│       ├── card.tsx
│       ├── input.tsx
│       ├── label.tsx
│       └── form-field.tsx
├── contexts/
│   └── AuthContext.tsx            # Contexto de autenticación
├── hooks/
│   └── useAuthMutation.ts         # Hook personalizado con TanStack Query
├── lib/
│   ├── api.ts                     # Cliente API reutilizable
│   ├── token.ts                   # Gestión de tokens JWT
│   └── utils.ts                   # Utilidades (cn)
├── pages/
│   ├── LoginPage.tsx             # Página de login
│   ├── RegisterPage.tsx          # Página de registro
│   └── DashboardPage.tsx         # Dashboard protegido
├── schemas/
│   └── authSchemas.ts            # Esquemas Zod para validación
├── services/
│   └── authService.ts            # Servicios de autenticación
├── types/
│   └── auth.ts                   # Tipos TypeScript
├── App.tsx                       # Componente principal con rutas
├── main.tsx                      # Entry point
└── index.css                     # Estilos globales
```

## 🎨 Paleta de colores

El proyecto utiliza la siguiente paleta de colores:

- **Brand Primary:** `#0C3B2E` (verde oscuro)
- **Brand Secondary:** `#6D9773` (verde medio)
- **Primary Button:** `#2563eb` (azul)
- **Text Primary:** `#111827` (gris oscuro)
- **Background:** `#f9fafb` (gris claro)

## 🔐 Autenticación

El proyecto implementa:

1. **JWT Storage:** Los tokens se almacenan en `localStorage`
2. **Token Validation:** Validación automática de tokens expirados
3. **Protected Routes:** Rutas que requieren autenticación
4. **Public Routes:** Redirección automática si ya está autenticado
5. **Auth Context:** Estado global de autenticación
6. **Token Refresh:** Soporte para refresh tokens

## 📝 Scripts disponibles

```bash
# Desarrollo
npm run dev

# Build
npm run build

# Preview
npm run preview

# Lint
npm run lint
```

## 🤝 Contribuir

Este es un proyecto de ejemplo. Siéntete libre de usarlo como base para tus proyectos.

## 📄 Licencia

MIT

---

Desarrollado con ❤️ usando React + Vite

# login-react-shadcdn
