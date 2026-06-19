import { Footer } from "@/components/footer"
import { WorkPageWrapper } from "@/components/work-page-wrapper"

export default function WorkPage() {
  return (
    <div style={{ backgroundColor: "#0E1012", color: "#F6FAFF", minHeight: "100vh" }}>
      <WorkPageWrapper />
      <Footer variant="dark" />
    </div>
  )
}
