import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ExternalLink, Github } from "lucide-react"
import Link from "next/link"
import Image from "next/image"

export function Projects() {
  const projects = [
    {
      title: "E-Commerce Platform",
      description: "Eine vollständige E-Commerce-Lösung mit Produktkatalog, Warenkorb und Zahlungsintegration.",
      image: "/placeholder.svg?height=200&width=400",
      technologies: ["Next.js", "TypeScript", "Stripe", "PostgreSQL"],
      githubUrl: "https://github.com",
      liveUrl: "https://example.com",
    },
    {
      title: "Task Management App",
      description: "Eine kollaborative Aufgabenverwaltung mit Echtzeit-Updates und Team-Features.",
      image: "/placeholder.svg?height=200&width=400",
      technologies: ["React", "Node.js", "Socket.io", "MongoDB"],
      githubUrl: "https://github.com",
      liveUrl: "https://example.com",
    },
    {
      title: "Portfolio Website",
      description: "Eine responsive Portfolio-Website für einen Fotografen mit Galerie und Kontaktformular.",
      image: "/placeholder.svg?height=200&width=400",
      technologies: ["Next.js", "Tailwind CSS", "Framer Motion"],
      githubUrl: "https://github.com",
      liveUrl: "https://example.com",
    },
  ]

  return (
    <section id="projects" className="py-20 bg-muted/50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl sm:text-4xl font-bold text-center mb-12">Meine Projekte</h2>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map((project, index) => (
              <Card key={index} className="overflow-hidden">
                <div className="aspect-video relative">
                  <Image src={project.image || "/placeholder.svg"} alt={project.title} fill className="object-cover" />
                </div>
                <CardHeader>
                  <CardTitle>{project.title}</CardTitle>
                  <CardDescription>{project.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-2">
                    {project.technologies.map((tech, techIndex) => (
                      <Badge key={techIndex} variant="outline">
                        {tech}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
                <CardFooter className="flex gap-2">
                  <Button variant="outline" size="sm" asChild>
                    <Link href={project.githubUrl}>
                      <Github className="h-4 w-4 mr-2" />
                      Code
                    </Link>
                  </Button>
                  <Button size="sm" asChild>
                    <Link href={project.liveUrl}>
                      <ExternalLink className="h-4 w-4 mr-2" />
                      Live Demo
                    </Link>
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
