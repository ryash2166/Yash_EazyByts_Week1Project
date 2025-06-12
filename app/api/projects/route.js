import { NextResponse } from "next/server"

// In-memory storage for demo purposes
const projects = [
  {
    _id: "1",
    title: "E-commerce Platform",
    description: "A full responsive e-commerce solution with React and Auth0 authentication",
    technologies: ["React", "Tailwind", "Redux", "BootStrap", "Auth0", "Axios"],
    githubUrl: "https://github.com/ryash2166/Yash_Emart_Frontend",
    liveUrl: "https://yashemart.netlify.app/",
    imageUrl: "/emart.png",
    createdAt: new Date().toISOString(),
  },
  {
    _id: "2",
    title: "AI Powered Image and Video Generator",
    description: "A collaborative AI Image and Video generator application with real-time prompts and upload features",
    technologies: ["React", "Node.js", "Express", "MongoDB", "Tailwind", "Replicate APIs", "JWT"],
    githubUrl: "https://github.com/ryash2166/yash_Archiks88AI",
    liveUrl: "",
    imageUrl: "/archiks88ai.png",
    createdAt: new Date().toISOString(),
  },
  {
    _id: "3",
    title: "Amrutam Doctor Profile UI",
    description: "A responsive Profile UI with All the details of the doctor",
    technologies: ["React", "Tailwind CSS", "Mapping", "Axios"],
    githubUrl: "https://github.com/ryash2166/yash_amrutam",
    liveUrl: "https://yashamrutam.netlify.app/",
    imageUrl: "/amrutam.png",
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
  