import Link from "next/link"
import { Github, Linkedin, Mail } from "lucide-react"

interface FooterProps {
  variant?: "home" | "dark"
}

export function Footer({ variant }: FooterProps) {
  const isHome = variant === "home"
  const isDark = variant === "dark"

  const footerClass = isHome || isDark ? "bg-transparent py-12" : "bg-muted py-12"
  const textClass = isHome
    ? "text-[#80C0FF]"
    : isDark
      ? "text-[#F6FAFF]"
      : "text-muted-foreground"
  const linkClass = isHome
    ? "text-[#80C0FF] hover:opacity-70 transition-opacity"
    : isDark
      ? "text-[#F6FAFF] hover:opacity-70 transition-opacity"
      : "text-muted-foreground hover:text-primary transition-colors"

  return (
    <footer className={footerClass}>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-4 md:mb-0">
              <p className={textClass}>
                © 2024 Max Mustermann. Alle Rechte vorbehalten.
              </p>
            </div>

            <div className="flex space-x-6">
              <Link href="https://github.com" className={linkClass}>
                <Github className="h-5 w-5" />
                <span className="sr-only">GitHub</span>
              </Link>
              <Link href="https://linkedin.com" className={linkClass}>
                <Linkedin className="h-5 w-5" />
                <span className="sr-only">LinkedIn</span>
              </Link>
              <Link href="mailto:contact@example.com" className={linkClass}>
                <Mail className="h-5 w-5" />
                <span className="sr-only">E-Mail</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
