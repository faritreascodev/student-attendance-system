import type { Student } from "../types"

export class StudentModel {
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

  static getAll(courseId?: string): Student[] {
    const data = this.getData()
    let students = data.students || []

    if (courseId) {
      students = students.filter((s: Student) => s.courseId === courseId)
    }

    return students.sort((a: Student, b: Student) => a.listNumber - b.listNumber)
  }

  static getById(id: string): Student | null {
    const students = this.getAll()
    return students.find((s) => s._id === id) || null
  }

  static create(student: Omit<Student, "_id" | "createdAt">): Student {
    const data = this.getData()
    const newStudent: Student = {
      ...student,
      _id: `student_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      createdAt: new Date().toISOString(),
    }

    data.students = data.students || []
    data.students.push(newStudent)
    this.saveData(data)
    return newStudent
  }

  static update(id: string, updates: Partial<Student>): Student | null {
    const data = this.getData()
    const index = data.students.findIndex((s: Student) => s._id === id)

    if (index === -1) return null

    data.students[index] = { ...data.students[index], ...updates }
    this.saveData(data)
    return data.students[index]
  }

  static delete(id: string): boolean {
    const data = this.getData()
    const initialLength = data.students.length
    data.students = data.students.filter((s: Student) => s._id !== id)

    if (data.students.length < initialLength) {
      this.saveData(data)
      return true
    }
    return false
  }

  static validate(student: Partial<Student>): { valid: boolean; errors: string[] } {
    const errors: string[] = []

    if (!student.firstName || student.firstName.trim().length === 0) {
      errors.push("El nombre es requerido")
    }

    if (!student.lastName || student.lastName.trim().length === 0) {
      errors.push("El apellido es requerido")
    }

    if (!student.studentCode || student.studentCode.trim().length === 0) {
      errors.push("El código de estudiante es requerido")
    }

    if (!student.courseId || student.courseId.trim().length === 0) {
      errors.push("El curso es requerido")
    }

    if (student.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(student.email)) {
      errors.push("El email no es válido")
    }

    if (student.listNumber === undefined || student.listNumber < 1) {
      errors.push("El número de lista debe ser mayor a 0")
    }

    return { valid: errors.length === 0, errors }
  }
}
