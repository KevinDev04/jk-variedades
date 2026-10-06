function Hero() {
  return (
    <section className="rounded-2xl border border-white/10 bg-navy-deep px-6 py-10 text-center md:py-16">
      <p className="text-xs font-semibold uppercase tracking-widest text-cyan">
        JK Variedades
      </p>

      <h1 className="mt-3 text-3xl font-bold text-snow md:text-5xl">
        Todo lo que necesitas, en un solo lugar.
      </h1>

      <p className="mx-auto mt-3 max-w-xl text-grayblue">
        Descubre nuestro catálogo de productos con la mejor calidad y precio.
      </p>

      <a
        href="#catalogo"
        className="mt-6 inline-block rounded-full bg-electric px-8 py-3 font-semibold text-white transition hover:opacity-90"
      >
        Ver catálogo
      </a>
    </section>
  )
}

export default Hero
