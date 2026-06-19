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
    image: "/placeholder.jpg"
  },
  {
    title: "Leidenschaft für Code",
    description: "Programmieren ist mehr als nur Arbeit – es ist meine Leidenschaft.",
    image: "/placeholder-user.jpg"
  },
  {
    title: "Kontinuierliches Lernen",
    description: "In der sich ständig weiterentwickelnden Tech-Welt bleibt man nie stehen.",
    image: "/placeholder-logo.png"
  },
  {
    title: "Gemeinschaft & Zusammenarbeit",
    description: "Die besten Projekte entstehen durch Zusammenarbeit und Wissensteilung.",
    image: "/placeholder.jpg"
  }
]

export function ScrollytellingSection() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const leftContentRef = useRef<HTMLDivElement>(null)
  const rightContentRef = useRef<HTMLDivElement>(null)
  const [activeIndex, setActiveIndex] = useState(0)

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger)

    const section = sectionRef.current
    if (!section) return

    // Create scroll triggers for each item
    const triggers: ScrollTrigger[] = []

    scrollytellingData.forEach((_, index) => {
      const trigger = ScrollTrigger.create({
        trigger: section,
        start: `${index * 25}% top`,
        end: `${(index + 1) * 25}% top`,
        onEnter: () => setActiveIndex(index),
        onEnterBack: () => setActiveIndex(index),
        scrub: true
      })
      triggers.push(trigger)
    })

    return () => {
      triggers.forEach(trigger => trigger.kill())
    }
  }, [])

  return (
    <div 
      ref={sectionRef}
      className="relative min-h-[400vh] bg-black"
    >
      {/* Fixed background container */}
      <div className="sticky top-0 h-screen overflow-hidden">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 h-full">
          <div className="grid md:grid-cols-2 gap-12 h-full items-center">
            {/* Left: Fixed info block */}
            <div 
              ref={leftContentRef}
              className="relative z-10"
            >
              <div className="bg-black/80 backdrop-blur-sm p-8 rounded-lg border border-gray-800">
                <h2 className="text-4xl font-bold text-white mb-6">
                  {scrollytellingData[activeIndex].title}
                </h2>
                <p className="text-xl text-gray-300 leading-relaxed">
                  {scrollytellingData[activeIndex].description}
                </p>
              </div>
            </div>

            {/* Right: Fixed image block */}
            <div 
              ref={rightContentRef}
              className="relative z-10"
            >
              <div className="relative h-[500px] rounded-lg overflow-hidden border border-gray-800">
                <img
                  src={scrollytellingData[activeIndex].image}
                  alt={scrollytellingData[activeIndex].title}
                  className="absolute inset-0 w-full h-full object-cover transition-opacity duration-500"
                  key={activeIndex}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll progress indicator */}
      <div className="fixed bottom-8 left-1/2 transform -translate-x-1/2 z-20 flex gap-2">
        {scrollytellingData.map((_, index) => (
          <div
            key={index}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${
              index === activeIndex ? "bg-white scale-125" : "bg-gray-600"
            }`}
          />
        ))}
      </div>
    </div>
  )
}
