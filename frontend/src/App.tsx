import { useEffect, useState } from 'react'
import Header from './components/Header'
import SearchBar from './components/SearchBar'
import CategoryFilter from './components/CategoryFilter'
import ProductCard from './components/ProductCard'
import Footer from './components/Footer'
import Hero from './components/Hero'
import ProductDetail from './components/ProductDetail'
import Cart from './components/Cart'
import type { CartItem } from './components/Cart'
import BottomNav from './components/BottomNav'

// Tipo completo del producto que devuelve la API de Django
interface Product {
  id: number
  nombre: string
  precio: number
  imagen: string | null
  categoria: string
  descripcion: string
  imagenes_adicionales: string[]
  destacado: boolean
  whatsapp: string
}

function App() {
  const [products, setProducts] = useState<Product[]>([])
  const [search, setSearch] = useState('')
  const [category, setCategory] = useState('Todas')
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null)
  const [cart, setCart] = useState<CartItem[]>(() => {
    // Recuperar el carrito guardado en localStorage al cargar la página
    const saved = localStorage.getItem('jk_cart')
    return saved ? JSON.parse(saved) : []
  })
  const [cartOpen, setCartOpen] = useState(false)

  useEffect(() => {
    // import.meta.env lee las variables del archivo .env (Vite)
    fetch(`${import.meta.env.VITE_API_URL}/api/productos/`)
      .then((response) => response.json())
      .then((data) => {
        setProducts(data.productos)
      })
      .catch((error) => {
        console.error('Error cargando productos:', error)
      })
  }, [])

  // Guardar el carrito en localStorage cada vez que cambie
  useEffect(() => {
    localStorage.setItem('jk_cart', JSON.stringify(cart))
  }, [cart])

  const addToCart = (product: Product | null) => {
    if (!product) return
    setCart((prev) => {
      const existing = prev.find((item) => item.id === product.id)
      if (existing) {
        return prev.map((item) =>
          item.id === product.id ? { ...item, cantidad: item.cantidad + 1 } : item
        )
      }
      return [...prev, { id: product.id, nombre: product.nombre, precio: product.precio, imagen: product.imagen, cantidad: 1 }]
    })
  }

  const increase = (id: number) =>
    setCart((prev) => prev.map((item) => (item.id === id ? { ...item, cantidad: item.cantidad + 1 } : item)))

  const decrease = (id: number) =>
    setCart((prev) =>
      prev
        .map((item) => (item.id === id ? { ...item, cantidad: item.cantidad - 1 } : item))
        .filter((item) => item.cantidad > 0)
    )

  const remove = (id: number) => setCart((prev) => prev.filter((item) => item.id !== id))

  const clearCart = () => setCart([])

  const cartCount = cart.reduce((acc, item) => acc + item.cantidad, 0)

  // Categorías únicas extraídas de los productos reales
  const categories = ['Todas', ...Array.from(new Set(products.map((p) => p.categoria)))]

  // Filtrado por texto y categoría
  const filtered = products.filter((p) => {
    const matchesSearch = p.nombre.toLowerCase().includes(search.toLowerCase())
    const matchesCategory = category === 'Todas' || p.categoria === category
    return matchesSearch && matchesCategory
  })

  return (
    <div className="min-h-screen bg-navy">

      <Header />

      <main className="mx-auto max-w-7xl px-4 py-8 pb-24">

        <Hero />

        <section className="mt-8 mb-6">
          <SearchBar value={search} onChange={setSearch} />
        </section>

        <section className="mb-8">
          <CategoryFilter
            categories={categories}
            selected={category}
            onSelect={setCategory}
          />
        </section>

        <section>
          <h2 id="catalogo" className="mb-4 text-2xl font-bold text-snow">
            Productos
          </h2>

          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {filtered.map((product) => (
              <ProductCard
                key={product.id}
                name={product.nombre}
                price={product.precio}
                image={product.imagen}
                category={product.categoria}
                featured={product.destacado}
                whatsapp={product.whatsapp}
                onView={() => setSelectedProduct(product)}
                onAddToCart={() => addToCart(product)}
              />
            ))}
          </div>
        </section>

        <ProductDetail
          product={selectedProduct}
          onClose={() => setSelectedProduct(null)}
          onAddToCart={(product) => {
            addToCart(product as Product)
            setSelectedProduct(null)
          }}
        />

        {cartOpen && (
          <Cart
            items={cart}
            onIncrease={increase}
            onDecrease={decrease}
            onRemove={remove}
            onClear={clearCart}
            onClose={() => setCartOpen(false)}
          />
        )}

      </main>

      {/* Navegación inferior fija (móvil) */}
      <BottomNav cartCount={cartCount} onOpenCart={() => setCartOpen(true)} />

      {/* Botón flotante del carrito */}
      <button
        onClick={() => setCartOpen(true)}
        className="fixed bottom-20 right-4 z-40 rounded-full bg-electric px-5 py-3 font-semibold text-white shadow-lg transition hover:opacity-90 sm:hidden"
      >
        🛒 {cartCount}
      </button>

      <Footer />

    </div>
  )
}

export default App
