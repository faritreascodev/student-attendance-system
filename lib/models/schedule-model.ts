import type { Schedule } from "../types"

export class ScheduleModel {
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

  static getAll(courseId?: string, dayOfWeek?: number): Schedule[] {
    const data = this.getData()
    let schedules = data.schedules || []

    if (courseId) {
      schedules = schedules.filter((s: Schedule) => s.courseId === courseId)
    }

    if (dayOfWeek !== undefined) {
      schedules = schedules.filter((s: Schedule) => s.dayOfWeek === dayOfWeek)
    }

    return schedules.sort((a: Schedule, b: Schedule) => a.period - b.period)
  }

  static getById(id: string): Schedule | null {
    const schedules = this.getAll()
    return schedules.find((s) => s._id === id) || null
  }

  static getCurrentSchedule(): Schedule[] {
    const now = new Date()
    const dayOfWeek = now.getDay()
    const currentTime = now.toTimeString().slice(0, 5)

    const schedules = this.getAll(undefined, dayOfWeek)
    return schedules.filter((schedule) => {
      return currentTime >= schedule.startTime && currentTime <= schedule.endTime
    })
  }

  static create(schedule: Omit<Schedule, "_id" | "createdAt">): Schedule {
    const data = this.getData()
    const newSchedule: Schedule = {
      ...schedule,
      _id: `schedule_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      createdAt: new Date().toISOString(),
    }

    data.schedules = data.schedules || []
    data.schedules.push(newSchedule)
    this.saveData(data)
    return newSchedule
  }

  static update(id: string, updates: Partial<Schedule>): Schedule | null {
    const data = this.getData()
    const index = data.schedules.findIndex((s: Schedule) => s._id === id)

    if (index === -1) return null

    data.schedules[index] = { ...data.schedules[index], ...updates }
    this.saveData(data)
    return data.schedules[index]
  }

  static delete(id: string): boolean {
    const data = this.getData()
    const initialLength = data.schedules.length
    data.schedules = data.schedules.filter((s: Schedule) => s._id !== id)

    if (data.schedules.length < initialLength) {
      this.saveData(data)
      return true
    }
    return false
  }

  static validate(schedule: Partial<Schedule>): { valid: boolean; errors: string[] } {
    const errors: string[] = []

    if (!schedule.courseId) {
      errors.push("El curso es requerido")
    }

    if (schedule.dayOfWeek === undefined || schedule.dayOfWeek < 1 || schedule.dayOfWeek > 5) {
      errors.push("El día de la semana debe estar entre 1 (Lunes) y 5 (Viernes)")
    }

    if (schedule.period === undefined || schedule.period < 1 || schedule.period > 8) {
      errors.push("El periodo debe estar entre 1 y 8")
    }

    if (!schedule.subject || schedule.subject.trim().length === 0) {
      errors.push("La materia es requerida")
    }

    if (!schedule.startTime || !/^\d{2}:\d{2}$/.test(schedule.startTime)) {
      errors.push("La hora de inicio debe tener formato HH:MM")
    }

    if (!schedule.endTime || !/^\d{2}:\d{2}$/.test(schedule.endTime)) {
      errors.push("La hora de fin debe tener formato HH:MM")
    }

    if (schedule.startTime && schedule.endTime && schedule.startTime >= schedule.endTime) {
      errors.push("La hora de inicio debe ser menor que la hora de fin")
    }

    return { valid: errors.length === 0, errors }
  }
}
