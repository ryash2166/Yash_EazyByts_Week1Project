// Database setup script for MongoDB
// This script demonstrates how you would set up MongoDB collections and indexes

console.log("Setting up MongoDB database...")

// Demo data structure for MongoDB collections
const collections = {
  users: {
    schema: {
      email: "String (unique)",
      password: "String (hashed)",
      name: "String",
      role: "String (admin/user)",
      createdAt: "Date",
      updatedAt: "Date",
    },
    indexes: ["email"],
  },

  projects: {
    schema: {
      title: "String",
      description: "String",
      technologies: "Array of Strings",
      githubUrl: "String",
      liveUrl: "String",
      imageUrl: "String",
      featured: "Boolean",
      createdAt: "Date",
      updatedAt: "Date",
    },
    indexes: ["createdAt", "featured"],
  },

  blogPosts: {
    schema: {
      title: "String",
      slug: "String (unique)",
      excerpt: "String",
      content: "String",
      tags: "Array of Strings",
      author: "String",
      readTime: "Number",
      published: "Boolean",
      createdAt: "Date",
      updatedAt: "Date",
    },
    indexes: ["slug", "createdAt", "published", "tags"],
  },

  contacts: {
    schema: {
      name: "String",
      email: "String",
      subject: "String",
      message: "String",
      read: "Boolean",
      replied: "Boolean",
      createdAt: "Date",
    },
    indexes: ["createdAt", "read"],
  },
}

console.log("Database collections structure:")
console.log(JSON.stringify(collections, null, 2))

// MongoDB connection example
const mongoConnectionExample = `
const { MongoClient } = require('mongodb')

async function connectToDatabase() {
  const client = new MongoClient(process.env.MONGODB_URI)
  await client.connect()
  return client.db('portfolio')
}

// Usage example:
const db = await connectToDatabase()
const projects = await db.collection('projects').find({}).toArray()
`

console.log("MongoDB connection example:")
console.log(mongoConnectionExample)

// Mongoose models example
const mongooseModelsExample = `
const mongoose = require('mongoose')

// User Schema
const userSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  name: { type: String, required: true },
  role: { type: String, enum: ['admin', 'user'], default: 'user' }
}, { timestamps: true })

// Project Schema
const projectSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  technologies: [String],
  githubUrl: String,
  liveUrl: String,
  imageUrl: String,
  featured: { type: Boolean, default: false }
}, { timestamps: true })

// Blog Post Schema
const blogPostSchema = new mongoose.Schema({
  title: { type: String, required: true },
  slug: { type: String, required: true, unique: true },
  excerpt: { type: String, required: true },
  content: { type: String, required: true },
  tags: [String],
  author: { type: String, required: true },
  readTime: { type: Number, required: true },
  published: { type: Boolean, default: false }
}, { timestamps: true })

// Contact Schema
const contactSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  subject: { type: String, required: true },
  message: { type: String, required: true },
  read: { type: Boolean, default: false },
  replied: { type: Boolean, default: false }
}, { timestamps: true })

module.exports = {
  User: mongoose.model('User', userSchema),
  Project: mongoose.model('Project', projectSchema),
  BlogPost: mongoose.model('BlogPost', blogPostSchema),
  Contact: mongoose.model('Contact', contactSchema)
}
`

console.log("Mongoose models example:")
console.log(mongooseModelsExample)

console.log("Database setup completed!")
console.log("Note: This is a demo script. In production, you would:")
console.log("1. Set up actual MongoDB connection")
console.log("2. Create proper environment variables")
console.log("3. Implement proper error handling")
console.log("4. Add data validation and sanitization")
console.log("5. Set up proper indexes for performance")
