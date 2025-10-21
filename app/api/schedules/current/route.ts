import { NextResponse } from "next/server"
import { getDatabase } from "@/lib/db"

export async function GET() {
  try {
    const now = new Date()
    const dayOfWeek = now.getDay() === 0 ? 7 : now.getDay() // Convertir domingo de 0 a 7
    const currentTime = now.toTimeString().slice(0, 5) // HH:MM

    const db = await getDatabase()

    // Buscar horarios para el día actual
    const schedules = await db
      .collection("schedules")
      .find({
        dayOfWeek,
        startTime: { $lte: currentTime },
        endTime: { $gte: currentTime },
      })
      .toArray()

    return NextResponse.json({ success: true, data: schedules })
  } catch (error) {
    console.error("[v0] Error fetching current schedules:", error)
    return NextResponse.json({ success: false, error: "Error al obtener el horario actual" }, { status: 500 })
  }
}
