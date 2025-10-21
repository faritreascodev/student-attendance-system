import { NextResponse } from "next/server"
import { getDatabase } from "@/lib/db"

export async function GET() {
  try {
    const db = await getDatabase()
    const courses = await db.collection("courses").find({}).sort({ name: 1 }).toArray()

    return NextResponse.json({ success: true, data: courses })
  } catch (error) {
    console.error("[v0] Error fetching courses:", error)
    return NextResponse.json({ success: false, error: "Error al obtener los cursos" }, { status: 500 })
  }
}
