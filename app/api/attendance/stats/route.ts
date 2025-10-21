import { NextResponse } from "next/server"
import { AttendanceModel } from "@/lib/models/attendance-model"
import { initializeData } from "@/lib/db"

export async function GET(request: Request) {
  try {
    initializeData()
    const { searchParams } = new URL(request.url)
    const courseId = searchParams.get("courseId")
    const date = searchParams.get("date")

    if (!courseId || !date) {
      return NextResponse.json({ success: false, error: "Curso y fecha son requeridos" }, { status: 400 })
    }

    const stats = AttendanceModel.getStats(courseId, date)
    return NextResponse.json({ success: true, data: stats })
  } catch (error) {
    console.error("[v0] Error fetching attendance stats:", error)
    return NextResponse.json({ success: false, error: "Error al obtener las estadísticas" }, { status: 500 })
  }
}
