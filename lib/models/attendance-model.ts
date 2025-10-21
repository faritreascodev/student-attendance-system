import type { AttendanceRecord, DashboardStats } from "../types"

export class AttendanceModel {
  private static STORAGE_KEY = "attendance_system_data"

  private static getData() {
    if (typeof window === "undefined") return { courses: [], students: [], schedules: [], attendance: [] }
    const stored = localStorage.getItem(this.STORAGE_KEY)
    return stored ? JSON.parse(stored) : { courses: [], students: [], schedules: [], attendance: [] }
  }

  private static saveData(data: any) {
    if (typeof window !== "undefined") {
      localStorage.setItem(this.STORAGE_KEY, JSON.stringify(data))
    }
  }

  static getAll(filters?: {
    courseId?: string
    date?: string
    studentId?: string
    period?: number
  }): AttendanceRecord[] {
    const data = this.getData()
    let attendance = data.attendance || []

    if (filters?.courseId) {
      attendance = attendance.filter((a: AttendanceRecord) => a.courseId === filters.courseId)
    }

    if (filters?.date) {
      attendance = attendance.filter((a: AttendanceRecord) => a.date === filters.date)
    }

    if (filters?.studentId) {
      attendance = attendance.filter((a: AttendanceRecord) => a.studentId === filters.studentId)
    }

    if (filters?.period !== undefined) {
      attendance = attendance.filter((a: AttendanceRecord) => a.period === filters.period)
    }

    return attendance
  }

  static getById(id: string): AttendanceRecord | null {
    const attendance = this.getAll()
    return attendance.find((a) => a._id === id) || null
  }

  static create(record: Omit<AttendanceRecord, "_id" | "createdAt">): AttendanceRecord {
    const data = this.getData()
    const newRecord: AttendanceRecord = {
      ...record,
      _id: `attendance_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      createdAt: new Date().toISOString(),
    }

    data.attendance = data.attendance || []
    data.attendance.push(newRecord)
    this.saveData(data)
    return newRecord
  }

  static update(id: string, updates: Partial<AttendanceRecord>): AttendanceRecord | null {
    const data = this.getData()
    const index = data.attendance.findIndex((a: AttendanceRecord) => a._id === id)

    if (index === -1) return null

    data.attendance[index] = { ...data.attendance[index], ...updates }
    this.saveData(data)
    return data.attendance[index]
  }

  static delete(id: string): boolean {
    const data = this.getData()
    const initialLength = data.attendance.length
    data.attendance = data.attendance.filter((a: AttendanceRecord) => a._id !== id)

    if (data.attendance.length < initialLength) {
      this.saveData(data)
      return true
    }
    return false
  }

  static getStats(courseId: string, date: string): DashboardStats {
    const data = this.getData()
    const students = data.students.filter((s: any) => s.courseId === courseId)
    const attendance = this.getAll({ courseId, date })

    const presentCount = attendance.filter((a) => a.status === "present").length
    const absentCount = attendance.filter((a) => a.status === "absent").length
    const justifiedCount = attendance.filter((a) => a.status === "justified").length
    const skippedCount = attendance.filter((a) => a.status === "skipped").length

    const totalStudents = students.length
    const attendanceRate = totalStudents > 0 ? (presentCount / totalStudents) * 100 : 0

    return {
      totalStudents,
      presentCount,
      absentCount,
      justifiedCount,
      skippedCount,
      attendanceRate,
    }
  }

  static validate(record: Partial<AttendanceRecord>): { valid: boolean; errors: string[] } {
    const errors: string[] = []

    if (!record.studentId) {
      errors.push("El estudiante es requerido")
    }

    if (!record.courseId) {
      errors.push("El curso es requerido")
    }

    if (!record.date || !/^\d{4}-\d{2}-\d{2}$/.test(record.date)) {
      errors.push("La fecha debe tener formato YYYY-MM-DD")
    }

    if (record.period === undefined || record.period < 1 || record.period > 8) {
      errors.push("El periodo debe estar entre 1 y 8")
    }

    if (!record.status || !["present", "absent", "justified", "skipped"].includes(record.status)) {
      errors.push("El estado de asistencia no es válido")
    }

    return { valid: errors.length === 0, errors }
  }
}
