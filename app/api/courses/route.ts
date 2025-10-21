import { NextResponse } from "next/server"
import { CourseModel } from "@/lib/models/course-model"
import { initializeData } from "@/lib/db"

export async function GET() {
  try {
    initializeData()
    const courses = CourseModel.getAll()
    return NextResponse.json({ success: true, data: courses })
  } catch (error) {
    console.error("[v0] Error fetching courses:", error)
    return NextResponse.json({ success: false, error: "Error al obtener los cursos" }, { status: 500 })
  }
}

export async function POST(request: Request) {
  try {
    initializeData()
    const body = await request.json()

    const validation = CourseModel.validate(body)
    if (!validation.valid) {
      return NextResponse.json({ success: false, errors: validation.errors }, { status: 400 })
    }

    const course = CourseModel.create(body)
    return NextResponse.json({ success: true, data: course }, { status: 201 })
  } catch (error) {
    console.error("[v0] Error creating course:", error)
    return NextResponse.json({ success: false, error: "Error al crear el curso" }, { status: 500 })
  }
}
