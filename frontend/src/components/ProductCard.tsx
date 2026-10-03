interface ProductCardProps {
  name: string
  price: number
  image: string | null
  category: string
  featured: boolean
  whatsapp: string
}

function ProductCard({ name, price, image, category, featured, whatsapp }: ProductCardProps) {
  // En desarrollo la API devuelve rutas relativas (/media/...),
  // así que las completamos con la URL del backend
  const imageUrl = image
    ? image.startsWith('http')
      ? image
      : `${import.meta.env.VITE_API_URL}${image}`
    : null

  return (
    <article className="overflow-hidden rounded-xl border bg-white shadow-sm transition hover:shadow-md">

      <div className="relative aspect-square bg-gray-100">
        {imageUrl ? (
          <img
            src={imageUrl}
            alt={name}
            className="h-full w-full object-cover"
          />
        ) : (
          <div className="flex h-full items-center justify-center text-gray-400">
            Sin imagen
          </div>
        )}

        {featured && (
          <span className="absolute left-2 top-2 rounded-full bg-yellow-400 px-2 py-1 text-xs font-bold text-gray-900">
            ★ Destacado
          </span>
        )}
      </div>

      <div className="p-4">
        <p className="text-xs uppercase text-gray-400">{category}</p>

        <h2 className="font-semibold text-gray-900">
          {name}
        </h2>

        <p className="mt-2 text-lg font-bold text-blue-600">
          ${price.toLocaleString('es-CO')}
        </p>

        <a
          href={whatsapp}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-3 block rounded-lg bg-green-500 px-4 py-2 text-center text-sm font-semibold text-white hover:bg-green-600"
        >
          Comprar por WhatsApp
        </a>
      </div>

    </article>
  )
}

export default ProductCard
