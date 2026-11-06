import logo from '../assets/logo.png'

function Header() {
  return (
    <header className="border-b border-white/10 bg-navy">
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-center px-4 py-4">

        <a href="/">
          <img src={logo} alt="JK Variedades" className="h-20 w-auto md:h-24" />
        </a>

        <p className="mt-1 text-center text-xs tracking-wide text-grayblue">
          Todo lo que necesitas, en un solo lugar.
        </p>

      </div>
    </header>
  )
}

export default Header
