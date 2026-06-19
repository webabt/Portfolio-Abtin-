"use client"

import { useRef, useEffect, useState } from "react"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import gsap from "gsap"

interface ScrollytellingItem {
  title: string
  description: string
  image: string
}

const scrollytellingData: ScrollytellingItem[] = [
  {
    title: "Meine Reise",
    description: "Entdecke meine Geschichte und wie ich zur Webentwicklung kam.",
    image: "/placeholder.jpg",
  },
  {
    title: "Leidenschaft für Code",
    description: "Programmieren ist mehr als nur Arbeit – es ist meine Leidenschaft.",
    image: "/placeholder-user.jpg",
  },
  {
    title: "Kontinuierliches Lernen",
    description: "In der sich ständig weiterentwickelnden Tech-Welt bleibt man nie stehen.",
    image: "/placeholder-logo.png",
  },
  {
    title: "Gemeinschaft & Zusammenarbeit",
    description: "Die besten Projekte entstehen durch Zusammenarbeit und Wissensteilung.",
    image: "/placeholder.jpg",
  },
  {
    title: "Design trifft Funktion",
    description: "Ästhetik und Benutzerfreundlichkeit gehen für mich Hand in Hand.",
    image: "/placeholder-user.jpg",
  },
  {
    title: "Performance im Fokus",
    description: "Schnelle, zugängliche und robuste Websites sind mein Anspruch.",
    image: "/placeholder-logo.png",
  },
  {
    title: "Blick nach vorn",
    description: "Ich freue mich auf neue Herausforderungen und spannende Projekte.",
    image: "/placeholder.jpg",
  },
]

export function ScrollytellingSection() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const trackRef = useRef<HTMLDivElement>(null)
  const [activeIndex, setActiveIndex] = useState(0)

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger)

    const section = sectionRef.current
    const track = trackRef.current
    if (!section || !track) return

    const total = scrollytellingData.length

    const ctx = gsap.context(() => {
      // Vertical film reel: the track slides up continuously as you scroll,
      // pushing the next image from the bottom into view.
      gsap.to(track, {
        y: () => -(total - 1) * window.innerHeight,
        ease: "none",
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: "bottom bottom",
          scrub: true,
          invalidateOnRefresh: true,
          onUpdate: (self) => {
            const idx = Math.min(total - 1, Math.round(self.progress * (total - 1)))
            setActiveIndex(idx)
          },
        },
      })
    }, section)

    ScrollTrigger.refresh()

    return () => {
      ctx.revert()
    }
  }, [])

  return (
    <div
      ref={sectionRef}
      className="relative bg-black"
      style={{ height: `${scrollytellingData.length * 100}vh` }}
    >
      <div className="sticky top-0 h-screen overflow-hidden">
        {/* Left: info block on the left half */}
        <div className="absolute left-0 top-0 z-10 flex h-full w-full items-center px-6 md:w-1/2 lg:px-16">
          <div className="bg-black/80 backdrop-blur-sm p-8 border border-gray-800">
            <h2 className="text-4xl font-bold text-white mb-6 text-balance">
              {scrollytellingData[activeIndex].title}
            </h2>
            <p className="text-xl text-gray-300 leading-relaxed text-pretty">
              {scrollytellingData[activeIndex].description}
            </p>
          </div>
        </div>

        {/* Right: film reel occupying exactly the right half of the viewport */}
        <div className="absolute right-0 top-0 h-full w-1/2 overflow-hidden">
          <div ref={trackRef} className="will-change-transform">
            {scrollytellingData.map((item, index) => (
              <div key={index} className="h-screen w-full overflow-hidden">
                <img
                  src={item.image || "/placeholder.svg"}
                  alt={item.title}
                  className="h-full w-full object-cover"
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
