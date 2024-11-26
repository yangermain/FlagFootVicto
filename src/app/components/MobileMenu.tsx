'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'

export default function MobileMenu() {
  const [isOpen, setIsOpen] = useState(false);

  // Handle body scroll locking
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  return (
    <div className="relative">
      {/* Menu Button */}
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="inline-flex items-center justify-center p-2 rounded-md text-white hover:bg-primary-light transition-colors"
        aria-expanded={isOpen}
      >
        <span className="sr-only">Open menu</span>
        {isOpen ? (
          <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        ) : (
          <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        )}
      </button>

      {/* Backdrop */}
      <div
        className={`
          fixed inset-0 bg-black transition-opacity duration-300
          ${isOpen ? 'opacity-50 z-40' : 'opacity-0 pointer-events-none'}
        `}
        onClick={() => setIsOpen(false)}
      />

      {/* Menu Panel */}
      <div
        className={`
          fixed top-0 right-0 w-64 h-full bg-primary z-50
          transform transition-transform duration-300 ease-in-out
          ${isOpen ? 'translate-x-0' : 'translate-x-full'}
        `}
      >
        <div className="flex flex-col h-full pt-16">
          <nav className="flex-1 px-4 pb-4 overflow-y-auto">
            <ul className="space-y-1">
              {[
                { href: '/', label: 'Accueil' },
                { href: '/equipes', label: 'Équipes' },
                { href: '/calendrier', label: 'Calendrier' },
                { href: '/resultats', label: 'Résultats' },
                { href: '/classement', label: 'Classement' },
                { href: '/joueurs', label: 'Joueurs' },
                { href: '/galerie', label: 'Galerie' },
                { href: '/a-propos', label: 'À propos' }
              ].map(({ href, label }) => (
                <li key={href}>
                  <Link
                    href={href}
                    className="block py-2 px-4 text-white hover:bg-primary-light rounded-lg transition-colors"
                    onClick={() => setIsOpen(false)}
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </div>
    </div>
  );
}
