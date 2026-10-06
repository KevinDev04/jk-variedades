import logo from '../assets/logo.png'

function Header() {
  return (
    <header className="border-b border-white/10 bg-navy">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3">

        <a href="/" className="flex items-center gap-2">
          <img src={logo} alt="JK Variedades" className="h-10 w-auto" />
        </a>

        <p className="text-xs text-grayblue">
          Tu tienda de confianza
        </p>

      </div>
    </header>
  )
}

export default Header
