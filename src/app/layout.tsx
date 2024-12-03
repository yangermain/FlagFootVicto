import './globals.css'
import type { Metadata } from 'next'
import Navigation from './components/Navigation'
import ClientLayout from './components/ClientLayout'
import '../app/config/firebase'  // Initialize Firebase at app startup

export const metadata: Metadata = {
  title: 'FLAGFOOTVICTO',
  description: 'Ligue de Flag football 6 vs 6 de Victoriaville - Rejoignez FlagFootVicto chaque dimanche dans une ambiance récréative et compétitive!',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="fr">
      <body>
        <ClientLayout>
          <Navigation />
          <main>
            {children}
          </main>
          <footer className="bg-primary text-white mt-12">
            <div className="container py-8">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div>
                  <h3 className="text-xl font-montserrat font-bold mb-4">Ligue de Flag-Football 6 vs 6</h3>
                  <p className="text-gray-300">Rejoignez FlagFootVicto chaque dimanche dans une ambiance récréative et compétitive!</p>
                </div>
                <div>
                  <h3 className="text-xl font-montserrat font-bold mb-4">Liens Rapides</h3>
                  <ul className="space-y-2">
                    <li><a href="/equipes" className="text-gray-300 hover:text-white">Équipes</a></li>
                    <li><a href="/calendrier" className="text-gray-300 hover:text-white">Calendrier</a></li>
                    <li><a href="/resultats" className="text-gray-300 hover:text-white">Résultats</a></li>
                    <li><a href="/classement" className="text-gray-300 hover:text-white">Classement</a></li>
                  </ul>
                </div>
                <div>
                  <h3 className="text-xl font-montserrat font-bold mb-4">Responsable</h3>
                  <div className="text-gray-300 space-y-2">
                    <p className="font-semibold">Yannick Germain</p>
                    <p>
                      <a href="mailto:yan.germain@gmail.com" className="hover:text-white">
                        yan.germain@gmail.com
                      </a>
                    </p>
                    <p>
                      <a href="tel:5813084360" className="hover:text-white">
                        581 308-4360
                      </a>
                    </p>
                  </div>
                </div>
              </div>
              <div className="border-t border-gray-700 mt-8 pt-8 text-center">
                <p className="text-gray-300">&copy; {new Date().getFullYear()} FLAGFOOTVICTO. Tous droits réservés.</p>
              </div>
            </div>
          </footer>
        </ClientLayout>
      </body>
    </html>
  )
}
