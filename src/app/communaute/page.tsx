'use client';

import React, { useState } from 'react';
import PlayDrawer from '../components/PlayDrawer';

interface Slot {
  time: string;
  field: string;
  arbitreEnChef?: string;
  match?: string;
}

interface Week {
  number: number;
  date: string;
  time: string;
  note?: string;
  slots: Slot[];
}

const weeks: Week[] = [
  { 
    number: 1, 
    date: '08-Dec-24',
    time: '15h00 - 18h00',
    slots: [
      { time: '15h00', field: 'Terrain A', arbitreEnChef: 'Thomas Pichette' },
      { time: '15h00', field: 'Terrain B' },
      { time: '16h30', field: 'Terrain A', arbitreEnChef: 'Yannick Germain' },
      { time: '16h30', field: 'Terrain B' },
    ]
  },
  { 
    number: 2, 
    date: '15-Dec-24',
    time: '15h00 - 18h00',
    slots: [
      { time: '15h00', field: 'Terrain A' },
      { time: '15h00', field: 'Terrain B' },
      { time: '16h30', field: 'Terrain A' },
      { time: '16h30', field: 'Terrain B' },
    ]
  },
  { 
    number: 3, 
    date: '12-Jan-25',
    time: '15h00 - 18h00',
    slots: [
      { time: '15h00', field: 'Terrain A' },
      { time: '15h00', field: 'Terrain B' },
      { time: '16h30', field: 'Terrain A' },
      { time: '16h30', field: 'Terrain B' },
    ]
  },
  { 
    number: 4, 
    date: '19-Jan-25',
    time: '15h00 - 18h00',
    slots: [
      { time: '15h00', field: 'Terrain A' },
      { time: '15h00', field: 'Terrain B' },
      { time: '16h30', field: 'Terrain A' },
      { time: '16h30', field: 'Terrain B' },
    ]
  },
  { 
    number: 5, 
    date: '26-Jan-25',
    time: '15h00 - 18h00',
    slots: [
      { time: '15h00', field: 'Terrain A' },
      { time: '15h00', field: 'Terrain B' },
      { time: '16h30', field: 'Terrain A' },
      { time: '16h30', field: 'Terrain B' },
    ]
  },
  { 
    number: 6, 
    date: '02-Feb-25',
    time: '15h00 - 18h00',
    slots: [
      { time: '15h00', field: 'Terrain A' },
      { time: '15h00', field: 'Terrain B' },
      { time: '16h30', field: 'Terrain A' },
      { time: '16h30', field: 'Terrain B' },
    ]
  },
  { 
    number: 7, 
    date: '16-Feb-25',
    time: '16h00 - 19h00',
    slots: [
      { time: '16h00', field: 'Terrain A' },
      { time: '16h00', field: 'Terrain B' },
      { time: '17h30', field: 'Terrain A' },
      { time: '17h30', field: 'Terrain B' },
    ]
  },
  { 
    number: 8, 
    date: '23-Feb-25',
    time: '16h00 - 19h00',
    slots: [
      { time: '16h00', field: 'Terrain A' },
      { time: '16h00', field: 'Terrain B' },
      { time: '17h30', field: 'Terrain A' },
      { time: '17h30', field: 'Terrain B' },
    ]
  },
  { 
    number: 9, 
    date: '02-Mar-25',
    time: '15h00 - 18h00',
    note: 'Playoffs',
    slots: [
      { time: '15h00', field: 'Terrain A', match: 'Semi finale' },
      { time: '15h00', field: 'Terrain B', match: 'Semi Finale' },
      { time: '16h30', field: 'Terrain A', match: 'Finale' },
      { time: '16h30', field: 'Terrain B' }
    ]
  }
];

const formatDate = (dateStr: string) => {
  const months = {
    'Dec': 'décembre',
    'Jan': 'janvier',
    'Feb': 'février',
    'Mar': 'mars'
  };
  
  const [day, month, year] = dateStr.split('-');
  const monthName = months[month as keyof typeof months];
  return `${parseInt(day)} ${monthName} ${year}`;
};

export default function Communaute() {
  const [activeTab, setActiveTab] = useState('arbitres');

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-12">
        <h1 className="text-4xl font-bold text-gray-900 mb-8 text-center">Communauté</h1>

        {/* Navigation tabs */}
        <div className="flex flex-wrap justify-center gap-2 mb-8">
          <button
            onClick={() => setActiveTab('arbitres')}
            className={`px-4 py-2 rounded-lg ${
              activeTab === 'arbitres'
                ? 'bg-[#1F2937] text-white'
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
          >
            Calendrier des Arbitres
          </button>
          <button
            onClick={() => setActiveTab('reglements')}
            className={`px-4 py-2 rounded-lg ${
              activeTab === 'reglements'
                ? 'bg-[#1F2937] text-white'
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
          >
            Règlements
          </button>
          <button
            onClick={() => setActiveTab('systeme')}
            className={`px-4 py-2 rounded-lg ${
              activeTab === 'systeme'
                ? 'bg-[#1F2937] text-white'
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
          >
            Système de Jeu
          </button>
          <button
            onClick={() => setActiveTab('coaching')}
            className={`px-4 py-2 rounded-lg ${
              activeTab === 'coaching'
                ? 'bg-[#1F2937] text-white'
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
          >
            Coaching Tips
          </button>
          <button
            onClick={() => setActiveTab('plays')}
            className={`px-4 py-2 rounded-lg ${
              activeTab === 'plays'
                ? 'bg-[#1F2937] text-white'
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
          >
            Plays Exemples
          </button>
        </div>

        {/* Content sections */}
        <div className="max-w-7xl mx-auto">
          {activeTab === 'arbitres' && (
            <div className="bg-white rounded-xl shadow-md overflow-hidden">
              <div className="overflow-x-auto">
                <table className="min-w-full border-collapse">
                  <thead>
                    <tr>
                      <th className="px-4 py-2 text-left text-sm font-semibold text-gray-900 border border-gray-300">Semaine</th>
                      <th className="px-4 py-2 text-left text-sm font-semibold text-gray-900 border border-gray-300">Terrains</th>
                      <th className="px-4 py-2 text-left text-sm font-semibold text-white bg-[#f97316] border border-gray-300">Arbitre en Chef</th>
                      <th className="px-4 py-2 text-left text-sm font-semibold text-gray-900 border border-gray-300">Arbitre standard</th>
                      <th className="px-4 py-2 text-left text-sm font-semibold text-gray-900 bg-[#fbbf24] border border-gray-300">Statisticien(ne)s</th>
                      <th className="px-4 py-2 text-left text-sm font-semibold text-gray-900 bg-[#86efac] border border-gray-300">Photographe</th>
                      <th className="px-4 py-2 text-left text-sm font-semibold text-gray-900 border border-gray-300">Commentaires / Améliorations</th>
                    </tr>
                  </thead>
                  <tbody>
                    {weeks.map((week) => (
                      <React.Fragment key={week.number}>
                        {week.slots.map((slot, slotIndex) => (
                          <tr key={`${week.number}-${slotIndex}`} className={slotIndex % 2 === 0 ? 'bg-gray-50' : 'bg-white'}>
                            {slotIndex === 0 && (
                              <td rowSpan={4} className="px-4 py-2 align-top border border-gray-300">
                                <div className="font-medium">Semaine {week.number}</div>
                                <div className="text-sm text-gray-600">{formatDate(week.date)}</div>
                                <div className="text-sm text-gray-600">{week.time}</div>
                                {week.note && (
                                  <div className="text-sm font-medium text-gray-900 mt-1">{week.note}</div>
                                )}
                              </td>
                            )}
                            <td className="px-4 py-2 border border-gray-300">
                              <div className="text-sm">
                                {slot.field} {slot.time}
                                {slot.match && <div className="font-medium">{slot.match}</div>}
                              </div>
                            </td>
                            <td className="px-4 py-2 border border-gray-300 bg-orange-100">{slot.arbitreEnChef || ''}</td>
                            <td className="px-4 py-2 border border-gray-300"></td>
                            <td className="px-4 py-2 border border-gray-300 bg-yellow-100"></td>
                            <td className="px-4 py-2 border border-gray-300 bg-green-100"></td>
                            <td className="px-4 py-2 border border-gray-300"></td>
                          </tr>
                        ))}
                      </React.Fragment>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {activeTab === 'reglements' && (
            <div className="bg-white rounded-xl shadow-md p-6">
              <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Règlements Officiels - Ligue de Flag Football de Victoriaville</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Section 1: Structure des Matchs */}
                <div className="bg-white rounded-lg shadow p-6">
                  <h3 className="text-2xl font-bold mb-4 text-blue-600">1. Structure des Matchs</h3>
                  
                  <div className="mb-6">
                    <h4 className="text-xl font-semibold mb-3">1.1 Durée des Matchs</h4>
                    <ul className="space-y-2 text-gray-700">
                      <li>• Échauffement: 10 minutes avant le match</li>
                      <li>• Durée du match: Deux périodes de 35 minutes</li>
                      <li>• Mi-temps: 2 minutes</li>
                      <li>• Le temps est continu sauf lors des temps morts</li>
                      <li>• L'arbitre annonce la dernière minute de chaque demie</li>
                    </ul>
                  </div>

                  <div className="mb-6">
                    <h4 className="text-xl font-semibold mb-3">1.2 Points et Conversions</h4>
                    <ul className="space-y-2 text-gray-700">
                      <li>• Touché: 6 points</li>
                      <li>• Conversion de 1 point: tentative de la ligne des 5 verges</li>
                      <li>• Conversion de 2 points: tentative de la ligne des 10 verges</li>
                      <li>• Sécurité (safety): 2 points</li>
                      <li>• Points au classement: 2 points par demie gagnée + 2 points pour la victoire</li>
                    </ul>
                  </div>

                  <div>
                    <h4 className="text-xl font-semibold mb-3">1.3 Format de Jeu</h4>
                    <ul className="space-y-2 text-gray-700">
                      <li>• Début de la possession: Ligne de 5 verges de l'équipe en attaque</li>
                      <li>• Premier essai: Équipe doit franchir le milieu du terrain en 4 essais</li>
                      <li>• Une fois le milieu franchi: 4 nouveaux essais pour marquer</li>
                      <li>• Le quart-arrière peut courir sauf dans la "no-run zone"</li>
                      <li>• Tous les joueurs sont éligibles comme receveurs</li>
                      <li>• La formation offensive doit inclure au moins 3 joueurs sur la ligne</li>
                    </ul>
                  </div>
                </div>

                {/* Section 2: Composition des Équipes */}
                <div className="bg-white rounded-lg shadow p-6">
                  <h3 className="text-2xl font-bold mb-4 text-blue-600">2. Composition des Équipes</h3>
                  
                  <div className="mb-6">
                    <h4 className="text-xl font-semibold mb-3">2.1 Effectifs</h4>
                    <ul className="space-y-2 text-gray-700">
                      <li>• 6 joueurs sur le terrain</li>
                      <li>• Maximum de 12 joueurs par équipe</li>
                      <li>• Minimum de 8 joueurs inscrits par équipe</li>
                      <li>• Les substitutions sont permises entre les jeux</li>
                      <li>• Une équipe peut jouer avec un minimum de 5 joueurs</li>
                    </ul>
                  </div>

                  <div>
                    <h4 className="text-xl font-semibold mb-3">2.2 Gestion des Temps Morts</h4>
                    <ul className="space-y-2 text-gray-700">
                      <li>• 2 temps morts de 30 secondes par équipe par match</li>
                      <li>• Les temps morts non utilisés ne peuvent être reportés à la deuxième demie</li>
                    </ul>
                  </div>
                </div>

                {/* Section 3: Règles Spécifiques */}
                <div className="bg-white rounded-lg shadow p-6">
                  <h3 className="text-2xl font-bold mb-4 text-blue-600">3. Règles Spécifiques</h3>
                  
                  <div className="mb-6">
                    <h4 className="text-xl font-semibold mb-3">3.1 Règles Offensives</h4>
                    <ul className="space-y-2 text-gray-700">
                      <li>• Interdiction de plonger pour éviter d'être déflagué</li>
                      <li>• Protection du flag: interdiction de protéger ses flags</li>
                      <li>• Le centre doit faire une remise entre ses jambes</li>
                      <li>• Temps maximal de 25 secondes entre les jeux</li>
                    </ul>
                  </div>

                  <div className="mb-6">
                    <h4 className="text-xl font-semibold mb-3">3.2 Règles Défensives</h4>
                    <ul className="space-y-2 text-gray-700">
                      <li>• Contact minimal autorisé</li>
                      <li>• Interdiction de retenir le porteur du ballon</li>
                      <li>• Un seul joueur peut blitzer le quart-arrière</li>
                      <li>• Distance minimale de 7 verges pour le blitz</li>
                    </ul>
                  </div>

                  <div>
                    <h4 className="text-xl font-semibold mb-3">3.3 Pénalités</h4>
                    <ul className="space-y-2 text-gray-700">
                      <li>• 5 verges: Hors-jeu, procédure illégale, délai de jeu</li>
                      <li>• 10 verges: Obstruction, contact excessif, protection des flags</li>
                      <li>• 15 verges: Conduite antisportive, rudesse excessive</li>
                    </ul>
                  </div>
                </div>

                {/* Section 3.4: Sécurité et Contacts */}
                <div className="bg-white rounded-lg shadow p-6">
                  <h3 className="text-2xl font-bold mb-4 text-blue-600">3.4 Sécurité et Contacts</h3>
                  
                  <div className="mb-6">
                    <h4 className="text-xl font-semibold mb-3">Contacts et Responsabilités</h4>
                    <ul className="space-y-2 text-gray-700">
                      <li>• Tous les joueurs doivent demeurer en contrôle de leurs mouvements</li>
                      <li>• Les collisions évitables entraînent une pénalité</li>
                      <li>• L'objectif principal est le déflaguage propre et sécuritaire</li>
                      <li>• Les contacts accidentels mineurs sont tolérés mais doivent être minimisés</li>
                    </ul>
                  </div>

                  <div className="mb-6">
                    <h4 className="text-xl font-semibold mb-3">Passage en Force</h4>
                    <ul className="space-y-2 text-gray-700">
                      <li>• Un passage en force est sifflé lors d'une collision délibérée</li>
                      <li>• Position défensive contrôlée : défenseurs arrêtés, bras tendus</li>
                      <li>• Le porteur doit éviter le contact plutôt que forcer le passage</li>
                      <li>• Pénalité : 10 verges et perte d'essai</li>
                    </ul>
                  </div>

                  <div className="mb-6">
                    <h4 className="text-xl font-semibold mb-3">Protection du Rusher</h4>
                    <ul className="space-y-2 text-gray-700">
                      <li>• Couloir de course de 2 verges doit être laissé libre</li>
                      <li>• Interdiction d'obstruer délibérément la course du rusher</li>
                      <li>• Pénalité : 10 verges et reprise de l'essai</li>
                      <li>• Le rusher doit annoncer clairement son intention en levant la main</li>
                    </ul>
                  </div>

                  <div>
                    <h4 className="text-xl font-semibold mb-3">Collisions Multijoueurs</h4>
                    <ul className="space-y-2 text-gray-700">
                      <li>• Priorité donnée à la sécurité lors de convergences</li>
                      <li>• Les joueurs doivent ralentir et ajuster leur trajectoire</li>
                      <li>• Blocages et écrans sont interdits</li>
                      <li>• Collision dangereuse : 15 verges et possible expulsion</li>
                    </ul>
                  </div>
                </div>

                {/* Section 4: Séries Éliminatoires */}
                <div className="bg-white rounded-lg shadow p-6 md:col-span-2">
                  <h3 className="text-2xl font-bold mb-4 text-blue-600">4. Séries Éliminatoires</h3>
                  <ul className="space-y-2 text-gray-700">
                    <li>• Format des séries selon le nombre d'équipes</li>
                    <li>• Critères de bris d'égalité pour le classement</li>
                    <li>• Règles spécifiques aux matchs éliminatoires (temps supplémentaire)</li>
                  </ul>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'systeme' && (
            <div className="bg-white rounded-xl shadow-md p-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Système de Jeu</h2>
              <div className="prose max-w-none">
                <p className="text-gray-600">Contenu du système de jeu à venir...</p>
              </div>
            </div>
          )}

          {activeTab === 'coaching' && (
            <div className="bg-white rounded-xl shadow-md p-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Coaching Tips</h2>
              <div className="prose max-w-none">
                <p className="text-gray-600">Contenu des conseils de coaching à venir...</p>
              </div>
            </div>
          )}

          {activeTab === 'plays' && (
            <div className="bg-white rounded-xl shadow-md overflow-hidden">
              <div className="p-6">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">Plays Exemples</h2>
                <div className="space-y-6">
                  <div>
                    <h3 className="text-xl font-semibold mb-4">Dessinez vos jeux</h3>
                    <p className="text-gray-600 mb-4">
                      Utilisez le canvas ci-dessous pour dessiner et visualiser vos jeux. 
                      Vous pouvez ajuster la couleur et l'épaisseur du trait, et effacer le dessin si nécessaire.
                    </p>
                  </div>
                </div>
              </div>
              
              <div className="bg-gray-50 px-4 py-6">
                <PlayDrawer />
              </div>

              <div className="p-6 bg-white">
                <div className="mt-8">
                  <h3 className="text-xl font-semibold mb-4">Exemples de jeux de base</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <h4 className="font-medium mb-2">1. Quick Out</h4>
                      <p className="text-gray-600">Le receveur court 5 verges puis fait un virage rapide vers la ligne de côté.</p>
                    </div>
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <h4 className="font-medium mb-2">2. Slant</h4>
                      <p className="text-gray-600">Le receveur court en diagonale vers le centre du terrain après 2-3 verges.</p>
                    </div>
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <h4 className="font-medium mb-2">3. Go Route</h4>
                      <p className="text-gray-600">Le receveur court en ligne droite vers la zone des buts.</p>
                    </div>
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <h4 className="font-medium mb-2">4. Screen Pass</h4>
                      <p className="text-gray-600">Passe courte avec des bloqueurs devant le receveur.</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
