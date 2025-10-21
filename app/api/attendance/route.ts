import { NextResponse } from "next/server"
import { getDatabase } from "@/lib/db"
import type { AttendanceSubmission } from "@/lib/types"

export async function POST(request: Request) {
  try {
    const body: AttendanceSubmission = await request.json()
    const { courseCode, date, time, records } = body

    if (!courseCode || !date || !time || !records || records.length === 0) {
      return NextResponse.json({ success: false, error: "Datos incompletos" }, { status: 400 })
    }

    const db = await getDatabase()
    const attendanceCollection = db.collection("attendance")

    // Preparar los registros de asistencia
    const attendanceRecords = records.map((record) => ({
      studentId: record.studentId,
      courseCode,
      attendanceDate: date,
      attendanceTime: time,
      isPresent: record.isPresent,
      observation: record.observation || "",
      createdAt: new Date(),
    }))

    // Eliminar registros existentes para la misma fecha y estudiantes
    const studentIds = records.map((r) => r.studentId)
    await attendanceCollection.deleteMany({
      studentId: { $in: studentIds },
      attendanceDate: date,
    })

    // Insertar nuevos registros
    const result = await attendanceCollection.insertMany(attendanceRecords)

    return NextResponse.json({
      success: true,
      message: "Asistencia guardada correctamente",
      insertedCount: result.insertedCount,
    })
  } catch (error) {
    console.error("[v0] Error saving attendance:", error)
    return NextResponse.json({ success: false, error: "Error al guardar la asistencia" }, { status: 500 })
  }
}

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const courseCode = searchParams.get("courseCode")
    const date = searchParams.get("date")

    const db = await getDatabase()
    const query: any = {}

    if (courseCode) query.courseCode = courseCode
    if (date) query.attendanceDate = date

    const attendance = await db
      .collection("attendance")
      .find(query)
      .sort({ attendanceDate: -1, attendanceTime: -1 })
      .toArray()

    return NextResponse.json({ success: true, data: attendance })
  } catch (error) {
    console.error("[v0] Error fetching attendance:", error)
    return NextResponse.json({ success: false, error: "Error al obtener la asistencia" }, { status: 500 })
  }
}
