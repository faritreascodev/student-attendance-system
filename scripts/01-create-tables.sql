-- Script para crear las tablas del sistema de asistencia

-- Tabla de cursos
CREATE TABLE IF NOT EXISTS courses (
  id SERIAL PRIMARY KEY,
  code VARCHAR(50) UNIQUE NOT NULL,
  name VARCHAR(100) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Tabla de estudiantes
CREATE TABLE IF NOT EXISTS students (
  id SERIAL PRIMARY KEY,
  list_number INTEGER NOT NULL,
  full_name VARCHAR(200) NOT NULL,
  course_id INTEGER REFERENCES courses(id),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  UNIQUE(list_number, course_id)
);

-- Tabla de horarios
CREATE TABLE IF NOT EXISTS schedules (
  id SERIAL PRIMARY KEY,
  course_code VARCHAR(50) NOT NULL,
  day_of_week INTEGER NOT NULL, -- 1=Lunes, 2=Martes, etc.
  start_time TIME NOT NULL,
  end_time TIME NOT NULL,
  subject VARCHAR(100) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Tabla de asistencia
CREATE TABLE IF NOT EXISTS attendance (
  id SERIAL PRIMARY KEY,
  student_id INTEGER REFERENCES students(id),
  course_id INTEGER REFERENCES courses(id),
  attendance_date DATE NOT NULL,
  attendance_time TIME NOT NULL,
  is_present BOOLEAN DEFAULT false,
  observation TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  UNIQUE(student_id, attendance_date)
);

-- Índices para mejorar el rendimiento
CREATE INDEX IF NOT EXISTS idx_attendance_date ON attendance(attendance_date);
CREATE INDEX IF NOT EXISTS idx_attendance_student ON attendance(student_id);
CREATE INDEX IF NOT EXISTS idx_students_course ON students(course_id);
CREATE INDEX IF NOT EXISTS idx_schedules_course ON schedules(course_code);
