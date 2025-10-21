// Data Models
class DataStore {
  constructor() {
    this.students = this.load("students") || []
    this.courses = this.load("courses") || []
    this.schedules = this.load("schedules") || []
    this.attendance = this.load("attendance") || []
    this.initializeDefaultData()
  }

  load(key) {
    const data = localStorage.getItem(key)
    return data ? JSON.parse(data) : null
  }

  save(key, data) {
    localStorage.setItem(key, JSON.stringify(data))
  }

  initializeDefaultData() {
    if (this.courses.length === 0) {
      this.courses = [
        { id: "1", name: "1° TEC A", code: "1TECA", level: "1RO", description: "Primer año técnico A" },
        { id: "2", name: "1° TEC B", code: "1TECB", level: "1RO", description: "Primer año técnico B" },
        { id: "3", name: "2° TEC A", code: "2TECA", level: "2DO", description: "Segundo año técnico A" },
        { id: "4", name: "2° TEC B", code: "2TECB", level: "2DO", description: "Segundo año técnico B" },
        { id: "5", name: "3° TEC A", code: "3TECA", level: "3RO", description: "Tercer año técnico A" },
        { id: "6", name: "3° TEC B", code: "3TECB", level: "3RO", description: "Tercer año técnico B" },
      ]
      this.save("courses", this.courses)
    }

    if (this.students.length === 0) {
      const names = [
        "Juan Pérez",
        "María García",
        "Carlos López",
        "Ana Martínez",
        "Luis Rodríguez",
        "Carmen Fernández",
        "José González",
        "Laura Sánchez",
        "Miguel Torres",
        "Isabel Ramírez",
        "Pedro Flores",
        "Sofía Castro",
        "Diego Morales",
        "Valentina Ortiz",
        "Andrés Silva",
        "Camila Vargas",
        "Javier Herrera",
        "Daniela Mendoza",
        "Roberto Guzmán",
        "Gabriela Rojas",
        "Fernando Castillo",
        "Natalia Jiménez",
        "Ricardo Vega",
        "Paula Romero",
        "Alejandro Núñez",
        "Lucía Medina",
        "Sebastián Aguilar",
        "Mariana Reyes",
        "Cristian Moreno",
        "Andrea Delgado",
      ]

      this.students = names.map((name, index) => ({
        id: String(index + 1),
        name: name,
        idNumber: `1750${String(index + 1).padStart(6, "0")}`,
        courseId: String((index % 6) + 1),
        email: `${name.toLowerCase().replace(" ", ".")}@estudiante.edu.ec`,
        phone: `09${String(Math.floor(Math.random() * 100000000)).padStart(8, "0")}`,
      }))
      this.save("students", this.students)
    }

    if (this.schedules.length === 0) {
      this.schedules = [
        // Lunes
        { id: "1", courseId: "3", day: "Lunes", period: 1, subject: "Programación y Base de Datos" },
        { id: "2", courseId: "3", day: "Lunes", period: 3, subject: "Programación y Base de Datos" },
        { id: "3", courseId: "3", day: "Lunes", period: 4, subject: "Programación y Base de Datos" },
        // Martes
        { id: "4", courseId: "5", day: "Martes", period: 2, subject: "Programación y Base de Datos" },
        { id: "5", courseId: "4", day: "Martes", period: 2, subject: "Programación y Base de Datos" },
        { id: "6", courseId: "5", day: "Martes", period: 3, subject: "Programación y Base de Datos" },
        { id: "7", courseId: "5", day: "Martes", period: 4, subject: "Acompañamiento" },
        { id: "8", courseId: "3", day: "Martes", period: 4, subject: "Programación y Base de Datos" },
        // Miércoles
        { id: "9", courseId: "4", day: "Miércoles", period: 1, subject: "Programación y Base de Datos" },
        { id: "10", courseId: "5", day: "Miércoles", period: 1, subject: "Programación y Base de Datos" },
        // Jueves
        { id: "11", courseId: "1", day: "Jueves", period: 1, subject: "Programación y Base de Datos" },
        { id: "12", courseId: "3", day: "Jueves", period: 1, subject: "Programación y Base de Datos" },
        { id: "13", courseId: "1", day: "Jueves", period: 2, subject: "Programación y Base de Datos" },
        { id: "14", courseId: "6", day: "Jueves", period: 5, subject: "Programación y Base de Datos" },
        // Viernes
        { id: "15", courseId: "2", day: "Viernes", period: 2, subject: "Soporte Técnico" },
        { id: "16", courseId: "2", day: "Viernes", period: 3, subject: "Soporte Técnico" },
        { id: "17", courseId: "6", day: "Viernes", period: 3, subject: "Programación y Base de Datos" },
        { id: "18", courseId: "2", day: "Viernes", period: 4, subject: "Programación y Base de Datos" },
        { id: "19", courseId: "6", day: "Viernes", period: 4, subject: "Programación y Base de Datos" },
      ]
      this.save("schedules", this.schedules)
    }
  }

  // CRUD Operations
  createStudent(student) {
    student.id = String(Date.now())
    this.students.push(student)
    this.save("students", this.students)
    return student
  }

  updateStudent(id, updates) {
    const index = this.students.findIndex((s) => s.id === id)
    if (index !== -1) {
      this.students[index] = { ...this.students[index], ...updates }
      this.save("students", this.students)
      return this.students[index]
    }
    return null
  }

  deleteStudent(id) {
    this.students = this.students.filter((s) => s.id !== id)
    this.save("students", this.students)
  }

  createCourse(course) {
    course.id = String(Date.now())
    this.courses.push(course)
    this.save("courses", this.courses)
    return course
  }

  updateCourse(id, updates) {
    const index = this.courses.findIndex((c) => c.id === id)
    if (index !== -1) {
      this.courses[index] = { ...this.courses[index], ...updates }
      this.save("courses", this.courses)
      return this.courses[index]
    }
    return null
  }

  deleteCourse(id) {
    this.courses = this.courses.filter((c) => c.id !== id)
    this.save("courses", this.courses)
  }

  createSchedule(schedule) {
    schedule.id = String(Date.now())
    this.schedules.push(schedule)
    this.save("schedules", this.schedules)
    return schedule
  }

  updateSchedule(id, updates) {
    const index = this.schedules.findIndex((s) => s.id === id)
    if (index !== -1) {
      this.schedules[index] = { ...this.schedules[index], ...updates }
      this.save("schedules", this.schedules)
      return this.schedules[index]
    }
    return null
  }

  deleteSchedule(id) {
    this.schedules = this.schedules.filter((s) => s.id !== id)
    this.save("schedules", this.schedules)
  }

  createAttendance(attendance) {
    attendance.id = String(Date.now())
    this.attendance.push(attendance)
    this.save("attendance", this.attendance)
    return attendance
  }

  getAttendanceByDate(date) {
    return this.attendance.filter((a) => a.date === date)
  }

  getAttendanceByDateRange(startDate, endDate) {
    return this.attendance.filter((a) => a.date >= startDate && a.date <= endDate)
  }
}

// Initialize data store
const db = new DataStore()

let currentReportType = "general"

function showToast(message, type = "info") {
  const container = document.getElementById("toastContainer")
  const toast = document.createElement("div")
  toast.className = `toast ${type}`
  toast.innerHTML = `
    <div class="flex items-center justify-between">
      <span>${message}</span>
      <button onclick="this.parentElement.parentElement.remove()" class="ml-4 text-white hover:text-gray-200">
        <i class="fas fa-times"></i>
      </button>
    </div>
  `
  container.appendChild(toast)

  setTimeout(() => {
    toast.style.animation = "slideOut 0.3s ease-out"
    setTimeout(() => toast.remove(), 300)
  }, 5000)
}

function confirmAction(message) {
  return confirm(message)
}

// Navigation
function showTab(tabName) {
  // Hide all tabs
  document.querySelectorAll(".tab-content").forEach((tab) => {
    tab.classList.remove("active")
  })

  // Remove active class from all nav items
  document.querySelectorAll(".nav-item").forEach((item) => {
    item.classList.remove("active")
  })

  // Show selected tab
  document.getElementById(tabName).classList.add("active")

  // Add active class to selected nav item
  document.querySelector(`[data-tab="${tabName}"]`).classList.add("active")

  // Load data for the tab
  switch (tabName) {
    case "dashboard":
      updateDashboard()
      break
    case "attendance":
      loadAttendanceTab()
      updateCurrentPeriod() // Added current period indicator
      break
    case "students":
      loadStudents()
      loadStudentFilters() // Added filter loading
      break
    case "courses":
      loadCourses()
      break
    case "schedules":
      loadSchedules()
      break
    case "reports":
      loadReportsTab()
      break
  }
}

function updateCurrentPeriod() {
  const now = new Date()
  const hours = now.getHours()
  const minutes = now.getMinutes()
  const currentTime = hours * 60 + minutes

  const periods = [
    { period: 1, start: 13 * 60, end: 13 * 60 + 40, label: "1° Periodo (13:00 - 13:40)" },
    { period: 2, start: 13 * 60 + 40, end: 14 * 60 + 20, label: "2° Periodo (13:40 - 14:20)" },
    { period: 3, start: 14 * 60 + 20, end: 15 * 60, label: "3° Periodo (14:20 - 15:00)" },
    { period: 4, start: 15 * 60, end: 15 * 60 + 40, label: "4° Periodo (15:00 - 15:40)" },
    { period: 5, start: 16 * 60 + 10, end: 16 * 60 + 45, label: "5° Periodo (16:10 - 16:45)" },
    { period: 6, start: 16 * 60 + 45, end: 17 * 60 + 20, label: "6° Periodo (16:45 - 17:20)" },
    { period: 7, start: 17 * 60 + 20, end: 17 * 60 + 55, label: "7° Periodo (17:20 - 17:55)" },
    { period: 8, start: 17 * 60 + 55, end: 18 * 60 + 30, label: "8° Periodo (17:55 - 18:30)" },
  ]

  const currentPeriod = periods.find((p) => currentTime >= p.start && currentTime <= p.end)
  const indicator = document.getElementById("currentPeriodIndicator")
  const text = document.getElementById("currentPeriodText")

  if (currentPeriod) {
    indicator.classList.remove("hidden")
    text.textContent = currentPeriod.label
    document.getElementById("attendancePeriodStart").value = currentPeriod.period
    document.getElementById("attendancePeriodEnd").value = currentPeriod.period
  } else {
    indicator.classList.add("hidden")
  }
}

// Dashboard Functions
function updateDashboard() {
  const today = document.getElementById("dashboardDate").value || new Date().toISOString().split("T")[0]
  document.getElementById("dashboardDate").value = today

  // Update statistics
  document.getElementById("totalStudents").textContent = db.students.length
  document.getElementById("totalCourses").textContent = db.courses.length

  const todayAttendance = db.getAttendanceByDate(today)
  const presentCount = todayAttendance.filter((a) => a.status === "presente").length
  const absentCount = todayAttendance.filter((a) => a.status === "ausente").length

  document.getElementById("todayAttendance").textContent = presentCount
  document.getElementById("todayAbsences").textContent = absentCount

  // Display today's attendance
  displayTodayAttendance(todayAttendance)
}

function displayTodayAttendance(attendanceRecords) {
  const container = document.getElementById("todayAttendanceList")

  if (attendanceRecords.length === 0) {
    container.innerHTML =
      '<p class="text-gray-500 text-center py-8">No hay registros de asistencia para esta fecha.</p>'
    return
  }

  const groupedByCourse = {}
  attendanceRecords.forEach((record) => {
    const student = db.students.find((s) => s.id === record.studentId)
    const course = db.courses.find((c) => c.id === student?.courseId)
    const courseName = course?.name || "Sin curso"

    if (!groupedByCourse[courseName]) {
      groupedByCourse[courseName] = []
    }
    groupedByCourse[courseName].push({ ...record, student, course })
  })

  let html = ""
  Object.keys(groupedByCourse).forEach((courseName) => {
    const records = groupedByCourse[courseName]
    html += `
            <div class="mb-6">
                <h4 class="font-bold text-lg mb-3">${courseName}</h4>
                <table class="min-w-full border">
                    <thead class="bg-gray-100">
                        <tr>
                            <th class="border px-4 py-2 text-left">Estudiante</th>
                            <th class="border px-4 py-2 text-left">Periodo(s)</th>
                            <th class="border px-4 py-2 text-left">Estado</th>
                            <th class="border px-4 py-2 text-left">Observaciones</th>
                        </tr>
                    </thead>
                    <tbody>
        `

    records.forEach((record) => {
      const statusColors = {
        presente: "bg-green-100 text-green-800",
        ausente: "bg-red-100 text-red-800",
        justificado: "bg-yellow-100 text-yellow-800",
        fugado: "bg-orange-100 text-orange-800",
      }

      const statusLabels = {
        presente: "Presente",
        ausente: "Ausente",
        justificado: "Justificado",
        fugado: "Fugado",
      }

      html += `
                <tr>
                    <td class="border px-4 py-2">${record.student?.name || "Desconocido"}</td>
                    <td class="border px-4 py-2">${record.periodStart}° - ${record.periodEnd}°</td>
                    <td class="border px-4 py-2">
                        <span class="px-2 py-1 rounded text-sm ${statusColors[record.status]}">
                            ${statusLabels[record.status]}
                        </span>
                    </td>
                    <td class="border px-4 py-2">${record.observations || "-"}</td>
                </tr>
            `
    })

    html += `
                    </tbody>
                </table>
            </div>
        `
  })

  container.innerHTML = html
}

// Attendance Functions
function loadAttendanceTab() {
  const courseSelect = document.getElementById("attendanceCourse")
  courseSelect.innerHTML = '<option value="">Seleccionar curso...</option>'
  db.courses.forEach((course) => {
    courseSelect.innerHTML += `<option value="${course.id}">${course.name}</option>`
  })

  const today = new Date().toISOString().split("T")[0]
  document.getElementById("attendanceDate").value = today
  document.getElementById("attendancePeriodStart").value = "1"
  document.getElementById("attendancePeriodEnd").value = "1"
}

function loadStudentsForAttendance() {
  const courseId = document.getElementById("attendanceCourse").value
  const container = document.getElementById("attendanceStudentsList")

  if (!courseId) {
    container.innerHTML = ""
    document.getElementById("attendanceSummary").classList.add("hidden")
    return
  }

  const students = db.students.filter((s) => s.courseId === courseId)

  if (students.length === 0) {
    container.innerHTML = '<p class="text-gray-500 text-center py-8">No hay estudiantes en este curso.</p>'
    document.getElementById("attendanceSummary").classList.add("hidden")
    return
  }

  let html = `
        <table class="min-w-full border">
            <thead class="bg-gray-100">
                <tr>
                    <th class="border px-4 py-2 text-left">Estudiante</th>
                    <th class="border px-4 py-2 text-center">Presente</th>
                    <th class="border px-4 py-2 text-center">Ausente</th>
                    <th class="border px-4 py-2 text-center">Justificado</th>
                    <th class="border px-4 py-2 text-center">Fugado</th>
                    <th class="border px-4 py-2 text-left">Observaciones</th>
                </tr>
            </thead>
            <tbody>
    `

  students.forEach((student) => {
    html += `
            <tr>
                <td class="border px-4 py-2">${student.name}</td>
                <td class="border px-4 py-2 text-center">
                    <input type="radio" name="status_${student.id}" value="presente" checked 
                           class="w-4 h-4 text-green-600" onchange="updateAttendanceSummary()">
                </td>
                <td class="border px-4 py-2 text-center">
                    <input type="radio" name="status_${student.id}" value="ausente" 
                           class="w-4 h-4 text-red-600" onchange="updateAttendanceSummary()">
                </td>
                <td class="border px-4 py-2 text-center">
                    <input type="radio" name="status_${student.id}" value="justificado" 
                           class="w-4 h-4 text-yellow-600" onchange="updateAttendanceSummary()">
                </td>
                <td class="border px-4 py-2 text-center">
                    <input type="radio" name="status_${student.id}" value="fugado" 
                           class="w-4 h-4 text-orange-600" onchange="updateAttendanceSummary()">
                </td>
                <td class="border px-4 py-2">
                    <input type="text" id="obs_${student.id}" 
                           class="w-full border rounded px-2 py-1 text-sm" 
                           placeholder="Observaciones...">
                </td>
            </tr>
        `
  })

  html += `
            </tbody>
        </table>
    `

  container.innerHTML = html
  document.getElementById("attendanceSummary").classList.remove("hidden")
  updateAttendanceSummary()
}

function updateAttendanceSummary() {
  const courseId = document.getElementById("attendanceCourse").value
  if (!courseId) return

  const students = db.students.filter((s) => s.courseId === courseId)
  let present = 0,
    absent = 0,
    justified = 0,
    escaped = 0

  students.forEach((student) => {
    const status = document.querySelector(`input[name="status_${student.id}"]:checked`)?.value
    if (status === "presente") present++
    else if (status === "ausente") absent++
    else if (status === "justificado") justified++
    else if (status === "fugado") escaped++
  })

  document.getElementById("presentCount").textContent = present
  document.getElementById("absentCount").textContent = absent
  document.getElementById("justifiedCount").textContent = justified
  document.getElementById("escapedCount").textContent = escaped
}

function markAllAttendance(status) {
  const courseId = document.getElementById("attendanceCourse").value
  if (!courseId) {
    showToast("Por favor seleccione un curso primero.", "warning")
    return
  }

  const students = db.students.filter((s) => s.courseId === courseId)
  students.forEach((student) => {
    const radio = document.querySelector(`input[name="status_${student.id}"][value="${status}"]`)
    if (radio) radio.checked = true
  })
  updateAttendanceSummary()
  showToast(`Todos los estudiantes marcados como ${status}.`, "success")
}

function saveAttendance() {
  const courseId = document.getElementById("attendanceCourse").value
  const date = document.getElementById("attendanceDate").value
  const periodStart = Number.parseInt(document.getElementById("attendancePeriodStart").value)
  const periodEnd = Number.parseInt(document.getElementById("attendancePeriodEnd").value)

  if (!courseId || !date) {
    showToast("Por favor complete todos los campos requeridos.", "error")
    return
  }

  if (periodStart > periodEnd) {
    showToast("El periodo inicial no puede ser mayor que el periodo final.", "error")
    return
  }

  const students = db.students.filter((s) => s.courseId === courseId)
  const existingAttendance = db.attendance.filter(
    (a) => a.courseId === courseId && a.date === date && a.periodStart <= periodEnd && a.periodEnd >= periodStart,
  )

  if (existingAttendance.length > 0) {
    if (
      !confirmAction(
        "Ya existe un registro de asistencia para este curso, fecha y periodo(s). ¿Desea continuar de todos modos?",
      )
    ) {
      return
    }
  }

  let savedCount = 0

  students.forEach((student) => {
    const statusRadio = document.querySelector(`input[name="status_${student.id}"]:checked`)
    const observations = document.getElementById(`obs_${student.id}`).value

    if (statusRadio) {
      db.createAttendance({
        studentId: student.id,
        courseId: courseId,
        date: date,
        periodStart: periodStart,
        periodEnd: periodEnd,
        status: statusRadio.value,
        observations: observations,
      })
      savedCount++
    }
  })

  showToast(`Asistencia guardada exitosamente para ${savedCount} estudiantes.`, "success")
  document.getElementById("attendanceStudentsList").innerHTML = ""
  document.getElementById("attendanceCourse").value = ""
  document.getElementById("attendanceSummary").classList.add("hidden")
}

// Students Functions
function loadStudentFilters() {
  const filterSelect = document.getElementById("studentCourseFilter")
  filterSelect.innerHTML = '<option value="">Todos los cursos</option>'
  db.courses.forEach((course) => {
    filterSelect.innerHTML += `<option value="${course.id}">${course.name}</option>`
  })
}

function loadStudents() {
  displayStudents(db.students)
}

function filterStudents() {
  const searchTerm = document.getElementById("studentSearch").value.toLowerCase()
  const courseFilter = document.getElementById("studentCourseFilter").value

  let filtered = db.students.filter(
    (s) => s.name.toLowerCase().includes(searchTerm) || s.idNumber.toLowerCase().includes(searchTerm),
  )

  if (courseFilter) {
    filtered = filtered.filter((s) => s.courseId === courseFilter)
  }

  displayStudents(filtered)
}

function displayStudents(students) {
  const container = document.getElementById("studentsList")

  if (students.length === 0) {
    container.innerHTML = '<p class="text-gray-500 text-center py-8">No hay estudiantes registrados.</p>'
    return
  }

  let html = `
        <table class="min-w-full border">
            <thead class="bg-gray-100">
                <tr>
                    <th class="border px-4 py-2 text-left">Nombre</th>
                    <th class="border px-4 py-2 text-left">Cédula/ID</th>
                    <th class="border px-4 py-2 text-left">Curso</th>
                    <th class="border px-4 py-2 text-left">Email</th>
                    <th class="border px-4 py-2 text-left">Teléfono</th>
                    <th class="border px-4 py-2 text-center">Acciones</th>
                </tr>
            </thead>
            <tbody>
    `

  students.forEach((student) => {
    const course = db.courses.find((c) => c.id === student.courseId)
    html += `
            <tr>
                <td class="border px-4 py-2">${student.name}</td>
                <td class="border px-4 py-2">${student.idNumber}</td>
                <td class="border px-4 py-2">${course?.name || "Sin curso"}</td>
                <td class="border px-4 py-2">${student.email || "-"}</td>
                <td class="border px-4 py-2">${student.phone || "-"}</td>
                <td class="border px-4 py-2 text-center">
                    <button onclick="editStudent('${student.id}')" 
                            class="text-blue-600 hover:text-blue-800 mr-2">
                        <i class="fas fa-edit"></i>
                    </button>
                    <button onclick="deleteStudentConfirm('${student.id}')" 
                            class="text-red-600 hover:text-red-800">
                        <i class="fas fa-trash"></i>
                    </button>
                </td>
            </tr>
        `
  })

  html += `
            </tbody>
        </table>
    `

  container.innerHTML = html
}

function showStudentModal(studentId = null) {
  const modal = document.getElementById("studentModal")
  const form = document.getElementById("studentForm")
  const title = document.getElementById("studentModalTitle")

  // Populate course select
  const courseSelect = document.getElementById("studentCourse")
  courseSelect.innerHTML = ""
  db.courses.forEach((course) => {
    courseSelect.innerHTML += `<option value="${course.id}">${course.name}</option>`
  })

  if (studentId) {
    const student = db.students.find((s) => s.id === studentId)
    if (student) {
      title.textContent = "Editar Estudiante"
      document.getElementById("studentId").value = student.id
      document.getElementById("studentName").value = student.name
      document.getElementById("studentIdNumber").value = student.idNumber
      document.getElementById("studentCourse").value = student.courseId
      document.getElementById("studentEmail").value = student.email || ""
      document.getElementById("studentPhone").value = student.phone || ""
    }
  } else {
    title.textContent = "Nuevo Estudiante"
    form.reset()
    document.getElementById("studentId").value = ""
  }

  modal.classList.remove("hidden")
  modal.classList.add("flex")
}

function closeStudentModal() {
  const modal = document.getElementById("studentModal")
  modal.classList.add("hidden")
  modal.classList.remove("flex")
}

function saveStudent(event) {
  event.preventDefault()

  const id = document.getElementById("studentId").value
  const studentData = {
    name: document.getElementById("studentName").value,
    idNumber: document.getElementById("studentIdNumber").value,
    courseId: document.getElementById("studentCourse").value,
    email: document.getElementById("studentEmail").value,
    phone: document.getElementById("studentPhone").value,
  }

  if (!studentData.name || !studentData.idNumber || !studentData.courseId) {
    showToast("Por favor complete todos los campos requeridos.", "error")
    return
  }

  const duplicate = db.students.find((s) => s.idNumber === studentData.idNumber && s.id !== id)
  if (duplicate) {
    showToast("Ya existe un estudiante con esta cédula/ID.", "error")
    return
  }

  if (id) {
    db.updateStudent(id, studentData)
    showToast("Estudiante actualizado exitosamente.", "success")
  } else {
    db.createStudent(studentData)
    showToast("Estudiante creado exitosamente.", "success")
  }

  closeStudentModal()
  loadStudents()
}

function editStudent(id) {
  showStudentModal(id)
}

function deleteStudentConfirm(id) {
  if (confirmAction("¿Está seguro de eliminar este estudiante? Esta acción no se puede deshacer.")) {
    db.deleteStudent(id)
    showToast("Estudiante eliminado exitosamente.", "success")
    loadStudents()
  }
}

function exportStudentsCSV() {
  if (db.students.length === 0) {
    showToast("No hay estudiantes para exportar.", "warning")
    return
  }

  let csv = "Nombre,Cédula/ID,Curso,Email,Teléfono\n"

  db.students.forEach((student) => {
    const course = db.courses.find((c) => c.id === student.courseId)
    csv += `"${student.name}",`
    csv += `${student.idNumber},`
    csv += `"${course?.name || "Sin curso"}",`
    csv += `${student.email || ""},`
    csv += `${student.phone || ""}\n`
  })

  downloadFile(csv, `estudiantes_${new Date().toISOString().split("T")[0]}.csv`, "text/csv")
  showToast("Estudiantes exportados exitosamente.", "success")
}

// Courses Functions
function loadCourses() {
  const container = document.getElementById("coursesList")

  if (db.courses.length === 0) {
    container.innerHTML = '<p class="text-gray-500 text-center py-8 col-span-3">No hay cursos registrados.</p>'
    return
  }

  let html = ""
  db.courses.forEach((course) => {
    const studentCount = db.students.filter((s) => s.courseId === course.id).length
    html += `
            <div class="border rounded-lg p-4 hover:shadow-lg transition">
                <div class="flex justify-between items-start mb-2">
                    <h3 class="text-lg font-bold">${course.name}</h3>
                    <div class="flex space-x-2">
                        <button onclick="editCourse('${course.id}')" 
                                class="text-blue-600 hover:text-blue-800">
                            <i class="fas fa-edit"></i>
                        </button>
                        <button onclick="deleteCourseConfirm('${course.id}')" 
                                class="text-red-600 hover:text-red-800">
                            <i class="fas fa-trash"></i>
                        </button>
                    </div>
                </div>
                <p class="text-sm text-gray-600 mb-1">Código: ${course.code}</p>
                <p class="text-sm text-gray-600 mb-2">Nivel: ${course.level}</p>
                <p class="text-sm text-gray-700 mb-3">${course.description || "Sin descripción"}</p>
                <div class="flex items-center text-sm text-gray-600">
                    <i class="fas fa-users mr-2"></i>
                    <span>${studentCount} estudiantes</span>
                </div>
            </div>
        `
  })

  container.innerHTML = html
}

function showCourseModal(courseId = null) {
  const modal = document.getElementById("courseModal")
  const form = document.getElementById("courseForm")
  const title = document.getElementById("courseModalTitle")

  if (courseId) {
    const course = db.courses.find((c) => c.id === courseId)
    if (course) {
      title.textContent = "Editar Curso"
      document.getElementById("courseId").value = course.id
      document.getElementById("courseName").value = course.name
      document.getElementById("courseCode").value = course.code
      document.getElementById("courseLevel").value = course.level
      document.getElementById("courseDescription").value = course.description || ""
    }
  } else {
    title.textContent = "Nuevo Curso"
    form.reset()
    document.getElementById("courseId").value = ""
  }

  modal.classList.remove("hidden")
  modal.classList.add("flex")
}

function closeCourseModal() {
  const modal = document.getElementById("courseModal")
  modal.classList.add("hidden")
  modal.classList.remove("flex")
}

function saveCourse(event) {
  event.preventDefault()

  const id = document.getElementById("courseId").value
  const courseData = {
    name: document.getElementById("courseName").value,
    code: document.getElementById("courseCode").value,
    level: document.getElementById("courseLevel").value,
    description: document.getElementById("courseDescription").value,
  }

  if (!courseData.name || !courseData.code) {
    showToast("Por favor complete todos los campos requeridos.", "error")
    return
  }

  const duplicate = db.courses.find((c) => c.code === courseData.code && c.id !== id)
  if (duplicate) {
    showToast("Ya existe un curso con este código.", "error")
    return
  }

  if (id) {
    db.updateCourse(id, courseData)
    showToast("Curso actualizado exitosamente.", "success")
  } else {
    db.createCourse(courseData)
    showToast("Curso creado exitosamente.", "success")
  }

  closeCourseModal()
  loadCourses()
}

function editCourse(id) {
  showCourseModal(id)
}

function deleteCourseConfirm(id) {
  const studentCount = db.students.filter((s) => s.courseId === id).length
  if (studentCount > 0) {
    showToast(`No se puede eliminar el curso porque tiene ${studentCount} estudiantes asignados.`, "error")
    return
  }

  if (confirmAction("¿Está seguro de eliminar este curso?")) {
    db.deleteCourse(id)
    showToast("Curso eliminado exitosamente.", "success")
    loadCourses()
  }
}

// Schedules Functions
function loadSchedules() {
  const container = document.getElementById("schedulesList")

  if (db.schedules.length === 0) {
    container.innerHTML = '<p class="text-gray-500 text-center py-8">No hay horarios registrados.</p>'
    return
  }

  // Group by day
  const days = ["Lunes", "Martes", "Miércoles", "Jueves", "Viernes"]
  let html = '<table class="min-w-full border"><thead class="bg-gray-100"><tr>'
  html += '<th class="border px-4 py-2">Periodo</th>'
  days.forEach((day) => {
    html += `<th class="border px-4 py-2">${day}</th>`
  })
  html += "</tr></thead><tbody>"

  for (let period = 1; period <= 8; period++) {
    html += `<tr><td class="border px-4 py-2 font-semibold">${period}°</td>`

    days.forEach((day) => {
      const schedules = db.schedules.filter((s) => s.day === day && s.period === period)
      html += '<td class="border px-4 py-2">'

      if (schedules.length > 0) {
        schedules.forEach((schedule) => {
          const course = db.courses.find((c) => c.id === schedule.courseId)
          html += `
                        <div class="mb-2 p-2 bg-blue-50 rounded text-sm">
                            <div class="font-semibold">${course?.name || "Sin curso"}</div>
                            <div class="text-xs text-gray-600">${schedule.subject}</div>
                            <div class="flex space-x-2 mt-1">
                                <button onclick="editSchedule('${schedule.id}')" 
                                        class="text-blue-600 hover:text-blue-800 text-xs">
                                    <i class="fas fa-edit"></i>
                                </button>
                                <button onclick="deleteScheduleConfirm('${schedule.id}')" 
                                        class="text-red-600 hover:text-red-800 text-xs">
                                    <i class="fas fa-trash"></i>
                                </button>
                            </div>
                        </div>
                    `
        })
      }

      html += "</td>"
    })

    html += "</tr>"
  }

  html += "</tbody></table>"
  container.innerHTML = html
}

function showScheduleModal(scheduleId = null) {
  const modal = document.getElementById("scheduleModal")
  const form = document.getElementById("scheduleForm")
  const title = document.getElementById("scheduleModalTitle")

  // Populate course select
  const courseSelect = document.getElementById("scheduleCourse")
  courseSelect.innerHTML = ""
  db.courses.forEach((course) => {
    courseSelect.innerHTML += `<option value="${course.id}">${course.name}</option>`
  })

  if (scheduleId) {
    const schedule = db.schedules.find((s) => s.id === scheduleId)
    if (schedule) {
      title.textContent = "Editar Horario"
      document.getElementById("scheduleId").value = schedule.id
      document.getElementById("scheduleCourse").value = schedule.courseId
      document.getElementById("scheduleDay").value = schedule.day
      document.getElementById("schedulePeriod").value = schedule.period
      document.getElementById("scheduleSubject").value = schedule.subject
    }
  } else {
    title.textContent = "Nuevo Horario"
    form.reset()
    document.getElementById("scheduleId").value = ""
  }

  modal.classList.remove("hidden")
  modal.classList.add("flex")
}

function closeScheduleModal() {
  const modal = document.getElementById("scheduleModal")
  modal.classList.add("hidden")
  modal.classList.remove("flex")
}

function saveSchedule(event) {
  event.preventDefault()

  const id = document.getElementById("scheduleId").value
  const scheduleData = {
    courseId: document.getElementById("scheduleCourse").value,
    day: document.getElementById("scheduleDay").value,
    period: Number.parseInt(document.getElementById("schedulePeriod").value),
    subject: document.getElementById("scheduleSubject").value,
  }

  if (!scheduleData.courseId || !scheduleData.day || !scheduleData.subject) {
    showToast("Por favor complete todos los campos requeridos.", "error")
    return
  }

  if (id) {
    db.updateSchedule(id, scheduleData)
    showToast("Horario actualizado exitosamente.", "success")
  } else {
    db.createSchedule(scheduleData)
    showToast("Horario creado exitosamente.", "success")
  }

  closeScheduleModal()
  loadSchedules()
}

function editSchedule(id) {
  showScheduleModal(id)
}

function deleteScheduleConfirm(id) {
  if (confirmAction("¿Está seguro de eliminar este horario?")) {
    db.deleteSchedule(id)
    showToast("Horario eliminado exitosamente.", "success")
    loadSchedules()
  }
}

// Reports Functions
function setReportType(type) {
  currentReportType = type

  // Update button styles
  document.getElementById("reportTypeGeneral").className =
    "px-4 py-2 bg-gray-300 text-gray-700 rounded hover:bg-gray-400"
  document.getElementById("reportTypeByStudent").className =
    "px-4 py-2 bg-gray-300 text-gray-700 rounded hover:bg-gray-400"
  document.getElementById("reportTypeByCourse").className =
    "px-4 py-2 bg-gray-300 text-gray-700 rounded hover:bg-gray-400"

  document.getElementById(`reportType${type.charAt(0).toUpperCase() + type.slice(1)}`).className =
    "px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"

  generateReport()
}

function loadReportsTab() {
  const courseSelect = document.getElementById("reportCourse")
  courseSelect.innerHTML = '<option value="">Todos los cursos</option>'
  db.courses.forEach((course) => {
    courseSelect.innerHTML += `<option value="${course.id}">${course.name}</option>`
  })

  const today = new Date().toISOString().split("T")[0]
  const weekAgo = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString().split("T")[0]
  document.getElementById("reportDateStart").value = weekAgo
  document.getElementById("reportDateEnd").value = today

  // Added default report type on load
  setReportType("general")
  generateReport()
}

function generateReport() {
  const courseId = document.getElementById("reportCourse").value
  const startDate = document.getElementById("reportDateStart").value
  const endDate = document.getElementById("reportDateEnd").value

  if (!startDate || !endDate) {
    return
  }

  let attendanceRecords = db.getAttendanceByDateRange(startDate, endDate)

  if (courseId) {
    attendanceRecords = attendanceRecords.filter((a) => a.courseId === courseId)
  }

  switch (currentReportType) {
    case "general":
      displayReport(attendanceRecords, startDate, endDate)
      break
    case "byStudent":
      displayReportByStudent(attendanceRecords, startDate, endDate)
      break
    case "byCourse":
      displayReportByCourse(attendanceRecords, startDate, endDate)
      break
  }
}

function displayReport(records, startDate, endDate) {
  const container = document.getElementById("reportContent")

  if (records.length === 0) {
    container.innerHTML =
      '<p class="text-gray-500 text-center py-8">No hay datos para el rango de fechas seleccionado.</p>'
    return
  }

  // Calculate statistics
  const stats = {
    total: records.length,
    presente: records.filter((r) => r.status === "presente").length,
    ausente: records.filter((r) => r.status === "ausente").length,
    justificado: records.filter((r) => r.status === "justificado").length,
    fugado: records.filter((r) => r.status === "fugado").length,
  }

  let html = `
        <div class="mb-6">
            <h3 class="text-xl font-bold mb-4">Estadísticas del Periodo</h3>
            <p class="text-sm text-gray-600 mb-4">Desde ${startDate} hasta ${endDate}</p>
            <div class="grid grid-cols-2 md:grid-cols-5 gap-4">
                <div class="bg-gray-100 p-4 rounded text-center">
                    <p class="text-2xl font-bold">${stats.total}</p>
                    <p class="text-sm text-gray-600">Total Registros</p>
                </div>
                <div class="bg-green-100 p-4 rounded text-center">
                    <p class="text-2xl font-bold text-green-600">${stats.presente}</p>
                    <p class="text-sm text-gray-600">Presentes</p>
                </div>
                <div class="bg-red-100 p-4 rounded text-center">
                    <p class="text-2xl font-bold text-red-600">${stats.ausente}</p>
                    <p class="text-sm text-gray-600">Ausentes</p>
                </div>
                <div class="bg-yellow-100 p-4 rounded text-center">
                    <p class="text-2xl font-bold text-yellow-600">${stats.justificado}</p>
                    <p class="text-sm text-gray-600">Justificados</p>
                </div>
                <div class="bg-orange-100 p-4 rounded text-center">
                    <p class="text-2xl font-bold text-orange-600">${stats.fugado}</p>
                    <p class="text-sm text-gray-600">Fugados</p>
                </div>
            </div>
        </div>
        
        <div>
            <h3 class="text-xl font-bold mb-4">Detalle de Registros</h3>
            <table class="min-w-full border">
                <thead class="bg-gray-100">
                    <tr>
                        <th class="border px-4 py-2 text-left">Fecha</th>
                        <th class="border px-4 py-2 text-left">Estudiante</th>
                        <th class="border px-4 py-2 text-left">Curso</th>
                        <th class="border px-4 py-2 text-left">Periodo(s)</th>
                        <th class="border px-4 py-2 text-left">Estado</th>
                        <th class="border px-4 py-2 text-left">Observaciones</th>
                    </tr>
                </thead>
                <tbody>
    `

  records.forEach((record) => {
    const student = db.students.find((s) => s.id === record.studentId)
    const course = db.courses.find((c) => c.id === record.courseId)

    const statusColors = {
      presente: "bg-green-100 text-green-800",
      ausente: "bg-red-100 text-red-800",
      justificado: "bg-yellow-100 text-yellow-800",
      fugado: "bg-orange-100 text-orange-800",
    }

    const statusLabels = {
      presente: "Presente",
      ausente: "Ausente",
      justificado: "Justificado",
      fugado: "Fugado",
    }

    html += `
            <tr>
                <td class="border px-4 py-2">${record.date}</td>
                <td class="border px-4 py-2">${student?.name || "Desconocido"}</td>
                <td class="border px-4 py-2">${course?.name || "Sin curso"}</td>
                <td class="border px-4 py-2">${record.periodStart}° - ${record.periodEnd}°</td>
                <td class="border px-4 py-2">
                    <span class="px-2 py-1 rounded text-sm ${statusColors[record.status]}">
                        ${statusLabels[record.status]}
                    </span>
                </td>
                <td class="border px-4 py-2">${record.observations || "-"}</td>
            </tr>
        `
  })

  html += `
                </tbody>
            </table>
        </div>
    `

  container.innerHTML = html
}

function displayReportByStudent(records, startDate, endDate) {
  const container = document.getElementById("reportContent")

  if (records.length === 0) {
    container.innerHTML =
      '<p class="text-gray-500 text-center py-8">No hay datos para el rango de fechas seleccionado.</p>'
    return
  }

  // Group by student
  const byStudent = {}
  records.forEach((record) => {
    if (!byStudent[record.studentId]) {
      byStudent[record.studentId] = {
        presente: 0,
        ausente: 0,
        justificado: 0,
        fugado: 0,
        total: 0,
      }
    }
    byStudent[record.studentId][record.status]++
    byStudent[record.studentId].total++
  })

  let html = `
    <div>
      <h3 class="text-xl font-bold mb-4">Reporte por Estudiante</h3>
      <p class="text-sm text-gray-600 mb-4">Desde ${startDate} hasta ${endDate}</p>
      <table class="min-w-full border">
        <thead class="bg-gray-100">
          <tr>
            <th class="border px-4 py-2 text-left">Estudiante</th>
            <th class="border px-4 py-2 text-left">Curso</th>
            <th class="border px-4 py-2 text-center">Total</th>
            <th class="border px-4 py-2 text-center">Presentes</th>
            <th class="border px-4 py-2 text-center">Ausentes</th>
            <th class="border px-4 py-2 text-center">Justificados</th>
            <th class="border px-4 py-2 text-center">Fugados</th>
            <th class="border px-4 py-2 text-center">% Asistencia</th>
          </tr>
        </thead>
        <tbody>
  `

  Object.keys(byStudent).forEach((studentId) => {
    const student = db.students.find((s) => s.id === studentId)
    const course = db.courses.find((c) => c.id === student?.courseId)
    const stats = byStudent[studentId]
    const percentage = ((stats.presente / stats.total) * 100).toFixed(1)

    html += `
      <tr>
        <td class="border px-4 py-2">${student?.name || "Desconocido"}</td>
        <td class="border px-4 py-2">${course?.name || "Sin curso"}</td>
        <td class="border px-4 py-2 text-center font-semibold">${stats.total}</td>
        <td class="border px-4 py-2 text-center text-green-600">${stats.presente}</td>
        <td class="border px-4 py-2 text-center text-red-600">${stats.ausente}</td>
        <td class="border px-4 py-2 text-center text-yellow-600">${stats.justificado}</td>
        <td class="border px-4 py-2 text-center text-orange-600">${stats.fugado}</td>
        <td class="border px-4 py-2 text-center">
          <span class="px-2 py-1 rounded text-sm ${percentage >= 80 ? "bg-green-100 text-green-800" : percentage >= 60 ? "bg-yellow-100 text-yellow-800" : "bg-red-100 text-red-800"}">
            ${percentage}%
          </span>
        </td>
      </tr>
    `
  })

  html += "</tbody></table></div>"
  container.innerHTML = html
}

function displayReportByCourse(records, startDate, endDate) {
  const container = document.getElementById("reportContent")

  if (records.length === 0) {
    container.innerHTML =
      '<p class="text-gray-500 text-center py-8">No hay datos para el rango de fechas seleccionado.</p>'
    return
  }

  // Group by course
  const byCourse = {}
  records.forEach((record) => {
    if (!byCourse[record.courseId]) {
      byCourse[record.courseId] = {
        presente: 0,
        ausente: 0,
        justificado: 0,
        fugado: 0,
        total: 0,
      }
    }
    byCourse[record.courseId][record.status]++
    byCourse[record.courseId].total++
  })

  let html = `
    <div>
      <h3 class="text-xl font-bold mb-4">Reporte por Curso</h3>
      <p class="text-sm text-gray-600 mb-4">Desde ${startDate} hasta ${endDate}</p>
      <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
  `

  Object.keys(byCourse).forEach((courseId) => {
    const course = db.courses.find((c) => c.id === courseId)
    const stats = byCourse[courseId]
    const percentage = ((stats.presente / stats.total) * 100).toFixed(1)

    html += `
      <div class="border rounded-lg p-4">
        <h4 class="font-bold text-lg mb-3">${course?.name || "Sin curso"}</h4>
        <div class="space-y-2">
          <div class="flex justify-between">
            <span>Total registros:</span>
            <span class="font-semibold">${stats.total}</span>
          </div>
          <div class="flex justify-between">
            <span class="text-green-600">Presentes:</span>
            <span class="font-semibold text-green-600">${stats.presente}</span>
          </div>
          <div class="flex justify-between">
            <span class="text-red-600">Ausentes:</span>
            <span class="font-semibold text-red-600">${stats.ausente}</span>
          </div>
          <div class="flex justify-between">
            <span class="text-yellow-600">Justificados:</span>
            <span class="font-semibold text-yellow-600">${stats.justificado}</span>
          </div>
          <div class="flex justify-between">
            <span class="text-orange-600">Fugados:</span>
            <span class="font-semibold text-orange-600">${stats.fugado}</span>
          </div>
          <div class="border-t pt-2 mt-2">
            <div class="flex justify-between items-center">
              <span class="font-semibold">% Asistencia:</span>
              <span class="px-3 py-1 rounded ${percentage >= 80 ? "bg-green-100 text-green-800" : percentage >= 60 ? "bg-yellow-100 text-yellow-800" : "bg-red-100 text-red-800"}">
                ${percentage}%
              </span>
            </div>
          </div>
        </div>
      </div>
    `
  })

  html += "</div></div>"
  container.innerHTML = html
}

function printReport() {
  window.print()
}

function exportReportCSV() {
  const courseId = document.getElementById("reportCourse").value
  const startDate = document.getElementById("reportDateStart").value
  const endDate = document.getElementById("reportDateEnd").value

  let records = db.getAttendanceByDateRange(startDate, endDate)
  if (courseId) {
    records = records.filter((a) => a.courseId === courseId)
  }

  if (records.length === 0) {
    showToast("No hay datos para exportar.", "warning")
    return
  }

  let csv = "Fecha,Estudiante,Cédula,Curso,Periodo Inicio,Periodo Fin,Estado,Observaciones\n"

  records.forEach((record) => {
    const student = db.students.find((s) => s.id === record.studentId)
    const course = db.courses.find((c) => c.id === record.courseId)

    csv += `${record.date},`
    csv += `"${student?.name || "Desconocido"}",`
    csv += `${student?.idNumber || ""},`
    csv += `"${course?.name || "Sin curso"}",`
    csv += `${record.periodStart},`
    csv += `${record.periodEnd},`
    csv += `${record.status},`
    csv += `"${record.observations || ""}"\n`
  })

  downloadFile(csv, `reporte_asistencia_${startDate}_${endDate}.csv`, "text/csv")
  showToast("Reporte exportado exitosamente.", "success")
}

// Export/Import Functions
function exportData() {
  const data = {
    students: db.students,
    courses: db.courses,
    schedules: db.schedules,
    attendance: db.attendance,
    exportDate: new Date().toISOString(),
    version: "1.0",
  }

  const json = JSON.stringify(data, null, 2)
  downloadFile(json, `backup_asistencia_${new Date().toISOString().split("T")[0]}.json`, "application/json")
  showToast("Datos exportados exitosamente.", "success")
}

function importData() {
  const input = document.createElement("input")
  input.type = "file"
  input.accept = ".json"

  input.onchange = (e) => {
    const file = e.target.files[0]
    const reader = new FileReader()

    reader.onload = (event) => {
      try {
        const data = JSON.parse(event.target.result)

        if (confirmAction("¿Está seguro de importar estos datos? Esto reemplazará todos los datos actuales.")) {
          if (data.students) db.students = data.students
          if (data.courses) db.courses = data.courses
          if (data.schedules) db.schedules = data.schedules
          if (data.attendance) db.attendance = data.attendance

          db.save("students", db.students)
          db.save("courses", db.courses)
          db.save("schedules", db.schedules)
          db.save("attendance", db.attendance)

          showToast("Datos importados exitosamente.", "success")
          setTimeout(() => location.reload(), 1500)
        }
      } catch (error) {
        showToast("Error al importar los datos. Verifique que el archivo sea válido.", "error")
        console.error(error)
      }
    }

    reader.readAsText(file)
  }

  input.click()
}

function clearAllData() {
  if (
    confirmAction(
      "¿Está COMPLETAMENTE SEGURO de eliminar TODOS los datos del sistema? Esta acción NO se puede deshacer.",
    )
  ) {
    if (
      confirmAction(
        "Última confirmación: ¿Realmente desea eliminar todos los estudiantes, cursos, horarios y registros de asistencia?",
      )
    ) {
      localStorage.clear()
      showToast("Todos los datos han sido eliminados.", "success")
      setTimeout(() => location.reload(), 1500)
    }
  }
}

function downloadFile(content, filename, contentType) {
  const blob = new Blob([content], { type: contentType })
  const url = URL.createObjectURL(blob)
  const link = document.createElement("a")
  link.href = url
  link.download = filename
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
  URL.revokeObjectURL(url)
}

// Initialize app
document.addEventListener("DOMContentLoaded", () => {
  showTab("dashboard")
  setInterval(updateCurrentPeriod, 60000)
})
