import { useEffect, useState } from 'react'
import Header from './components/Header'
import SearchBar from './components/SearchBar'
import CategoryFilter from './components/CategoryFilter'
import ProductCard from './components/ProductCard'

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

  // Categorías únicas extraídas de los productos reales
  const categories = ['Todas', ...Array.from(new Set(products.map((p) => p.categoria)))]

  // Filtrado por texto y categoría
  const filtered = products.filter((p) => {
    const matchesSearch = p.nombre.toLowerCase().includes(search.toLowerCase())
    const matchesCategory = category === 'Todas' || p.categoria === category
    return matchesSearch && matchesCategory
  })

  return (
    <div className="min-h-screen bg-gray-50">

      <Header />

      <main className="mx-auto max-w-7xl px-4 py-8">

        <section className="mb-8 text-center">
          <h1 className="text-3xl font-bold text-gray-900">
            Encuentra lo que necesitas
          </h1>

          <p className="mt-2 text-gray-600">
            Tu tienda de confianza • Encuentra de todo en un solo lugar
          </p>
        </section>

        <section className="mb-6">
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
          <h2 className="mb-4 text-2xl font-bold text-gray-900">
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
              />
            ))}
          </div>
        </section>

      </main>

    </div>
  )
}

export default App
