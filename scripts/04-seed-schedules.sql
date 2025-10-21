-- Insertar horarios basados en las imágenes proporcionadas
-- Jornada Matutina
INSERT INTO schedules (course_code, day_of_week, start_time, end_time, subject) VALUES
  -- Martes
  ('2DO_TEC_A', 2, '07:35', '08:10', 'Programacion y base de datos'),
  ('3RO_TEC_A', 2, '08:45', '09:20', 'Programacion y base de datos'),
  
  -- Miércoles
  ('2DO_TEC_B', 3, '07:35', '08:10', 'Programacion y base de datos'),
  ('3RO_TEC_B', 3, '08:45', '09:20', 'Programacion y base de datos'),
  
  -- Viernes
  ('1RO_TEC_B', 5, '08:45', '09:20', 'Programacion y base de datos')
ON CONFLICT DO NOTHING;

-- Periodo Lectivo 2025-2026 - Arturo Cifuentes
INSERT INTO schedules (course_code, day_of_week, start_time, end_time, subject) VALUES
  -- Lunes
  ('1RO_TEC_A_INFORM', 1, '14:20', '15:00', 'PROG. Y B. DATOS'),
  ('1RO_TEC_A_INFORM', 1, '15:00', '15:40', 'PROG. Y B. DATOS'),
  
  -- Martes
  ('3RO_TEC_B_INFORM', 2, '13:40', '14:20', 'PROG. Y B. DATOS'),
  ('3RO_TEC_A_INFORM', 2, '14:20', '15:00', 'ACOMPAÑAMIENTO'),
  ('2DO_TEC_A_INFORM', 2, '15:00', '15:40', 'PROG. Y B. DATOS'),
  ('2DO_TEC_B_INFORM', 2, '17:20', '17:55', 'SOPORTE TECN.'),
  ('2DO_TEC_B_INFORM', 2, '17:55', '18:30', 'SOPORTE TECN.'),
  
  -- Miércoles
  ('3RO_TEC_A_INFORM', 3, '13:00', '13:40', 'PROG. Y B. DATOS'),
  ('3RO_TEC_A_INFORM', 3, '13:40', '14:20', 'PROG. Y B. DATOS'),
  
  -- Jueves
  ('1RO_TEC_A_INFORM', 4, '13:00', '13:40', 'PROG. Y B. DATOS'),
  ('1RO_TEC_A_INFORM', 4, '13:40', '14:20', 'PROG. Y B. DATOS'),
  ('2DO_TEC_B_INFORM', 4, '16:10', '16:45', 'PROG. Y B. DATOS'),
  ('1RO_TEC_B_INFORM', 4, '17:20', '17:55', 'SOPORTE TECN.'),
  ('1RO_TEC_B_INFORM', 4, '17:55', '18:30', 'SOPORTE TECN.'),
  
  -- Viernes
  ('2DO_TEC_A_INFORM', 5, '13:00', '13:40', 'SOPORTE TECN.'),
  ('2DO_TEC_A_INFORM', 5, '13:40', '14:20', 'SOPORTE TECN.'),
  ('1RO_TEC_B_INFORM', 5, '14:20', '15:00', 'PROG. Y B. DATOS'),
  ('1RO_TEC_B_INFORM', 5, '15:00', '15:40', 'PROG. Y B. DATOS')
ON CONFLICT DO NOTHING;
