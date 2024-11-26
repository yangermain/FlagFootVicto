import MobileMenu from './MobileMenu'

export default function Navigation() {
  return (
    <header className="bg-primary text-white">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <h1 className="text-2xl font-montserrat font-bold">
            FLAGFOOTVICTO
          </h1>
          
          {/* Desktop Navigation */}
          <nav className="hidden md:block">
            <ul className="flex space-x-6">
              <li><a href="/" className="hover:text-gray-200">Accueil</a></li>
              <li><a href="/equipes" className="hover:text-gray-200">Équipes</a></li>
              <li><a href="/calendrier" className="hover:text-gray-200">Calendrier</a></li>
              <li><a href="/resultats" className="hover:text-gray-200">Résultats</a></li>
              <li><a href="/classement" className="hover:text-gray-200">Classement</a></li>
              <li><a href="/joueurs" className="hover:text-gray-200">Joueurs</a></li>
              <li><a href="/galerie" className="hover:text-gray-200">Galerie</a></li>
              <li><a href="/a-propos" className="hover:text-gray-200">À propos</a></li>
            </ul>
          </nav>

          {/* Mobile Menu */}
          <div className="block md:hidden">
            <MobileMenu />
          </div>
        </div>
      </div>
    </header>
  )
}
