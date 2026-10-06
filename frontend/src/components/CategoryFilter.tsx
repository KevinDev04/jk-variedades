interface CategoryFilterProps {
  categories: string[]
  selected: string
  onSelect: (category: string) => void
}

function CategoryFilter({ categories, selected, onSelect }: CategoryFilterProps) {
  return (
    <div className="flex gap-2 overflow-x-auto py-2">
      {categories.map((category) => (
        <button
          key={category}
          onClick={() => onSelect(category)}
          className={`whitespace-nowrap rounded-full border px-4 py-2 text-sm transition ${
            selected === category
              ? 'border-electric bg-electric text-white'
              : 'border-white/10 bg-navy-deep text-grayblue hover:border-cyan'
          }`}
        >
          {category}
        </button>
      ))}
    </div>
  )
}

export default CategoryFilter
