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
      break
    case "students":
      loadStudents()
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
    return
  }

  const students = db.students.filter((s) => s.courseId === courseId)

  if (students.length === 0) {
    container.innerHTML = '<p class="text-gray-500 text-center py-8">No hay estudiantes en este curso.</p>'
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
                           class="w-4 h-4 text-green-600">
                </td>
                <td class="border px-4 py-2 text-center">
                    <input type="radio" name="status_${student.id}" value="ausente" 
                           class="w-4 h-4 text-red-600">
                </td>
                <td class="border px-4 py-2 text-center">
                    <input type="radio" name="status_${student.id}" value="justificado" 
                           class="w-4 h-4 text-yellow-600">
                </td>
                <td class="border px-4 py-2 text-center">
                    <input type="radio" name="status_${student.id}" value="fugado" 
                           class="w-4 h-4 text-orange-600">
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
}

function markAllAttendance(status) {
  const courseId = document.getElementById("attendanceCourse").value
  if (!courseId) {
    alert("Por favor seleccione un curso primero.")
    return
  }

  const students = db.students.filter((s) => s.courseId === courseId)
  students.forEach((student) => {
    const radio = document.querySelector(`input[name="status_${student.id}"][value="${status}"]`)
    if (radio) radio.checked = true
  })
}

function saveAttendance() {
  const courseId = document.getElementById("attendanceCourse").value
  const date = document.getElementById("attendanceDate").value
  const periodStart = Number.parseInt(document.getElementById("attendancePeriodStart").value)
  const periodEnd = Number.parseInt(document.getElementById("attendancePeriodEnd").value)

  if (!courseId || !date) {
    alert("Por favor complete todos los campos requeridos.")
    return
  }

  if (periodStart > periodEnd) {
    alert("El periodo inicial no puede ser mayor que el periodo final.")
    return
  }

  const students = db.students.filter((s) => s.courseId === courseId)
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

  alert(`Asistencia guardada exitosamente para ${savedCount} estudiantes.`)
  document.getElementById("attendanceStudentsList").innerHTML = ""
  document.getElementById("attendanceCourse").value = ""
}

// Students Functions
function loadStudents() {
  displayStudents(db.students)
}

function filterStudents() {
  const searchTerm = document.getElementById("studentSearch").value.toLowerCase()
  const filtered = db.students.filter(
    (s) => s.name.toLowerCase().includes(searchTerm) || s.idNumber.toLowerCase().includes(searchTerm),
  )
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

  if (id) {
    db.updateStudent(id, studentData)
  } else {
    db.createStudent(studentData)
  }

  closeStudentModal()
  loadStudents()
}

function editStudent(id) {
  showStudentModal(id)
}

function deleteStudentConfirm(id) {
  if (confirm("¿Está seguro de eliminar este estudiante?")) {
    db.deleteStudent(id)
    loadStudents()
  }
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

  if (id) {
    db.updateCourse(id, courseData)
  } else {
    db.createCourse(courseData)
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
    alert(`No se puede eliminar el curso porque tiene ${studentCount} estudiantes asignados.`)
    return
  }

  if (confirm("¿Está seguro de eliminar este curso?")) {
    db.deleteCourse(id)
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

  if (id) {
    db.updateSchedule(id, scheduleData)
  } else {
    db.createSchedule(scheduleData)
  }

  closeScheduleModal()
  loadSchedules()
}

function editSchedule(id) {
  showScheduleModal(id)
}

function deleteScheduleConfirm(id) {
  if (confirm("¿Está seguro de eliminar este horario?")) {
    db.deleteSchedule(id)
    loadSchedules()
  }
}

// Reports Functions
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

  displayReport(attendanceRecords, startDate, endDate)
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
    alert("No hay datos para exportar.")
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
}

// Export/Import Functions
function exportData() {
  const data = {
    students: db.students,
    courses: db.courses,
    schedules: db.schedules,
    attendance: db.attendance,
    exportDate: new Date().toISOString(),
  }

  const json = JSON.stringify(data, null, 2)
  downloadFile(json, `backup_asistencia_${new Date().toISOString().split("T")[0]}.json`, "application/json")
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

        if (confirm("¿Está seguro de importar estos datos? Esto reemplazará todos los datos actuales.")) {
          if (data.students) db.students = data.students
          if (data.courses) db.courses = data.courses
          if (data.schedules) db.schedules = data.schedules
          if (data.attendance) db.attendance = data.attendance

          db.save("students", db.students)
          db.save("courses", db.courses)
          db.save("schedules", db.schedules)
          db.save("attendance", db.attendance)

          alert("Datos importados exitosamente.")
          location.reload()
        }
      } catch (error) {
        alert("Error al importar los datos. Verifique que el archivo sea válido.")
        console.error(error)
      }
    }

    reader.readAsText(file)
  }

  input.click()
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
})
