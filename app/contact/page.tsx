import { Contact } from "@/components/contact"
import { BridgeAnimation } from "@/components/bridge-animation"

export default function ContactPage() {
  return (
    <div className="bg-black">
      <main>
        {/* Abschnitt 1: Kontaktbereich */}
        <Contact />
        {/* Abschnitt 2: Bild-Animation */}
        <BridgeAnimation />
      </main>
    </div>
  )
}
