import { NextResponse } from "next/server"
import { CourseModel } from "@/lib/models/course-model"
import { initializeData } from "@/lib/db"

export async function GET(request: Request, { params }: { params: { id: string } }) {
  try {
    initializeData()
    const course = CourseModel.getById(params.id)

    if (!course) {
      return NextResponse.json({ success: false, error: "Curso no encontrado" }, { status: 404 })
    }

    return NextResponse.json({ success: true, data: course })
  } catch (error) {
    console.error("[v0] Error fetching course:", error)
    return NextResponse.json({ success: false, error: "Error al obtener el curso" }, { status: 500 })
  }
}

export async function PUT(request: Request, { params }: { params: { id: string } }) {
  try {
    initializeData()
    const body = await request.json()

    const validation = CourseModel.validate(body)
    if (!validation.valid) {
      return NextResponse.json({ success: false, errors: validation.errors }, { status: 400 })
    }

    const course = CourseModel.update(params.id, body)

    if (!course) {
      return NextResponse.json({ success: false, error: "Curso no encontrado" }, { status: 404 })
    }

    return NextResponse.json({ success: true, data: course })
  } catch (error) {
    console.error("[v0] Error updating course:", error)
    return NextResponse.json({ success: false, error: "Error al actualizar el curso" }, { status: 500 })
  }
}

export async function DELETE(request: Request, { params }: { params: { id: string } }) {
  try {
    initializeData()
    const deleted = CourseModel.delete(params.id)

    if (!deleted) {
      return NextResponse.json({ success: false, error: "Curso no encontrado" }, { status: 404 })
    }

    return NextResponse.json({ success: true, message: "Curso eliminado correctamente" })
  } catch (error) {
    console.error("[v0] Error deleting course:", error)
    return NextResponse.json({ success: false, error: "Error al eliminar el curso" }, { status: 500 })
  }
}
