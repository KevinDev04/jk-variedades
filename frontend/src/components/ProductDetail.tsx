import { useState } from 'react'

interface ProductDetailProps {
  product: {
    id: number
    nombre: string
    precio: number
    categoria: string
    descripcion: string
    imagen: string | null
    imagenes_adicionales: string[]
    whatsapp: string
  } | null
  onClose: () => void
  onAddToCart: (product: ProductDetailProps['product']) => void
}

function ProductDetail({ product, onClose, onAddToCart }: ProductDetailProps) {
  // Índice de la imagen actualmente mostrada en la galería
  const [selectedImage, setSelectedImage] = useState(0)

  // Si no hay producto seleccionado, no renderizar nada
  if (!product) return null

  // Completar URLs relativas con la URL del backend
  const resolveUrl = (url: string | null) =>
    url
      ? url.startsWith('http')
        ? url
        : `${import.meta.env.VITE_API_URL}${url}`
      : null

  const allImages = product.imagenes_adicionales.length > 0
    ? product.imagenes_adicionales.map(resolveUrl)
    : [resolveUrl(product.imagen)]

  const formattedPrice = `$${Math.round(product.precio).toLocaleString('es-CO')}`

  return (
    // Fondo oscuro semitransparente detrás del modal
    <div
      className="fixed inset-0 z-50 flex items-end justify-center bg-black/70 p-0 sm:items-center sm:p-4"
      onClick={onClose}
    >
      <div
        className="max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-t-3xl bg-navy-deep p-6 sm:rounded-3xl"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="mb-4 text-sm text-grayblue hover:text-snow"
        >
          ← Volver
        </button>

        {/* Imagen principal */}
        <div className="aspect-square w-full rounded-2xl bg-black/20">
          {allImages[selectedImage] && (
            <img
              src={allImages[selectedImage]!}
              alt={product.nombre}
              className="h-full w-full object-contain p-4"
            />
          )}
        </div>

        {/* Miniaturas */}
        {allImages.length > 1 && (
          <div className="mt-3 flex gap-2 overflow-x-auto">
            {allImages.map((url, index) => (
              <button
                key={index}
                onClick={() => setSelectedImage(index)}
                className={`h-16 w-16 shrink-0 overflow-hidden rounded-lg border ${
                  selectedImage === index ? 'border-electric' : 'border-white/10'
                }`}
              >
                <img src={url!} alt="" className="h-full w-full object-contain p-1" />
              </button>
            ))}
          </div>
        )}

        <p className="mt-4 text-xs uppercase tracking-wide text-grayblue">{product.categoria}</p>
        <h2 className="mt-1 text-2xl font-bold text-snow">{product.nombre}</h2>
        <p className="mt-2 text-2xl font-bold text-cyan">{formattedPrice}</p>
        <p className="mt-3 text-grayblue">{product.descripcion}</p>

        <div className="mt-6 flex flex-col gap-3">
          <button
            onClick={() => onAddToCart(product)}
            className="rounded-full bg-electric px-6 py-3 font-semibold text-white transition hover:opacity-90"
          >
            Agregar al carrito
          </button>

          <a
            href={product.whatsapp}
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-full border border-cyan px-6 py-3 text-center font-semibold text-cyan transition hover:bg-cyan/10"
          >
            Consultar por WhatsApp
          </a>
        </div>
      </div>
    </div>
  )
}

export default ProductDetail
