import { NextResponse } from "next/server"
import { ScheduleModel } from "@/lib/models/schedule-model"
import { CourseModel } from "@/lib/models/course-model"
import { initializeData } from "@/lib/db"

export async function GET() {
  try {
    initializeData()
    const currentSchedules = ScheduleModel.getCurrentSchedule()
    const courses = CourseModel.getAll()

    const enrichedSchedules = currentSchedules.map((schedule) => {
      const course = courses.find((c) => c._id === schedule.courseId)
      return {
        ...schedule,
        courseCode: course?.code || "N/A",
        courseName: course?.name || "N/A",
      }
    })

    return NextResponse.json({ success: true, data: enrichedSchedules })
  } catch (error) {
    console.error("[v0] Error fetching current schedules:", error)
    return NextResponse.json({ success: false, error: "Error al obtener el horario actual" }, { status: 500 })
  }
}
