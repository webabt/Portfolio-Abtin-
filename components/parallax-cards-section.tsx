"use client"

import { useRef, useEffect } from "react"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import gsap from "gsap"

const items = [
  {
    title: "Design",
    text: "Thoughtful interfaces built around how people actually move through a product.",
    image: "/placeholder.svg?height=600&width=480",
    speed: -80,
  },
  {
    title: "Motion",
    text: "Animation that guides attention and gives every interaction a sense of place.",
    image: "/placeholder.svg?height=600&width=480",
    speed: 60,
  },
  {
    title: "Engineering",
    text: "Performant, accessible code that holds up long after launch.",
    image: "/placeholder.svg?height=600&width=480",
    speed: -50,
  },
  {
    title: "Strategy",
    text: "Clarity on what to build, why it matters, and how it should feel.",
    image: "/placeholder.svg?height=600&width=480",
    speed: 90,
  },
]

export function ParallaxCardsSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const figureRefs = useRef<(HTMLDivElement | null)[]>([])

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger)

    let gsapContext: gsap.Context | null = null

    const rafId = requestAnimationFrame(() => {
      if (!sectionRef.current) return

      gsapContext = gsap.context(() => {
        // The whole section scrolls faster than normal flow so it slides
        // up and over the previous (third) section.
        gsap.fromTo(
          sectionRef.current,
          { yPercent: 0 },
          {
            yPercent: -14,
            ease: "none",
            scrollTrigger: {
              trigger: sectionRef.current,
              scrub: true,
              start: "top bottom",
              end: "bottom top",
            },
          },
        )

        // Each image drifts at its own speed for a layered parallax feel.
        figureRefs.current.forEach((el, i) => {
          if (!el) return
          gsap.fromTo(
            el,
            { y: items[i].speed },
            {
              y: -items[i].speed,
              ease: "none",
              scrollTrigger: {
                trigger: el,
                scrub: true,
                start: "top bottom",
                end: "bottom top",
              },
            },
          )
        })
      }, sectionRef)

      ScrollTrigger.refresh()
    })

    return () => {
      cancelAnimationFrame(rafId)
      gsapContext?.revert()
    }
  }, [])

  return (
    <section
      ref={sectionRef}
      className="relative z-20 -mt-[14vh] bg-black px-6 py-32 md:py-48"
    >
      <div className="mx-auto max-w-5xl">
        <h2 className="mb-20 text-balance text-4xl font-bold text-white md:text-6xl">
          What I bring to the work
        </h2>

        <div className="flex flex-col gap-32 md:gap-48">
          {items.map((item, i) => (
            <div
              key={item.title}
              className={`flex flex-col items-center gap-10 md:gap-16 ${
                i % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
              }`}
            >
              <div
                ref={(el) => {
                  figureRefs.current[i] = el
                }}
                className="w-full max-w-xs shrink-0"
              >
                <img
                  src={item.image || "/placeholder.svg"}
                  alt=""
                  className="h-auto w-full object-cover"
                  aria-hidden="true"
                />
              </div>

              <div className="flex-1">
                <h3 className="mb-4 text-2xl font-bold text-white md:text-3xl">{item.title}</h3>
                <p className="text-pretty text-lg leading-relaxed text-white/70 md:text-xl">
                  {item.text}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
