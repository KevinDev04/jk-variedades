// Tipo de un producto dentro del carrito: el producto + su cantidad
export interface CartItem {
  id: number
  nombre: string
  precio: number
  imagen: string | null
  cantidad: number
}

interface CartProps {
  items: CartItem[]
  onIncrease: (id: number) => void
  onDecrease: (id: number) => void
  onRemove: (id: number) => void
  onClear: () => void
  onClose: () => void
}

function Cart({ items, onIncrease, onDecrease, onRemove, onClear, onClose }: CartProps) {
  // Subtotal: suma de precio * cantidad de cada producto
  const subtotal = items.reduce((acc, item) => acc + item.precio * item.cantidad, 0)
  const formattedTotal = `$${Math.round(subtotal).toLocaleString('es-CO')}`

  // Mensaje de WhatsApp: lista de productos + total
  const buildWhatsappMessage = () => {
    const lines = items.map(
      (item) =>
        `• ${item.nombre} x${item.cantidad} — $${Math.round(item.precio * item.cantidad).toLocaleString('es-CO')}`
    )
    const message = `Hola, JK Variedades 👋\n\nEstoy interesado/a en los siguientes productos:\n\n${lines.join('\n')}\n\nTotal aproximado: ${formattedTotal}\n\nQuisiera verificar disponibilidad y recibir información sobre la compra.\n\nGracias.`
    return `https://wa.me/573042739402?text=${encodeURIComponent(message)}`
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-end justify-center bg-black/70 sm:items-center"
      onClick={onClose}
    >
      <div
        className="max-h-[85vh] w-full max-w-lg overflow-y-auto rounded-t-3xl bg-navy-deep p-6 sm:rounded-3xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-bold text-snow">Tu carrito</h2>
          <button onClick={onClose} className="text-sm text-grayblue hover:text-snow">
            Cerrar
          </button>
        </div>

        {items.length === 0 ? (
          <p className="mt-6 text-center text-grayblue">Tu carrito está vacío.</p>
        ) : (
          <>
            <ul className="mt-4 divide-y divide-white/10">
              {items.map((item) => (
                <li key={item.id} className="flex items-center gap-3 py-3">
                  <div className="h-14 w-14 shrink-0 rounded-lg bg-black/20">
                    {item.imagen && (
                      <img
                        src={item.imagen.startsWith('http') ? item.imagen : `${import.meta.env.VITE_API_URL}${item.imagen}`}
                        alt={item.nombre}
                        className="h-full w-full object-contain p-1"
                      />
                    )}
                  </div>

                  <div className="flex-1">
                    <p className="text-sm font-semibold text-snow">{item.nombre}</p>
                    <p className="text-sm text-cyan">
                      ${Math.round(item.precio * item.cantidad).toLocaleString('es-CO')}
                    </p>
                  </div>

                  <div className="flex items-center gap-2">
                    <button onClick={() => onDecrease(item.id)} className="rounded-full border border-white/10 px-2 text-snow">−</button>
                    <span className="text-snow">{item.cantidad}</span>
                    <button onClick={() => onIncrease(item.id)} className="rounded-full border border-white/10 px-2 text-snow">+</button>
                    <button onClick={() => onRemove(item.id)} className="ml-1 text-xs text-grayblue hover:text-red-400">Quitar</button>
                  </div>
                </li>
              ))}
            </ul>

            <div className="mt-4 flex items-center justify-between border-t border-white/10 pt-4">
              <p className="text-grayblue">Total</p>
              <p className="text-2xl font-bold text-cyan">{formattedTotal}</p>
            </div>

            <a
              href={buildWhatsappMessage()}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-4 block rounded-full bg-electric px-6 py-3 text-center font-semibold text-white transition hover:opacity-90"
            >
              Continuar por WhatsApp
            </a>

            <button
              onClick={onClear}
              className="mt-2 w-full rounded-full border border-white/10 px-6 py-2 text-sm text-grayblue transition hover:text-snow"
            >
              Vaciar carrito
            </button>
          </>
        )}
      </div>
    </div>
  )
}

export default Cart
