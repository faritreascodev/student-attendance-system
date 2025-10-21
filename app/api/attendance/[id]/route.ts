import { NextResponse } from "next/server"
import { AttendanceModel } from "@/lib/models/attendance-model"
import { initializeData } from "@/lib/db"

export async function GET(request: Request, { params }: { params: { id: string } }) {
  try {
    initializeData()
    const attendance = AttendanceModel.getById(params.id)

    if (!attendance) {
      return NextResponse.json({ success: false, error: "Registro de asistencia no encontrado" }, { status: 404 })
    }

    return NextResponse.json({ success: true, data: attendance })
  } catch (error) {
    console.error("[v0] Error fetching attendance:", error)
    return NextResponse.json({ success: false, error: "Error al obtener el registro de asistencia" }, { status: 500 })
  }
}

export async function PUT(request: Request, { params }: { params: { id: string } }) {
  try {
    initializeData()
    const body = await request.json()

    const validation = AttendanceModel.validate(body)
    if (!validation.valid) {
      return NextResponse.json({ success: false, errors: validation.errors }, { status: 400 })
    }

    const attendance = AttendanceModel.update(params.id, body)

    if (!attendance) {
      return NextResponse.json({ success: false, error: "Registro de asistencia no encontrado" }, { status: 404 })
    }

    return NextResponse.json({ success: true, data: attendance })
  } catch (error) {
    console.error("[v0] Error updating attendance:", error)
    return NextResponse.json(
      { success: false, error: "Error al actualizar el registro de asistencia" },
      { status: 500 },
    )
  }
}

export async function DELETE(request: Request, { params }: { params: { id: string } }) {
  try {
    initializeData()
    const deleted = AttendanceModel.delete(params.id)

    if (!deleted) {
      return NextResponse.json({ success: false, error: "Registro de asistencia no encontrado" }, { status: 404 })
    }

    return NextResponse.json({ success: true, message: "Registro de asistencia eliminado correctamente" })
  } catch (error) {
    console.error("[v0] Error deleting attendance:", error)
    return NextResponse.json({ success: false, error: "Error al eliminar el registro de asistencia" }, { status: 500 })
  }
}
