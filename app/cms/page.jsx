"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Plus, Edit, Trash2, Eye, BarChart3, FileText, MessageSquare } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useAuth } from "@/components/auth-provider"
import { useToast } from "@/hooks/use-toast"
import { Navbar } from "@/components/navbar"
import { ProjectForm } from "@/components/project-form"
import { BlogForm } from "@/components/blog-form"

export default function CMSPage() {
  const { user, isLoading } = useAuth()
  const router = useRouter()
  const { toast } = useToast()

  const [projects, setProjects] = useState([])
  const [blogPosts, setBlogPosts] = useState([])
  const [contacts, setContacts] = useState([])
  const [showProjectForm, setShowProjectForm] = useState(false)
  const [showBlogForm, setShowBlogForm] = useState(false)
  const [editingProject, setEditingProject] = useState(null)
  const [editingBlog, setEditingBlog] = useState(null)

  useEffect(() => {
    if (!isLoading && !user) {
      router.push("/login")
    }
  }, [user, isLoading, router])

  useEffect(() => {
    if (user) {
      fetchData()
    }
  }, [user])

  const fetchData = async () => {
    try {
      const [projectsRes, blogRes, contactsRes] = await Promise.all([
        fetch("/api/projects"),
        fetch("/api/blog"),
        fetch("/api/contact"),
      ])

      const [projectsData, blogData, contactsData] = await Promise.all([
        projectsRes.json(),
        blogRes.json(),
        contactsRes.json(),
      ])

      setProjects(projectsData)
      setBlogPosts(blogData)
      setContacts(contactsData)
    } catch (error) {
      console.error("Error fetching data:", error)
    }
  }

  const deleteProject = async (id) => {
    try {
      const response = await fetch(`/api/projects/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })

      if (response.ok) {
        setProjects(projects.filter((p) => p._id !== id))
        toast({
          title: "Project deleted",
          description: "The project has been successfully deleted.",
        })
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to delete project.",
        variant: "destructive",
      })
    }
  }

  const deleteBlogPost = async (id) => {
    try {
      const response = await fetch(`/api/blog/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })

      if (response.ok) {
        setBlogPosts(blogPosts.filter((p) => p._id !== id))
        toast({
          title: "Blog post deleted",
          description: "The blog post has been successfully deleted.",
        })
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to delete blog post.",
        variant: "destructive",
      })
    }
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-background to-secondary/20">
        <Navbar />
        <div className="pt-32 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <div className="animate-pulse">
              <div className="h-8 bg-muted rounded w-1/4 mb-8"></div>
              <div className="grid md:grid-cols-4 gap-6 mb-8">
                {[...Array(4)].map((_, i) => (
                  <div key={i} className="h-32 bg-muted rounded"></div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  if (!user) {
    return null
  }

  const stats = [
    {
      title: "Total Projects",
      value: projects.length,
      icon: BarChart3,
      color: "text-blue-600",
    },
    {
      title: "Blog Posts",
      value: blogPosts.length,
      icon: FileText,
      color: "text-green-600",
    },
    {
      title: "Messages",
      value: contacts.length,
      icon: MessageSquare,
      color: "text-purple-600",
    },
    {
      title: "Total Views",
      value: "12.5K",
      icon: Eye,
      color: "text-orange-600",
    },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-secondary/20">
      <Navbar />

      <div className="pt-32 pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="mb-8 animate-fade-in">
            <h1 className="text-3xl font-bold mb-2">
              Welcome back, <span className="gradient-text">{user.name}</span>
            </h1>
            <p className="text-muted-foreground">Manage your portfolio content from this dashboard</p>
          </div>

          {/* Stats Cards */}
          <div className="grid md:grid-cols-4 gap-6 mb-8">
            {stats.map((stat, index) => (
              <Card
                key={stat.title}
                className="glass-effect animate-slide-up"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">{stat.title}</p>
                      <p className="text-2xl font-bold">{stat.value}</p>
                    </div>
                    <stat.icon className={`h-8 w-8 ${stat.color}`} />
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Content Management */}
          <Tabs defaultValue="projects" className="space-y-6">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="projects">Projects</TabsTrigger>
              <TabsTrigger value="blog">Blog Posts</TabsTrigger>
              <TabsTrigger value="messages">Messages</TabsTrigger>
            </TabsList>

            <TabsContent value="projects" className="space-y-6">
              <div className="flex justify-between items-center">
                <h2 className="text-2xl font-bold">Projects</h2>
                <Button onClick={() => setShowProjectForm(true)}>
                  <Plus className="mr-2 h-4 w-4" />
                  Add Project
                </Button>
              </div>

              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {projects.map((project) => (
                  <Card key={project._id} className="glass-effect">
                    <CardHeader>
                      <CardTitle className="text-lg">{project.title}</CardTitle>
                      <CardDescription>{project.description}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="flex flex-wrap gap-2 mb-4">
                        {project.technologies.slice(0, 3).map((tech) => (
                          <Badge key={tech} variant="secondary" className="text-xs">
                            {tech}
                          </Badge>
                        ))}
                        {project.technologies.length > 3 && (
                          <Badge variant="secondary" className="text-xs">
                            +{project.technologies.length - 3}
                          </Badge>
                        )}
                      </div>
                      <div className="flex gap-2">
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => {
                            setEditingProject(project)
                            setShowProjectForm(true)
                          }}
                        >
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button size="sm" variant="outline" onClick={() => deleteProject(project._id)}>
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="blog" className="space-y-6">
              <div className="flex justify-between items-center">
                <h2 className="text-2xl font-bold">Blog Posts</h2>
                <Button onClick={() => setShowBlogForm(true)}>
                  <Plus className="mr-2 h-4 w-4" />
                  Add Post
                </Button>
              </div>

              <div className="space-y-4">
                {blogPosts.map((post) => (
                  <Card key={post._id} className="glass-effect">
                    <CardHeader>
                      <div className="flex justify-between items-start">
                        <div>
                          <CardTitle className="text-lg">{post.title}</CardTitle>
                          <CardDescription>{post.excerpt}</CardDescription>
                          <div className="flex gap-2 mt-2">
                            {post.tags.slice(0, 3).map((tag) => (
                              <Badge key={tag} variant="secondary" className="text-xs">
                                {tag}
                              </Badge>
                            ))}
                          </div>
                        </div>
                        <div className="flex gap-2">
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => {
                              setEditingBlog(post)
                              setShowBlogForm(true)
                            }}
                          >
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button size="sm" variant="outline" onClick={() => deleteBlogPost(post._id)}>
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </CardHeader>
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="messages" className="space-y-6">
              <h2 className="text-2xl font-bold">Contact Messages</h2>

              <div className="space-y-4">
                {contacts.map((contact) => (
                  <Card key={contact._id} className="glass-effect">
                    <CardHeader>
                      <div className="flex justify-between items-start">
                        <div>
                          <CardTitle className="text-lg">{contact.subject}</CardTitle>
                          <CardDescription>
                            From: {contact.name} ({contact.email})
                          </CardDescription>
                          <p className="text-sm text-muted-foreground mt-2">
                            {new Date(contact.createdAt).toLocaleDateString()}
                          </p>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm">{contact.message}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>

      {/* Forms */}
      {showProjectForm && (
        <ProjectForm
          project={editingProject}
          onClose={() => {
            setShowProjectForm(false)
            setEditingProject(null)
          }}
          onSave={() => {
            fetchData()
            setShowProjectForm(false)
            setEditingProject(null)
          }}
        />
      )}

      {showBlogForm && (
        <BlogForm
          post={editingBlog}
          onClose={() => {
            setShowBlogForm(false)
            setEditingBlog(null)
          }}
          onSave={() => {
            fetchData()
            setShowBlogForm(false)
            setEditingBlog(null)
          }}
        />
      )}
    </div>
  )
}
