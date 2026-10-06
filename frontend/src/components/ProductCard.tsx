interface ProductCardProps {
  name: string
  price: number
  image: string | null
  category: string
  featured: boolean
  whatsapp: string
  onView?: () => void
  onAddToCart?: () => void
}

function ProductCard({ name, price, image, category, featured, onView, onAddToCart }: ProductCardProps) {
  // En desarrollo la API devuelve rutas relativas (/media/...),
  // así que las completamos con la URL del backend
  const imageUrl = image
    ? image.startsWith('http')
      ? image
      : `${import.meta.env.VITE_API_URL}${image}`
    : null

  // Formato colombiano sin centavos: $53.000
  const formattedPrice = `$${Math.round(price).toLocaleString('es-CO')}`

  return (
    <article className="flex flex-col overflow-hidden rounded-2xl border border-white/10 bg-navy-deep shadow-lg transition hover:border-electric/40">

      <div className="relative aspect-square bg-black/20">
        {imageUrl ? (
          <img
            src={imageUrl}
            alt={name}
            className="h-full w-full object-contain p-2"
          />
        ) : (
          <div className="flex h-full items-center justify-center text-grayblue">
            Sin imagen
          </div>
        )}

        {featured && (
          <span className="absolute left-2 top-2 rounded-full bg-cyan px-2 py-1 text-xs font-bold text-navy-deep">
            ★ Destacado
          </span>
        )}
      </div>

      <div className="flex flex-1 flex-col p-4">
        <p className="text-xs uppercase tracking-wide text-grayblue">{category}</p>

        <h2 className="mt-1 font-semibold text-snow">
          {name}
        </h2>

        <p className="mt-2 text-xl font-bold text-cyan">
          {formattedPrice}
        </p>

        <div className="mt-4 flex gap-2">
          <button
            onClick={onView}
            className="flex-1 rounded-full border border-electric px-3 py-2 text-sm font-semibold text-electric transition hover:bg-electric/10"
          >
            Ver
          </button>
          <button
            onClick={onAddToCart}
            className="flex-1 rounded-full bg-electric px-3 py-2 text-sm font-semibold text-white transition hover:opacity-90"
          >
            + Carrito
          </button>
        </div>
      </div>

    </article>
  )
}

export default ProductCard
