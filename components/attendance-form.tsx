"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { Checkbox } from "@/components/ui/checkbox"
import { Textarea } from "@/components/ui/textarea"
import { useToast } from "@/hooks/use-toast"
import type { Course, Student, Schedule } from "@/lib/types"

interface AttendanceRow {
  studentId: string
  fullName: string
  isPresent: boolean
  observation: string
}

export function AttendanceForm() {
  const { toast } = useToast()
  const [courses, setCourses] = useState<Course[]>([])
  const [students, setStudents] = useState<Student[]>([])
  const [currentSchedules, setCurrentSchedules] = useState<Schedule[]>([])
  const [selectedCourse, setSelectedCourse] = useState<string>("")
  const [selectedDate, setSelectedDate] = useState<string>(new Date().toISOString().split("T")[0])
  const [currentTime, setCurrentTime] = useState<string>(new Date().toTimeString().slice(0, 5))
  const [attendanceData, setAttendanceData] = useState<AttendanceRow[]>([])
  const [isLoading, setIsLoading] = useState(false)

  // Cargar cursos al montar el componente
  useEffect(() => {
    fetchCourses()
    fetchCurrentSchedules()

    // Actualizar la hora cada minuto
    const interval = setInterval(() => {
      setCurrentTime(new Date().toTimeString().slice(0, 5))
    }, 60000)

    return () => clearInterval(interval)
  }, [])

  // Cargar estudiantes cuando se selecciona un curso
  useEffect(() => {
    if (selectedCourse) {
      fetchStudents(selectedCourse)
    }
  }, [selectedCourse])

  const fetchCourses = async () => {
    try {
      const response = await fetch("/api/courses")
      const data = await response.json()
      if (data.success) {
        setCourses(data.data)
      }
    } catch (error) {
      console.error("[v0] Error loading courses:", error)
      toast({
        title: "Error",
        description: "No se pudieron cargar los cursos",
        variant: "destructive",
      })
    }
  }

  const fetchStudents = async (courseCode: string) => {
    try {
      const response = await fetch(`/api/students?courseCode=${courseCode}`)
      const data = await response.json()
      if (data.success) {
        setStudents(data.data)
        // Inicializar datos de asistencia
        setAttendanceData(
          data.data.map((student: Student) => ({
            studentId: student._id!,
            fullName: `${student.firstName} ${student.lastName}`,
            isPresent: false,
            observation: "",
          })),
        )
      }
    } catch (error) {
      console.error("[v0] Error loading students:", error)
      toast({
        title: "Error",
        description: "No se pudieron cargar los estudiantes",
        variant: "destructive",
      })
    }
  }

  const fetchCurrentSchedules = async () => {
    try {
      const response = await fetch("/api/schedules/current")
      const data = await response.json()
      if (data.success) {
        setCurrentSchedules(data.data)
      }
    } catch (error) {
      console.error("[v0] Error loading current schedules:", error)
    }
  }

  const handlePresentChange = (index: number, checked: boolean) => {
    const newData = [...attendanceData]
    newData[index].isPresent = checked
    setAttendanceData(newData)
  }

  const handleObservationChange = (index: number, value: string) => {
    const newData = [...attendanceData]
    newData[index].observation = value
    setAttendanceData(newData)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!selectedCourse) {
      toast({
        title: "Error",
        description: "Debe seleccionar un curso",
        variant: "destructive",
      })
      return
    }

    setIsLoading(true)

    try {
      const response = await fetch("/api/attendance", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          courseCode: selectedCourse,
          date: selectedDate,
          time: currentTime,
          records: attendanceData.map((row) => ({
            studentId: row.studentId,
            isPresent: row.isPresent,
            observation: row.observation,
          })),
        }),
      })

      const data = await response.json()

      if (data.success) {
        toast({
          title: "Éxito",
          description: `Asistencia guardada correctamente (${data.insertedCount} registros)`,
        })

        // Resetear el formulario
        setAttendanceData(
          attendanceData.map((row) => ({
            ...row,
            isPresent: false,
            observation: "",
          })),
        )
      } else {
        throw new Error(data.error)
      }
    } catch (error) {
      console.error("[v0] Error saving attendance:", error)
      toast({
        title: "Error",
        description: "No se pudo guardar la asistencia",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  const getCurrentScheduleInfo = () => {
    if (currentSchedules.length === 0) return null

    return (
      <div className="rounded-lg bg-muted p-4">
        <h3 className="mb-2 font-semibold text-sm">Clases en curso:</h3>
        <div className="space-y-1">
          {currentSchedules.map((schedule, idx) => (
            <div key={idx} className="text-sm">
              <span className="font-medium">{schedule.courseName}</span> - {schedule.subject} ({schedule.startTime} -{" "}
              {schedule.endTime})
            </div>
          ))}
        </div>
      </div>
    )
  }

  return (
    <Card className="mx-auto w-full max-w-6xl">
      <CardHeader>
        <CardTitle className="text-center text-2xl">Sistema de Asistencia Escolar</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Información de horario actual */}
          {getCurrentScheduleInfo()}

          {/* Formulario de selección */}
          <div className="grid gap-4 md:grid-cols-3">
            <div className="space-y-2">
              <Label htmlFor="course">Curso</Label>
              <Select value={selectedCourse} onValueChange={setSelectedCourse}>
                <SelectTrigger id="course">
                  <SelectValue placeholder="Seleccione un curso" />
                </SelectTrigger>
                <SelectContent>
                  {courses.map((course) => (
                    <SelectItem key={course.code} value={course.code}>
                      {course.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="date">Fecha</Label>
              <Input id="date" type="date" value={selectedDate} onChange={(e) => setSelectedDate(e.target.value)} />
            </div>

            <div className="space-y-2">
              <Label htmlFor="time">Hora</Label>
              <Input id="time" type="time" value={currentTime} readOnly className="bg-muted" />
            </div>
          </div>

          {/* Tabla de estudiantes */}
          {students.length > 0 && (
            <div className="overflow-x-auto rounded-lg border">
              <table className="w-full">
                <thead className="bg-muted">
                  <tr>
                    <th className="px-4 py-3 text-left text-sm font-semibold">Código</th>
                    <th className="px-4 py-3 text-left text-sm font-semibold">Nombre Completo</th>
                    <th className="px-4 py-3 text-center text-sm font-semibold">Presente</th>
                    <th className="px-4 py-3 text-left text-sm font-semibold">Observación</th>
                  </tr>
                </thead>
                <tbody className="divide-y">
                  {attendanceData.map((row, index) => {
                    const student = students[index]
                    return (
                      <tr key={row.studentId} className="hover:bg-muted/50">
                        <td className="px-4 py-3 text-sm">{student?.studentCode}</td>
                        <td className="px-4 py-3 text-sm font-medium">{row.fullName}</td>
                        <td className="px-4 py-3 text-center">
                          <Checkbox
                            checked={row.isPresent}
                            onCheckedChange={(checked) => handlePresentChange(index, checked as boolean)}
                          />
                        </td>
                        <td className="px-4 py-3">
                          <Textarea
                            value={row.observation}
                            onChange={(e) => handleObservationChange(index, e.target.value)}
                            placeholder="Observaciones..."
                            className="min-h-[60px] text-sm"
                          />
                        </td>
                      </tr>
                    )
                  })}
                </tbody>
              </table>
            </div>
          )}

          {/* Botón de guardar */}
          {students.length > 0 && (
            <div className="flex justify-end">
              <Button type="submit" size="lg" disabled={isLoading}>
                {isLoading ? "Guardando..." : "Guardar Asistencia"}
              </Button>
            </div>
          )}

          {/* Mensaje cuando no hay estudiantes */}
          {selectedCourse && students.length === 0 && (
            <div className="rounded-lg border border-dashed p-8 text-center">
              <p className="text-muted-foreground">No hay estudiantes registrados para este curso</p>
            </div>
          )}
        </form>
      </CardContent>
    </Card>
  )
}
