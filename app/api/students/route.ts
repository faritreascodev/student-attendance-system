import { NextResponse } from "next/server"
import { StudentModel } from "@/lib/models/student-model"
import { initializeData } from "@/lib/db"

export async function GET(request: Request) {
  try {
    initializeData()
    const { searchParams } = new URL(request.url)
    const courseId = searchParams.get("courseId")

    const students = StudentModel.getAll(courseId || undefined)
    return NextResponse.json({ success: true, data: students })
  } catch (error) {
    console.error("[v0] Error fetching students:", error)
    return NextResponse.json({ success: false, error: "Error al obtener los estudiantes" }, { status: 500 })
  }
}

export async function POST(request: Request) {
  try {
    initializeData()
    const body = await request.json()

    const validation = StudentModel.validate(body)
    if (!validation.valid) {
      return NextResponse.json({ success: false, errors: validation.errors }, { status: 400 })
    }

    const student = StudentModel.create(body)
    return NextResponse.json({ success: true, data: student }, { status: 201 })
  } catch (error) {
    console.error("[v0] Error creating student:", error)
    return NextResponse.json({ success: false, error: "Error al crear el estudiante" }, { status: 500 })
  }
}
