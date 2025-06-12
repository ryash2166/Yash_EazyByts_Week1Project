import { NextResponse } from "next/server"

// Demo user for authentication
const DEMO_USER = {
  id: "1",
  email: "admin@example.com",
  password: "admin123", // In production, this would be hashed
  name: "Admin User",
}

export async function POST(request) {
  try {
    const { email, password } = await request.json()

    // Check credentials
    if (email === DEMO_USER.email && password === DEMO_USER.password) {
      // Generate simple token (in production, use proper JWT)
      const token = btoa(JSON.stringify({ userId: DEMO_USER.id, email: DEMO_USER.email }))

      return NextResponse.json({
        token,
        user: {
          id: DEMO_USER.id,
          email: DEMO_USER.email,
          name: DEMO_USER.name,
        },
      })
    }

    return NextResponse.json({ error: "Invalid credentials" }, { status: 401 })
  } catch (error) {
    console.error("Login error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
