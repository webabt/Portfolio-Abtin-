"use client"

import { ProjectsPage } from "@/components/projects-page"

export function WorkPageWrapper() {
  return (
    <div
      style={{
        backgroundColor: "#0E1012",
        color: "#F6FAFF",
        minHeight: "100vh",
        paddingTop: "5rem",
      }}
    >
      <ProjectsPage />
    </div>
  )
}
