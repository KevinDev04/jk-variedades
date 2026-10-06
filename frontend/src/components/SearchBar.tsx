interface SearchBarProps {
  value: string
  onChange: (value: string) => void
}

function SearchBar({ value, onChange }: SearchBarProps) {
  return (
    <div className="w-full">
      <input
        type="text"
        placeholder="Buscar productos..."
        value={value}
        onChange={(event) => onChange(event.target.value)}
        className="w-full rounded-full border border-white/10 bg-navy-deep px-5 py-3 text-snow placeholder-grayblue outline-none focus:border-electric"
      />
    </div>
  )
}

export default SearchBar
