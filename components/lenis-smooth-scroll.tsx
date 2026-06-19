"use client"

import { useEffect, type ReactNode } from "react"
import Lenis from "@studio-freight/lenis"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

gsap.registerPlugin(ScrollTrigger)

export function LenisSmoothScroll() {
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 2,
      infinite: false,
    })

    lenis.on("scroll", ScrollTrigger.update)

    ScrollTrigger.scrollerProxy(document.documentElement, {
      scrollTop(value) {
        if (arguments.length) {
          lenis.scrollTo(value, { immediate: true })
        }
        return lenis.scroll
      },
      getBoundingClientRect() {
        return {
          top: 0,
          left: 0,
          width: window.innerWidth,
          height: window.innerHeight,
        }
      },
    })

    const tickerCallback = (time: number) => {
      lenis.raf(time * 1000)
    }

    gsap.ticker.add(tickerCallback)
    gsap.ticker.lagSmoothing(0)

    const handleRefresh = () => lenis.resize()
    ScrollTrigger.addEventListener("refresh", handleRefresh)
    ScrollTrigger.refresh()

    return () => {
      ScrollTrigger.removeEventListener("refresh", handleRefresh)
      gsap.ticker.remove(tickerCallback)
      lenis.destroy()
    }
  }, [])

  return null
}

export function LenisProvider({ children }: { children: ReactNode }) {
  return (
    <>
      <LenisSmoothScroll />
      {children}
    </>
  )
}
