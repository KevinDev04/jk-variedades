function Hero() {
  return (
    <section className="rounded-2xl border border-white/10 bg-navy-deep px-5 py-5 text-center md:py-6">
      <h1 className="text-xl font-bold text-snow md:text-3xl">
        Todo lo que necesitas, en un solo lugar.
      </h1>

      <p className="mt-1 text-sm text-grayblue">
        Tu tienda de confianza • Descubre nuestra variedad.
      </p>

      <a
        href="#catalogo"
        className="mt-3 inline-block rounded-full bg-electric px-6 py-2 text-sm font-semibold text-white transition hover:opacity-90"
      >
        Ver catálogo
      </a>
    </section>
  )
}

export default Hero
