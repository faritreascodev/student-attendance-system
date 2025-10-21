# Sistema de Asistencia Escolar

Sistema completo de registro de asistencia estudiantil desarrollado con React, Next.js, Node.js/Express y MongoDB.

## Características

- ✅ Registro de asistencia por curso y fecha
- ✅ Lista de estudiantes con checkboxes de presente/ausente
- ✅ Campo de observaciones personalizadas por estudiante
- ✅ Integración con horarios de clases
- ✅ Detección automática de clases en curso
- ✅ API REST completa para gestión de datos
- ✅ Interfaz responsive y profesional

## Tecnologías

- **Frontend**: React 19, Next.js 15, Tailwind CSS v4
- **Backend**: Next.js API Routes (Node.js)
- **Base de Datos**: MongoDB
- **UI Components**: shadcn/ui

## Instalación

1. Clonar el repositorio
2. Instalar dependencias:
   \`\`\`bash
   npm install
   \`\`\`

3. Configurar variables de entorno:
   \`\`\`bash
   cp .env.example .env
   \`\`\`
   Editar `.env` con tus credenciales de MongoDB

4. Inicializar la base de datos:
   - Los scripts SQL en `/scripts` deben ser ejecutados en orden
   - Estos crean las tablas y datos iniciales

5. Ejecutar en desarrollo:
   \`\`\`bash
   npm run dev
   \`\`\`

## Estructura del Proyecto

\`\`\`
├── app/
│   ├── api/
│   │   ├── attendance/      # Endpoints de asistencia
│   │   ├── courses/         # Endpoints de cursos
│   │   ├── students/        # Endpoints de estudiantes
│   │   └── schedules/       # Endpoints de horarios
│   ├── layout.tsx
│   └── page.tsx
├── components/
│   ├── attendance-form.tsx  # Formulario principal
│   └── ui/                  # Componentes de UI
├── lib/
│   ├── db.ts               # Conexión a MongoDB
│   └── types.ts            # Tipos TypeScript
└── scripts/
    ├── 01-create-tables.sql
    ├── 02-seed-courses.sql
    ├── 03-seed-students.sql
    └── 04-seed-schedules.sql
\`\`\`

## API Endpoints

### Cursos
- `GET /api/courses` - Obtener todos los cursos

### Estudiantes
- `GET /api/students?courseCode={code}` - Obtener estudiantes por curso

### Horarios
- `GET /api/schedules` - Obtener todos los horarios
- `GET /api/schedules/current` - Obtener clases en curso

### Asistencia
- `POST /api/attendance` - Guardar registro de asistencia
- `GET /api/attendance?courseCode={code}&date={date}` - Consultar asistencia

## Uso

1. Seleccionar un curso del dropdown
2. Verificar la fecha (por defecto es hoy)
3. La hora se actualiza automáticamente
4. Marcar presente/ausente para cada estudiante
5. Agregar observaciones si es necesario
6. Hacer clic en "Guardar Asistencia"

## Cursos Disponibles

- 1RO TEC A / B
- 1RO TEC A / B INFORM
- 2DO TEC A / B
- 2DO TEC A / B INFORM
- 3RO TEC A / B
- 3RO TEC A / B INFORM
- BRIGADA PRIMERO BGU-CIENCIAS C

## Horarios Integrados

El sistema incluye dos horarios:
- **Jornada Matutina**: 7:00 AM - 10:00 AM
- **Periodo Lectivo 2025-2026**: 1:00 PM - 6:30 PM (19+12 horas)

El sistema detecta automáticamente qué clases están en curso según la hora actual.

## Licencia

MIT
