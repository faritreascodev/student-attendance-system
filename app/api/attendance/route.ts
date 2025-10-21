import { NextResponse } from "next/server"
import { AttendanceModel } from "@/lib/models/attendance-model"
import { initializeData } from "@/lib/db"
import type { AttendanceSubmission } from "@/lib/types"

export async function POST(request: Request) {
  try {
    initializeData()
    const body: AttendanceSubmission = await request.json()
    const { courseId, date, period, records } = body

    if (!courseId || !date || period === undefined || !records || records.length === 0) {
      return NextResponse.json({ success: false, error: "Datos incompletos" }, { status: 400 })
    }

    const savedRecords = []
    for (const record of records) {
      const attendanceRecord = {
        studentId: record.studentId,
        courseId,
        date,
        period,
        status: record.status,
        observation: record.observation || "",
      }

      const validation = AttendanceModel.validate(attendanceRecord)
      if (!validation.valid) {
        return NextResponse.json({ success: false, errors: validation.errors }, { status: 400 })
      }

      const saved = AttendanceModel.create(attendanceRecord)
      savedRecords.push(saved)
    }

    return NextResponse.json({
      success: true,
      message: "Asistencia guardada correctamente",
      data: savedRecords,
    })
  } catch (error) {
    console.error("[v0] Error saving attendance:", error)
    return NextResponse.json({ success: false, error: "Error al guardar la asistencia" }, { status: 500 })
  }
}

export async function GET(request: Request) {
  try {
    initializeData()
    const { searchParams } = new URL(request.url)
    const courseId = searchParams.get("courseId")
    const date = searchParams.get("date")
    const studentId = searchParams.get("studentId")
    const period = searchParams.get("period")

    const filters: any = {}
    if (courseId) filters.courseId = courseId
    if (date) filters.date = date
    if (studentId) filters.studentId = studentId
    if (period) filters.period = Number.parseInt(period)

    const attendance = AttendanceModel.getAll(filters)
    return NextResponse.json({ success: true, data: attendance })
  } catch (error) {
    console.error("[v0] Error fetching attendance:", error)
    return NextResponse.json({ success: false, error: "Error al obtener la asistencia" }, { status: 500 })
  }
}
