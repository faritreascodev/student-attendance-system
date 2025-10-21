import { NextResponse } from "next/server"
import { getDatabase } from "@/lib/db"

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const courseCode = searchParams.get("courseCode")

    if (!courseCode) {
      return NextResponse.json({ success: false, error: "Código de curso requerido" }, { status: 400 })
    }

    const db = await getDatabase()
    const students = await db.collection("students").find({ courseCode }).sort({ listNumber: 1 }).toArray()

    return NextResponse.json({ success: true, data: students })
  } catch (error) {
    console.error("[v0] Error fetching students:", error)
    return NextResponse.json({ success: false, error: "Error al obtener los estudiantes" }, { status: 500 })
  }
}
