import Link from 'next/link'
import MobileMenu from './MobileMenu'
import { navigationItems } from './navigationData'

export default function Navigation() {
  return (
    <header className="bg-primary text-white">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/">
            <h1 className="text-2xl font-montserrat font-bold hover:text-gray-200 transition-colors cursor-pointer">
              FLAGFOOTVICTO
            </h1>
          </Link>
          
          {/* Desktop Navigation */}
          <nav className="hidden md:block">
            <ul className="flex space-x-6">
              {navigationItems.map(({ href, label }) => (
                <li key={href}>
                  <Link 
                    href={href} 
                    className="hover:text-gray-200 transition-colors"
                  >
                    {label}
                  </Link>
                </li>
              ))}
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
