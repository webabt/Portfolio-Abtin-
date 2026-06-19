import { Card, CardContent } from "@/components/ui/card"
import { Code, Lightbulb, Users } from "lucide-react"
import { BridgeAnimation } from "./bridge-animation"

export function About() {
  return (
    <>
      <section id="about" className="py-20 bg-muted/50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl sm:text-4xl font-bold text-center mb-12">Über mich</h2>

            <div className="grid md:grid-cols-2 gap-12 items-center mb-16">
              <div>
                <p className="text-lg text-muted-foreground mb-6">
                  Mit über 5 Jahren Erfahrung in der Webentwicklung bringe ich Ideen zum Leben und schaffe digitale
                  Lösungen, die sowohl funktional als auch ästhetisch ansprechend sind.
                </p>
                <p className="text-lg text-muted-foreground mb-6">
                  Meine Expertise liegt in modernen Frontend-Technologien wie React, Next.js und TypeScript, sowie
                  Backend-Entwicklung mit Node.js und verschiedenen Datenbanken.
                </p>
                <p className="text-lg text-muted-foreground">
                  Ich liebe es, komplexe Probleme zu lösen und dabei stets die Benutzererfahrung im Fokus zu behalten.
                </p>
              </div>

              <div className="space-y-6">
                <Card>
                  <CardContent className="p-6">
                    <div className="flex items-center space-x-4">
                      <Code className="h-8 w-8 text-primary" />
                      <div>
                        <h3 className="font-semibold">Clean Code</h3>
                        <p className="text-sm text-muted-foreground">Wartbarer und effizienter Code</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="p-6">
                    <div className="flex items-center space-x-4">
                      <Lightbulb className="h-8 w-8 text-primary" />
                      <div>
                        <h3 className="font-semibold">Innovation</h3>
                        <p className="text-sm text-muted-foreground">Moderne Technologien und Ansätze</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="p-6">
                    <div className="flex items-center space-x-4">
                      <Users className="h-8 w-8 text-primary" />
                      <div>
                        <h3 className="font-semibold">Teamwork</h3>
                        <p className="text-sm text-muted-foreground">Kollaborative Zusammenarbeit</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </section>

      <BridgeAnimation />
    </>
  )
}
