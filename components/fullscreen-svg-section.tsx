export function FullscreenSvgSection() {
  return (
    <section className="relative z-20 h-screen w-full bg-black">
      <img
        src="/placeholder.svg?height=1080&width=1920"
        alt=""
        className="h-full w-full object-cover"
        aria-hidden="true"
      />
    </section>
  )
}
