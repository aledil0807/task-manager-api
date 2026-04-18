# Task Manager API

REST API para gestión de tareas con autenticación JWT, construida con Node.js, Express, Prisma y PostgreSQL.

## Descripción

Este proyecto permite que cada usuario:

* cree una cuenta
* inicie sesión
* obtenga un token JWT
* cree tareas
* liste sus tareas
* filtre, busque y ordene tareas
* pagine resultados
* consulte una tarea específica
* actualice tareas propias
* elimine tareas propias

La API incluye además:

* documentación interactiva con Swagger
* validación básica de datos
* rutas protegidas con JWT
* tests de integración con Jest y Supertest

## Tecnologías usadas

* Node.js
* Express
* PostgreSQL
* Prisma ORM
* JWT
* bcryptjs
* Swagger / OpenAPI
* Jest
* Supertest

## Características principales

* Registro e inicio de sesión de usuarios
* Autenticación con JWT
* CRUD completo de tareas
* Protección por usuario autenticado
* Filtros por estado y prioridad
* Búsqueda por título o descripción
* Ordenamiento dinámico
* Paginación
* Documentación Swagger
* Tests de integración

## Estructura del proyecto

```bash
src/
├── config/
│   ├── db.js
│   └── swagger.js
├── controllers/
│   ├── auth.controller.js
│   └── task.controller.js
├── middlewares/
│   ├── auth.middleware.js
│   └── error.middleware.js
├── routes/
│   ├── auth.routes.js
│   └── task.routes.js
├── services/
│   ├── auth.service.js
│   └── task.service.js
├── utils/
│   ├── jwt.js
│   └── pagination.js
├── validators/
│   ├── auth.validator.js
│   └── task.validator.js
├── app.js
└── server.js

tests/
├── auth.test.js
└── tasks.test.js

prisma/
├── schema.prisma
└── migrations/
```

## Instalación local

### 1. Clonar el repositorio

```bash
git clone https://github.com/aledil0807/task-manager-api.git
cd task-manager-api
```

### 2. Instalar dependencias

```bash
npm install
```

### 3. Configurar variables de entorno

Crea un archivo `.env` en la raíz del proyecto basado en `.env.example`.

Ejemplo:

```env
PORT=5000
DATABASE_URL="postgresql://USER:PASSWORD@localhost:5432/task_manager_db?schema=public"
JWT_SECRET="your_jwt_secret_here"
JWT_EXPIRES_IN="7d"
```

### 4. Generar Prisma Client

```bash
npx prisma generate
```

### 5. Ejecutar migraciones

```bash
npx prisma migrate dev
```

### 6. Ejecutar el proyecto

```bash
npm run dev
```

La API debería quedar disponible en:

```text
http://localhost:5000
```

## Documentación Swagger

Con el servidor corriendo, puedes abrir:

```text
http://localhost:5000/api/docs
```

Ahí puedes ver y probar los endpoints desde el navegador.

## Variables de entorno

El proyecto usa estas variables:

* `PORT`: puerto del servidor
* `DATABASE_URL`: URL de conexión a PostgreSQL
* `JWT_SECRET`: clave secreta para firmar tokens
* `JWT_EXPIRES_IN`: tiempo de expiración del token

## Endpoints principales

### Auth

* `POST /api/auth/register`
* `POST /api/auth/login`
* `GET /api/auth/me`

### Tasks

* `POST /api/tasks`
* `GET /api/tasks`
* `GET /api/tasks/:id`
* `PATCH /api/tasks/:id`
* `DELETE /api/tasks/:id`

## Ejemplo de uso

### Registrar usuario

`POST /api/auth/register`

```json
{
  "name": "Carlos",
  "email": "carlos@example.com",
  "password": "12345678"
}
```

### Crear tarea

`POST /api/tasks`

Header:

```text
Authorization: Bearer TU_TOKEN
```

Body:

```json
{
  "title": "Finish portfolio API",
  "description": "Complete backend project",
  "status": "pending",
  "priority": "high",
  "dueDate": "2026-04-20"
}
```

### Listar tareas con paginación

```text
GET /api/tasks?page=1&limit=10
```

### Listar tareas con filtros

```text
GET /api/tasks?status=pending&priority=high&search=portfolio&sortBy=dueDate&order=asc&page=1&limit=10
```

## Scripts disponibles

```bash
npm run dev         # Ejecuta el servidor en desarrollo con nodemon
npm start           # Ejecuta el servidor
npm test            # Corre los tests una vez
npm run test:watch  # Corre los tests en modo watch
npm run lint        # Ejecuta ESLint
```

## Testing

El proyecto incluye tests de integración para:

* registro de usuario
* login
* acceso a `/api/auth/me`
* creación de tareas autenticada
* listado de tareas
* obtención de tarea por ID
* bloqueo de acceso sin token

Para correr los tests:

```bash
npm test
```

## Estado del proyecto

Proyecto en desarrollo. Próximas mejoras previstas:

* deploy en la nube
* base de datos remota
* README con demo pública
* mayor cobertura de tests
* manejo más avanzado de validaciones


## Autor

Dilan Peña

## Licencia

Este proyecto actualmente no incluye una licencia explícita.
