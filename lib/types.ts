export type AttendanceStatus = "present" | "absent" | "justified" | "skipped"

export interface Course {
  _id: string
  code: string
  name: string
  level: number
  section: string
  createdAt: string
}

export interface Student {
  _id: string
  courseId: string
  listNumber: number
  firstName: string
  lastName: string
  studentCode: string
  email: string
  phone?: string
  createdAt: string
}

export interface Schedule {
  _id: string
  courseId: string
  dayOfWeek: number // 1=Lunes, 2=Martes, 3=Miércoles, 4=Jueves, 5=Viernes
  period: number // 1-8
  startTime: string
  endTime: string
  subject: string
  createdAt: string
}

export interface AttendanceRecord {
  _id: string
  studentId: string
  courseId: string
  date: string // YYYY-MM-DD
  period: number // 1-8
  status: AttendanceStatus
  observation?: string
  createdAt: string
}

export interface AttendanceSubmission {
  courseId: string
  date: string
  period: number
  records: {
    studentId: string
    status: AttendanceStatus
    observation?: string
  }[]
}

export interface DashboardStats {
  totalStudents: number
  presentCount: number
  absentCount: number
  justifiedCount: number
  skippedCount: number
  attendanceRate: number
}
