import { NextResponse } from "next/server"

// In-memory storage for demo purposes
const blogPosts = [
  {
    _id: "1",
    title: "Getting Started with React Hooks",
    excerpt: "Learn how to use React Hooks to manage state and side effects in functional components.",
    content:
      "React Hooks revolutionized how we write React components. They allow us to use state and other React features without writing a class component. The useState hook is one of the most commonly used hooks...",
    tags: ["React", "JavaScript", "Hooks"],
    author: "John Doe",
    readTime: 8,
    createdAt: new Date().toISOString(),
  },
  {
    _id: "2",
    title: "Building RESTful APIs with Node.js",
    excerpt: "A comprehensive guide to creating robust REST APIs using Node.js and Express.",
    content:
      "Building APIs is a fundamental skill for backend developers. In this post, we'll explore how to create RESTful APIs using Node.js and Express framework...",
    tags: ["Node.js", "Express", "API", "Backend"],
    author: "John Doe",
    readTime: 12,
    createdAt: new Date().toISOString(),
  },
  {
    _id: "3",
    title: "CSS Grid vs Flexbox: When to Use What",
    excerpt: "Understanding the differences between CSS Grid and Flexbox and when to use each.",
    content:
      "CSS Grid and Flexbox are both powerful layout systems in CSS, but they serve different purposes. Understanding when to use each one is crucial for creating efficient and maintainable layouts...",
    tags: ["CSS", "Layout", "Frontend"],
    author: "John Doe",
    readTime: 6,
    createdAt: new Date().toISOString(),
  },
]

export async function GET() {
  try {
    return NextResponse.json(blogPosts)
  } catch (error) {
    console.error("Error fetching blog posts:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

export async function POST(request) {
  try {
    const postData = await request.json()

    const newPost = {
      _id: Date.now().toString(),
      ...postData,
      createdAt: new Date().toISOString(),
    }

    blogPosts.push(newPost)

    return NextResponse.json(newPost, { status: 201 })
  } catch (error) {
    console.error("Error creating blog post:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}


export async function DELETE(request, { params }) {
  try {
    const { id } = params

    const postIndex = blogPosts.findIndex((p) => p._id === id)

    if (postIndex === -1) {
      return NextResponse.json({ error: "Blog post not found" }, { status: 404 })
    }

    blogPosts.splice(postIndex, 1)

    return NextResponse.json({ message: "Blog post deleted successfully" })
  } catch (error) {
    console.error("Error deleting blog post:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
  