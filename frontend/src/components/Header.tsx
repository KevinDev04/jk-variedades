import logo from '../assets/logo.png'

function Header() {
  return (
    <header className="border-b border-white/10 bg-navy">
      <div className="mx-auto flex max-w-7xl items-center justify-center px-4 py-3">

        <a href="/">
          <img src={logo} alt="JK Variedades" className="h-16 w-auto md:h-20" />
        </a>

      </div>
    </header>
  )
}

export default Header
