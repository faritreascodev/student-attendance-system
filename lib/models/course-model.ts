import type { Course } from "../types"

export class CourseModel {
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

  static getAll(): Course[] {
    const data = this.getData()
    return data.courses || []
  }

  static getById(id: string): Course | null {
    const courses = this.getAll()
    return courses.find((c) => c._id === id) || null
  }

  static create(course: Omit<Course, "_id" | "createdAt">): Course {
    const data = this.getData()
    const newCourse: Course = {
      ...course,
      _id: `course_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      createdAt: new Date().toISOString(),
    }

    data.courses = data.courses || []
    data.courses.push(newCourse)
    this.saveData(data)
    return newCourse
  }

  static update(id: string, updates: Partial<Course>): Course | null {
    const data = this.getData()
    const index = data.courses.findIndex((c: Course) => c._id === id)

    if (index === -1) return null

    data.courses[index] = { ...data.courses[index], ...updates }
    this.saveData(data)
    return data.courses[index]
  }

  static delete(id: string): boolean {
    const data = this.getData()
    const initialLength = data.courses.length
    data.courses = data.courses.filter((c: Course) => c._id !== id)

    if (data.courses.length < initialLength) {
      this.saveData(data)
      return true
    }
    return false
  }

  static validate(course: Partial<Course>): { valid: boolean; errors: string[] } {
    const errors: string[] = []

    if (!course.code || course.code.trim().length === 0) {
      errors.push("El código del curso es requerido")
    }

    if (!course.name || course.name.trim().length === 0) {
      errors.push("El nombre del curso es requerido")
    }

    if (course.level === undefined || course.level < 1 || course.level > 6) {
      errors.push("El nivel debe estar entre 1 y 6")
    }

    if (!course.section || !/^[A-Z]$/.test(course.section)) {
      errors.push("La sección debe ser una letra mayúscula")
    }

    return { valid: errors.length === 0, errors }
  }
}
