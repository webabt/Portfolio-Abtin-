"use client"

import InteractiveGallery, { projects } from "./interactive-gallery"
import type { CSSProperties } from "react"

export function ProjectsPage() {
  const styles = {
    main: {
      marginTop: "5vh",
      paddingBottom: "20vh",
    } as CSSProperties,

    mainTitle: {
      padding: "20px",
      fontSize: "5vw",
      maxWidth: "80%",
      fontWeight: 400,
      color: "#F6FAFF",
      marginBottom: "2vh",
    } as CSSProperties,

    projectSpacer: {
      marginTop: "20vh",
    } as CSSProperties,

    projectDescription: {
      padding: "20px",
      marginTop: "3vh",
      maxWidth: "60%",
      fontSize: "1.1em",
      lineHeight: "1.6",
      color: "#F6FAFF",
    } as CSSProperties,

    bottomSpacer: {
      height: "30vh",
    } as CSSProperties,
  }

  return (
    <section className="min-h-screen flex flex-col">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div style={styles.main}>
          <h1 style={styles.mainTitle}>Projects</h1>

          <InteractiveGallery projects={[projects[0], projects[1]]} />

          <div style={styles.projectDescription}>
            Ein modernes und elegantes Webdesign für einen Gentleman Barbershop. Das Projekt umfasst eine vollständige
            Hero-Sektion mit intuitiver Navigation sowie eine ansprechende Services-Sektion, die die verschiedenen
            Haarschnitt-Angebote professionell präsentiert. Das Design vereint klassische Barbershop-Ästhetik mit
            zeitgemäßer Webentwicklung.
          </div>

          <div style={styles.projectSpacer}></div>

          <InteractiveGallery projects={[projects[2], projects[3]]} reversed />

          <div style={styles.projectDescription}>
            Eine authentische italienische Pizzeria-Website mit minimalistischem Logo-Design und emotionaler
            Bildsprache. Das Projekt betont die traditionelle Handwerkskunst und das italienische Flair durch warme
            Farben und ansprechende Typografie. Die Website vermittelt die Leidenschaft für authentische italienische
            Küche.
          </div>

          <div style={styles.bottomSpacer}></div>
        </div>
      </div>
    </section>
  )
}
