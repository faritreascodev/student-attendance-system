import { NextResponse } from "next/server"
import { StudentModel } from "@/lib/models/student-model"
import { initializeData } from "@/lib/db"

export async function GET(request: Request, { params }: { params: { id: string } }) {
  try {
    initializeData()
    const student = StudentModel.getById(params.id)

    if (!student) {
      return NextResponse.json({ success: false, error: "Estudiante no encontrado" }, { status: 404 })
    }

    return NextResponse.json({ success: true, data: student })
  } catch (error) {
    console.error("[v0] Error fetching student:", error)
    return NextResponse.json({ success: false, error: "Error al obtener el estudiante" }, { status: 500 })
  }
}

export async function PUT(request: Request, { params }: { params: { id: string } }) {
  try {
    initializeData()
    const body = await request.json()

    const validation = StudentModel.validate(body)
    if (!validation.valid) {
      return NextResponse.json({ success: false, errors: validation.errors }, { status: 400 })
    }

    const student = StudentModel.update(params.id, body)

    if (!student) {
      return NextResponse.json({ success: false, error: "Estudiante no encontrado" }, { status: 404 })
    }

    return NextResponse.json({ success: true, data: student })
  } catch (error) {
    console.error("[v0] Error updating student:", error)
    return NextResponse.json({ success: false, error: "Error al actualizar el estudiante" }, { status: 500 })
  }
}

export async function DELETE(request: Request, { params }: { params: { id: string } }) {
  try {
    initializeData()
    const deleted = StudentModel.delete(params.id)

    if (!deleted) {
      return NextResponse.json({ success: false, error: "Estudiante no encontrado" }, { status: 404 })
    }

    return NextResponse.json({ success: true, message: "Estudiante eliminado correctamente" })
  } catch (error) {
    console.error("[v0] Error deleting student:", error)
    return NextResponse.json({ success: false, error: "Error al eliminar el estudiante" }, { status: 500 })
  }
}
