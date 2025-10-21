import { AttendanceForm } from "@/components/attendance-form"
import { Toaster } from "@/components/ui/toaster"

export default function Home() {
  return (
    <main className="min-h-screen bg-background p-4 py-8 md:p-8">
      <AttendanceForm />
      <Toaster />
    </main>
  )
}
