// Tipos TypeScript para el sistema de asistencia

export interface Course {
  _id?: string
  code: string
  name: string
  createdAt?: Date
}

export interface Student {
  _id?: string
  listNumber: number
  fullName: string
  courseCode: string
  createdAt?: Date
}

export interface Schedule {
  _id?: string
  courseCode: string
  dayOfWeek: number // 1=Lunes, 2=Martes, etc.
  startTime: string
  endTime: string
  subject: string
  createdAt?: Date
}

export interface AttendanceRecord {
  _id?: string
  studentId: string
  courseCode: string
  attendanceDate: string
  attendanceTime: string
  isPresent: boolean
  observation?: string
  createdAt?: Date
}

export interface AttendanceSubmission {
  courseCode: string
  date: string
  time: string
  records: {
    studentId: string
    isPresent: boolean
    observation?: string
  }[]
}
