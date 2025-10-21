import { NextResponse } from "next/server"
import { ScheduleModel } from "@/lib/models/schedule-model"
import { initializeData } from "@/lib/db"

export async function GET(request: Request, { params }: { params: { id: string } }) {
  try {
    initializeData()
    const schedule = ScheduleModel.getById(params.id)

    if (!schedule) {
      return NextResponse.json({ success: false, error: "Horario no encontrado" }, { status: 404 })
    }

    return NextResponse.json({ success: true, data: schedule })
  } catch (error) {
    console.error("[v0] Error fetching schedule:", error)
    return NextResponse.json({ success: false, error: "Error al obtener el horario" }, { status: 500 })
  }
}

export async function PUT(request: Request, { params }: { params: { id: string } }) {
  try {
    initializeData()
    const body = await request.json()

    const validation = ScheduleModel.validate(body)
    if (!validation.valid) {
      return NextResponse.json({ success: false, errors: validation.errors }, { status: 400 })
    }

    const schedule = ScheduleModel.update(params.id, body)

    if (!schedule) {
      return NextResponse.json({ success: false, error: "Horario no encontrado" }, { status: 404 })
    }

    return NextResponse.json({ success: true, data: schedule })
  } catch (error) {
    console.error("[v0] Error updating schedule:", error)
    return NextResponse.json({ success: false, error: "Error al actualizar el horario" }, { status: 500 })
  }
}

export async function DELETE(request: Request, { params }: { params: { id: string } }) {
  try {
    initializeData()
    const deleted = ScheduleModel.delete(params.id)

    if (!deleted) {
      return NextResponse.json({ success: false, error: "Horario no encontrado" }, { status: 404 })
    }

    return NextResponse.json({ success: true, message: "Horario eliminado correctamente" })
  } catch (error) {
    console.error("[v0] Error deleting schedule:", error)
    return NextResponse.json({ success: false, error: "Error al eliminar el horario" }, { status: 500 })
  }
}
