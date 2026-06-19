import { Hero } from "@/components/hero"
import { Footer } from "@/components/footer"
import { PageRevealFixed } from "@/components/page-reveal-fixed"

export default function Home() {
  return (
    <>
      <PageRevealFixed />
      <div className="min-h-screen" style={{ backgroundColor: "#F6FAFF", color: "#80C0FF" }}>
        <main>
          <Hero />
        </main>
        <Footer variant="home" />
      </div>
    </>
  )
}
