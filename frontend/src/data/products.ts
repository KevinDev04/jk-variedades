export interface Product {
  id: number
  name: string
  price: number
  image: string
  category: string
}

export const products: Product[] = [
  {
    id: 1,
    name: 'Organizador de gorras',
    price: 25000,
    image: 'https://placehold.co/600x600',
    category: 'Hogar',
  },
  {
    id: 2,
    name: 'Fuente de chocolate',
    price: 45000,
    image: 'https://placehold.co/600x600',
    category: 'Cocina',
  },
  {
    id: 3,
    name: 'Lonchera eléctrica',
    price: 65000,
    image: 'https://placehold.co/600x600',
    category: 'Hogar',
  },
  {
    id: 4,
    name: 'Balanza digital',
    price: 30000,
    image: 'https://placehold.co/600x600',
    category: 'Cocina',
  },
]