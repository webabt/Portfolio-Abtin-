"use client"

import { useRef, useEffect } from "react"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import gsap from "gsap"

export function ParallaxImageSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const imageRef = useRef<HTMLDivElement>(null)
  const textRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger)

    let gsapContext: gsap.Context | null = null

    const rafId = requestAnimationFrame(() => {
      if (!sectionRef.current || !imageRef.current || !textRef.current) return

      gsapContext = gsap.context(() => {
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: sectionRef.current,
            scrub: true,
            start: "top bottom",
            end: "bottom top",
          },
        })

        // Background image moves slowly (subtle parallax)
        tl.fromTo(
          imageRef.current,
          { yPercent: -12 },
          { yPercent: 12, ease: "none" },
          0,
        )

        // Text moves faster than the background image
        tl.fromTo(
          textRef.current,
          { yPercent: 60 },
          { yPercent: -60, ease: "none" },
          0,
        )
      }, sectionRef)

      ScrollTrigger.refresh()
    })

    return () => {
      cancelAnimationFrame(rafId)
      gsapContext?.revert()
    }
  }, [])

  return (
    <section ref={sectionRef} className="relative h-screen w-full overflow-hidden">
      <div ref={imageRef} className="absolute inset-0 h-[124%] w-full -top-[12%]">
        <img
          src="/placeholder.svg?height=1200&width=1920"
          alt=""
          className="h-full w-full object-cover"
          aria-hidden="true"
        />
        <div className="absolute inset-0 bg-black/40" aria-hidden="true" />
      </div>

      <div className="relative z-10 flex h-full items-center justify-center px-6">
        <div ref={textRef} className="text-center">
          <h2 className="text-balance text-5xl font-bold text-white md:text-7xl">
            Crafting Experiences
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-pretty text-lg text-white/80 md:text-xl">
            Every detail considered, every interaction intentional.
          </p>
        </div>
      </div>
    </section>
  )
}
