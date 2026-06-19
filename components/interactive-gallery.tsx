"use client"

import type React from "react"
import { useRef, type CSSProperties } from "react"
import Image from "next/image"
import Link from "next/link"

// Types
interface Project {
  name: string
  client: string
  description: string
  src: string
  year: number
  projectUrl?: string // Optional URL für das Projekt
}

interface Props {
  projects: Project[]
  reversed?: boolean
}

// Sample data mit echten Projektbildern
export const projects: Project[] = [
  {
    name: "GENTLEMAN BARBERSHOP",
    client: "Barbershop",
    description: "Vollständige Hero-Sektion mit Navigation und Call-to-Action für einen modernen Gentleman Barbershop.",
    src: "/images/projekt1-1.png",
    year: 2024,
    projectUrl: "https://barbershop-website-17.vercel.app/", 
  },
  {
    name: "GENTLEMAN BARBERSHOP",
    client: "Barbershop",
    description: "Services-Sektion mit professionellen Bildern der verschiedenen Haarschnitt-Angebote.",
    src: "/images/projekt1-2.png",
    year: 2024,
    projectUrl: "https://barbershop-website-17.vercel.app/", // Platzhalter für späteren Link
  },
  {
    name: "PIZZA ZIO",
    client: "Restaurant",
    description: "Minimalistisches Logo-Design für eine authentische italienische Pizzeria.",
    src: "/images/projekt2-1.png",
    year: 2023,
    projectUrl: "https://pizzazio.vercel.app/", // Platzhalter für späteren Link
  },
  {
    name: "PIZZA ZIO",
    client: "Restaurant",
    description: "Emotionale Website-Sektion mit traditioneller Handwerkskunst und italienischem Flair.",
    src: "/images/projekt2-2.png",
    year: 2023,
    projectUrl: "https://pizzazio.vercel.app/", // Platzhalter für späteren Link
  },
]

// Main Component
const InteractiveGallery: React.FC<Props> = ({ projects, reversed = false }) => {
  const firstImage = useRef<HTMLDivElement>(null)
  const secondImage = useRef<HTMLDivElement>(null)
  let requestAnimationFrameId: number | null = null
  let xPercent = reversed ? 100 : 0
  let currentXPercent = reversed ? 100 : 0
  const speed = 0.15

  const styles = {
    galleryWrapper: {
      position: "relative",
    } as CSSProperties,

    double: {
      display: "flex",
      marginTop: "40vh",
      height: "45vw",
      minHeight: "400px",
      position: "relative",
    } as CSSProperties,

    imageContainer: {
      transition: "width 0.1s ease-out",
    } as CSSProperties,

    stretchyWrapper: {
      paddingBottom: "66%",
      position: "relative",
      overflow: "hidden",
    } as CSSProperties,

    image: {
      position: "absolute",
      top: 0,
      left: 0,
      width: "100%",
      height: "100%",
      objectFit: "cover" as const,
    } as CSSProperties,

    projectTitle: {
      position: "absolute",
      top: "-120px",
      left: "20px",
      fontSize: "1.8em",
      fontWeight: 500,
      color: "#F6FAFF",
      zIndex: 10,
    } as CSSProperties,

    projectYear: {
      position: "absolute",
      top: "-80px",
      left: "20px",
      fontSize: "1em",
      color: "rgba(246, 250, 255, 0.7)",
      zIndex: 10,
    } as CSSProperties,

    viewSiteContainer: {
      position: "absolute",
      top: "calc(100% + 110px)",
      right: "calc(-1 * (100vw - 100%) / 2)",
      display: "flex",
      alignItems: "center",
      gap: "15px",
      zIndex: 10,
    } as CSSProperties,

    viewSiteLink: {
      fontSize: "12px",
      color: "#F6FAFF",
      fontWeight: 400,
      textDecoration: "none",
      cursor: "pointer",
    } as CSSProperties,

    arrowContainer: {
      position: "relative",
      width: "250px",
      height: "20px",
    } as CSSProperties,

    horizontalLine: {
      position: "absolute",
      top: "50%",
      left: "0",
      width: "250px",
      height: "1px",
      backgroundColor: "#3A3F4A",
      transition: "opacity 0.3s ease-out",
    } as CSSProperties,

    topLine: {
      position: "absolute",
      top: "50%",
      left: "0",
      width: "18px",
      height: "1px",
      backgroundColor: "#3A3F4A",
      transition: "opacity 0.3s ease-out",
      transformOrigin: "left center",
      transform: "rotate(-40deg)",
    } as CSSProperties,

    bottomLine: {
      position: "absolute",
      top: "50%",
      left: "0",
      width: "18px",
      height: "1px",
      backgroundColor: "#3A3F4A",
      transition: "opacity 0.3s ease-out",
      transformOrigin: "left center",
      transform: "rotate(40deg)",
    } as CSSProperties,
  }

  const manageMouseMove = (e: React.MouseEvent) => {
    const { clientX } = e
    xPercent = (clientX / window.innerWidth) * 100

    if (!requestAnimationFrameId) {
      requestAnimationFrameId = window.requestAnimationFrame(animate)
    }
  }

  const animate = () => {
    // Add easing to the animation
    const xPercentDelta = xPercent - currentXPercent
    currentXPercent = currentXPercent + xPercentDelta * speed

    // Change width of images between 33.33% and 66.66% based on cursor
    const firstImagePercent = 66.66 - currentXPercent * 0.33
    const secondImagePercent = 33.33 + currentXPercent * 0.33

    if (firstImage.current) {
      firstImage.current.style.width = `${firstImagePercent}%`
    }
    if (secondImage.current) {
      secondImage.current.style.width = `${secondImagePercent}%`
    }

    if (Math.round(xPercent) === Math.round(currentXPercent)) {
      if (requestAnimationFrameId) {
        window.cancelAnimationFrame(requestAnimationFrameId)
      }
      requestAnimationFrameId = null
    } else {
      requestAnimationFrameId = window.requestAnimationFrame(animate)
    }
  }

  // Initial widths based on reversed prop
  const getInitialWidth = (isFirst: boolean): string => {
    if (reversed) {
      return isFirst ? "33.33%" : "66.66%"
    }
    return isFirst ? "66.66%" : "33.33%"
  }

  return (
    <div style={styles.galleryWrapper}>
      <div onMouseMove={manageMouseMove} style={styles.double}>
        {/* Projektname und Jahr über dem linken Bild */}
        <div style={styles.projectTitle}>{projects[0].name}</div>
        <div style={styles.projectYear}>{projects[0].year}</div>

        <div
          ref={firstImage}
          style={{
            ...styles.imageContainer,
            width: getInitialWidth(true),
          }}
        >
          <div style={styles.stretchyWrapper}>
            <Image src={projects[0].src || "/placeholder.svg"} alt="project image" fill style={styles.image} />
          </div>
        </div>

        <div
          ref={secondImage}
          style={{
            ...styles.imageContainer,
            width: getInitialWidth(false),
          }}
        >
          <div style={styles.stretchyWrapper}>
            <Image src={projects[1].src || "/placeholder.svg"} alt="project image" fill style={styles.image} />
          </div>
        </div>
      </div>

      {/* View Site Link - außerhalb der Galerie positioniert */}
      <div style={styles.viewSiteContainer}>
        <Link 
          href={projects[0].projectUrl || "#"} 
          target="_blank" 
          rel="noopener noreferrer"
          style={styles.viewSiteLink}
        >
          View Site
        </Link>
        <div style={styles.arrowContainer}>
          <div style={styles.horizontalLine}></div>
          <div style={styles.topLine}></div>
          <div style={styles.bottomLine}></div>
        </div>
      </div>
    </div>
  )
}

export default InteractiveGallery
