import { NextResponse } from "next/server"
import { getDatabase } from "@/lib/db"

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const courseCode = searchParams.get("courseCode")
    const dayOfWeek = searchParams.get("dayOfWeek")

    const db = await getDatabase()
    const query: any = {}

    if (courseCode) query.courseCode = courseCode
    if (dayOfWeek) query.dayOfWeek = Number.parseInt(dayOfWeek)

    const schedules = await db.collection("schedules").find(query).sort({ dayOfWeek: 1, startTime: 1 }).toArray()

    return NextResponse.json({ success: true, data: schedules })
  } catch (error) {
    console.error("[v0] Error fetching schedules:", error)
    return NextResponse.json({ success: false, error: "Error al obtener los horarios" }, { status: 500 })
  }
}
