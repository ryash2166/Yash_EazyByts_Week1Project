import { NextResponse } from "next/server"

// In-memory storage for demo purposes
const contacts = [
  {
    _id: "1",
    name: "Alice Johnson",
    email: "alice@example.com",
    subject: "Project Inquiry",
    message: "Hi! I'm interested in discussing a potential web development project. Could we schedule a call?",
    createdAt: new Date(Date.now() - 86400000).toISOString(), // 1 day ago
  },
  {
    _id: "2",
    name: "Bob Smith",
    email: "bob@example.com",
    subject: "Collaboration Opportunity",
    message:
      "I saw your portfolio and would love to collaborate on an upcoming project. Let me know if you're available.",
    createdAt: new Date(Date.now() - 172800000).toISOString(), // 2 days ago
  },
]

export async function GET() {
  try {
    return NextResponse.json(contacts)
  } catch (error) {
    console.error("Error fetching contacts:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

export async function POST(request) {
  try {
    const contactData = await request.json()

    const newContact = {
      _id: Date.now().toString(),
      ...contactData,
      createdAt: new Date().toISOString(),
    }

    contacts.push(newContact)

    // Simulate email sending (in production, use real email service)
    console.log("New contact form submission:", newContact)

    return NextResponse.json(newContact, { status: 201 })
  } catch (error) {
    console.error("Error creating contact:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
