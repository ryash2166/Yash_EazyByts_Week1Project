import { NextResponse } from "next/server"

// In-memory storage for demo purposes
const blogPosts = [
  {
    _id: "1",
    title: "Getting Started with React Hooks",
    excerpt: "Learn how to use React Hooks to manage state and side effects in functional components.",
    content:
      "React Hooks revolutionized how we write React components. They allow us to use state and other React features without writing a class component. The useState hook is one of the most commonly used hooks for managing component state. It returns an array with two elements: the current state value and a function to update it. Here's a simple example of how to use useState in a functional component. The useEffect hook is another essential hook that lets you perform side effects in functional components. It serves the same purpose as componentDidMount, componentDidUpdate, and componentWillUnmount combined in React class components. You can use useEffect to fetch data, set up subscriptions, or manually change the DOM. The dependency array in useEffect is crucial for controlling when the effect runs. If you pass an empty array, the effect will only run once after the initial render. If you include variables in the dependency array, the effect will run whenever those variables change.",
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
      "Building APIs is a fundamental skill for backend developers. In this post, we'll explore how to create RESTful APIs using Node.js and Express framework. REST (Representational State Transfer) is an architectural style for designing networked applications. It relies on a stateless, client-server communication protocol. RESTful APIs use HTTP methods like GET, POST, PUT, and DELETE to perform operations on resources. Express.js is a minimal and flexible Node.js web application framework that provides a robust set of features for web and mobile applications. It's perfect for building APIs because of its simplicity and extensive middleware ecosystem. To get started, you'll need to install Express and set up a basic server. Then you can define routes for different HTTP methods and handle requests accordingly.",
    tags: ["Node.js", "Express", "API", "Backend"],
    author: "John Doe",
    readTime: 12,
    createdAt: new Date().toISOString(),
  },
]

export async function GET(request, { params }) {
  try {
    const { id } = params
    const post = blogPosts.find((p) => p._id === id)

    if (!post) {
      return NextResponse.json({ error: "Blog post not found" }, { status: 404 })
    }

    return NextResponse.json(post)
  } catch (error) {
    console.error("Error fetching blog post:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

export async function PUT(request, { params }) {
  try {
    const { id } = params
    const postData = await request.json()

    const postIndex = blogPosts.findIndex((p) => p._id === id)

    if (postIndex === -1) {
      return NextResponse.json({ error: "Blog post not found" }, { status: 404 })
    }

    blogPosts[postIndex] = {
      ...blogPosts[postIndex],
      ...postData,
      updatedAt: new Date().toISOString(),
    }

    return NextResponse.json(blogPosts[postIndex])
  } catch (error) {
    console.error("Error updating blog post:", error)
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
