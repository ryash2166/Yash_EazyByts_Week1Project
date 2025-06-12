import { NextResponse } from "next/server"

const DEMO_USER = {
  id: "1",
  email: "admin@example.com",
  name: "Admin User",
}

export async function GET(request) {
  try {
    const authHeader = request.headers.get("authorization")

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return NextResponse.json({ error: "No token provided" }, { status: 401 })
    }

    const token = authHeader.substring(7)

    try {
      // Decode simple token (in production, verify JWT properly)
      const decoded = JSON.parse(atob(token))

      if (decoded.userId === DEMO_USER.id) {
        return NextResponse.json({ user: DEMO_USER })
      }

      return NextResponse.json({ error: "Invalid token" }, { status: 401 })
    } catch (decodeError) {
      return NextResponse.json({ error: "Invalid token" }, { status: 401 })
    }
  } catch (error) {
    console.error("Token verification error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
