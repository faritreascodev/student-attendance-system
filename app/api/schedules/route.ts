import { NextResponse } from "next/server"
import { ScheduleModel } from "@/lib/models/schedule-model"
import { initializeData } from "@/lib/db"

export async function GET(request: Request) {
  try {
    initializeData()
    const { searchParams } = new URL(request.url)
    const courseId = searchParams.get("courseId")
    const dayOfWeek = searchParams.get("dayOfWeek")

    const schedules = ScheduleModel.getAll(courseId || undefined, dayOfWeek ? Number.parseInt(dayOfWeek) : undefined)

    return NextResponse.json({ success: true, data: schedules })
  } catch (error) {
    console.error("[v0] Error fetching schedules:", error)
    return NextResponse.json({ success: false, error: "Error al obtener los horarios" }, { status: 500 })
  }
}

export async function POST(request: Request) {
  try {
    initializeData()
    const body = await request.json()

    const validation = ScheduleModel.validate(body)
    if (!validation.valid) {
      return NextResponse.json({ success: false, errors: validation.errors }, { status: 400 })
    }

    const schedule = ScheduleModel.create(body)
    return NextResponse.json({ success: true, data: schedule }, { status: 201 })
  } catch (error) {
    console.error("[v0] Error creating schedule:", error)
    return NextResponse.json({ success: false, error: "Error al crear el horario" }, { status: 500 })
  }
}
