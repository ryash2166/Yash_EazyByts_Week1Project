import { NextResponse } from "next/server"

// In-memory storage for demo purposes
const projects = [
  {
    _id: "1",
    title: "E-commerce Platform",
    description: "A full-stack e-commerce solution with React and Node.js",
    technologies: ["React", "Node.js", "MongoDB", "Express"],
    githubUrl: "https://github.com/example/ecommerce",
    liveUrl: "https://ecommerce-demo.com",
    imageUrl: "/placeholder.svg?height=200&width=400",
    createdAt: new Date().toISOString(),
  },
  {
    _id: "2",
    title: "Task Management App",
    description: "A collaborative task management application with real-time updates",
    technologies: ["React", "Socket.io", "Express", "PostgreSQL"],
    githubUrl: "https://github.com/example/taskmanager",
    liveUrl: "https://taskmanager-demo.com",
    imageUrl: "/placeholder.svg?height=200&width=400",
    createdAt: new Date().toISOString(),
  },
  {
    _id: "3",
    title: "Weather Dashboard",
    description: "A responsive weather dashboard with location-based forecasts",
    technologies: ["Vue.js", "TypeScript", "Weather API", "Tailwind CSS"],
    githubUrl: "https://github.com/example/weather",
    liveUrl: "https://weather-demo.com",
    imageUrl: "/placeholder.svg?height=200&width=400",
    createdAt: new Date().toISOString(),
  },
]

export async function GET() {
  try {
    return NextResponse.json(projects)
  } catch (error) {
    console.error("Error fetching projects:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

export async function POST(request) {
  try {
    const projectData = await request.json()

    const newProject = {
      _id: Date.now().toString(),
      ...projectData,
      createdAt: new Date().toISOString(),
    }

    projects.push(newProject)

    return NextResponse.json(newProject, { status: 201 })
  } catch (error) {
    console.error("Error creating project:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

export async function DELETE(request, { params }) {
  try {
    const { id } = params

    const projectIndex = projects.findIndex((p) => p._id === id)

    if (projectIndex === -1) {
      return NextResponse.json({ error: "Project not found" }, { status: 404 })
    }

    projects.splice(projectIndex, 1)

    return NextResponse.json({ message: "Project deleted successfully" })
  } catch (error) {
    console.error("Error deleting project:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
  