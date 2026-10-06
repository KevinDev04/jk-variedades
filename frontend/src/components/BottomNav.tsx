interface BottomNavProps {
  cartCount: number
  onOpenCart: () => void
}

function BottomNav({ cartCount, onOpenCart }: BottomNavProps) {
  return (
    <nav className="fixed bottom-0 left-0 right-0 z-30 border-t border-white/10 bg-navy-deep/95 backdrop-blur">
      <div className="mx-auto flex max-w-7xl items-center justify-around py-2">

        <a href="#" className="flex flex-col items-center text-xs text-cyan">
          🏠
          <span>Inicio</span>
        </a>

        <a href="#catalogo" className="flex flex-col items-center text-xs text-grayblue hover:text-snow">
          🗂️
          <span>Categorías</span>
        </a>

        <button
          onClick={onOpenCart}
          className="relative flex flex-col items-center text-xs text-grayblue hover:text-snow"
        >
          🛒
          <span>Carrito</span>
          {cartCount > 0 && (
            <span className="absolute -right-3 -top-1 rounded-full bg-electric px-1.5 text-[10px] font-bold text-white">
              {cartCount}
            </span>
          )}
        </button>

        <a href="#" className="flex flex-col items-center text-xs text-grayblue hover:text-snow">
          👤
          <span>Cuenta</span>
        </a>

      </div>
    </nav>
  )
}

export default BottomNav
