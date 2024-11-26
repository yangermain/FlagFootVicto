'use client';
import { useState } from 'react';

interface Week {
  number: number;
  date: string;
  time: string;
  note?: string;
  activities?: string[];
  games?: Game[];
}

interface Game {
  id: number;
  homeTeam: string;
  awayTeam: string;
  time: string;
  field: string;
}

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

const weeks: Week[] = [
  { 
    number: 0, 
    date: '01-Dec-24', 
    time: '15h00 - 18h00',
    note: "Journée d'accueil et Jamboree",
    activities: [
      "15h00 - Accueil des joueurs & remise des chandails",
      "15h15 - Mots de bienvenue",
      "15h20 - Règlements & style de jeu",
      "15h25 - Opinion & Questions?",
      "15h30 - WarmUp & Drills",
      "16h00 à 18h00 - 12 minutes d'opposition contre chaque équipe"
    ]
  },
  { 
    number: 1, 
    date: '08-Dec-24', 
    time: '15h00 - 18h00',
    note: "Début de la saison",
    games: [
      { id: 1, homeTeam: 'Dirty Birds',   awayTeam: 'Eagles', time: '15h00', field: 'Terrain A' },
      { id: 2, homeTeam: 'Vikings',       awayTeam: 'PCP', time: '15h00', field: 'Terrain  B' },
      { id: 3, homeTeam: 'Les Filles de Caleb',  awayTeam: 'Les bons buveurs', time: '16h30', field: 'Terrain A' },
      { id: 4, homeTeam: 'Destroyers',    awayTeam: 'Eagles', time: '16h30', field: 'Terrain B' },
    ]
  },
  { 
    number: 2, 
    date: '15-Dec-24', 
    time: '15h00 - 18h00',
    games: [
      { id: 1, homeTeam: 'Eagles',        awayTeam: 'Vikings', time: '15h00', field: 'Terrain  A' },
      { id: 2, homeTeam: 'PCP',           awayTeam: 'Les Filles de Caleb', time: '15h00', field: 'Terrain  B' },
      { id: 3, homeTeam: 'Les bons buveurs',      awayTeam: 'Destroyers', time: '16h30', field: 'Terrain  A' },
      { id: 4, homeTeam: 'Vikings',       awayTeam: 'Dirty Birds', time: '16h30', field: 'Terrain  B' },
    ]
  },
  { 
    number: 3, 
    date: '12-Jan-25', 
    time: '15h00 - 18h00',
    games: [
      { id: 1, homeTeam: 'Destroyers',    awayTeam: 'PCP', time: '15h00', field: 'Terrain  A' },
      { id: 2, homeTeam: 'Les Filles de Caleb',  awayTeam: 'Eagles', time: '15h00', field: 'Terrain  B' },
      { id: 3, homeTeam: 'Dirty Birds',   awayTeam: 'Les bons buveurs', time: '16h30', field: 'Terrain  A' },
      { id: 4, homeTeam: 'PCP',           awayTeam: 'Vikings', time: '16h30', field: 'Terrain  B' },
    ]
  },
  { 
    number: 4, 
    date: '19-Jan-25', 
    time: '15h00 - 18h00',
    games: [
      { id: 1, homeTeam: 'Les bons buveurs',      awayTeam: 'Les Filles de Caleb', time: '15h00', field: 'Terrain  A' },
      { id: 2, homeTeam: 'Eagles',        awayTeam: 'Destroyers', time: '15h00', field: 'Terrain  B' },
      { id: 3, homeTeam: 'Vikings',       awayTeam: 'Les bons buveurs', time: '16h30', field: 'Terrain  A' },
      { id: 4, homeTeam: 'Dirty Birds',   awayTeam: 'PCP', time: '16h30', field: 'Terrain  B' },
    ]
  },
  { 
    number: 5, 
    date: '26-Jan-25', 
    time: '15h00 - 18h00',
    games: [
      { id: 1, homeTeam: 'PCP',           awayTeam: 'Eagles', time: '15h00', field: 'Terrain  A' },
      { id: 2, homeTeam: 'Destroyers',    awayTeam: 'Vikings', time: '15h00', field: 'Terrain  B' },
      { id: 3, homeTeam: 'Les Filles de Caleb',  awayTeam: 'Dirty Birds', time: '16h30', field: 'Terrain  A' },
      { id: 4, homeTeam: 'Destroyers',    awayTeam: 'Les bons buveurs', time: '16h30', field: 'Terrain  B' },
    ]
  },
  { 
    number: 6, 
    date: '02-Feb-25', 
    time: '15h00 - 18h00',
    games: [
      { id: 1, homeTeam: 'Dirty Birds',   awayTeam: 'Destroyers', time: '15h00', field: 'Terrain  A' },
      { id: 2, homeTeam: 'Eagles',        awayTeam: 'Les bons buveurs', time: '15h00', field: 'Terrain  B' },
      { id: 3, homeTeam: 'Vikings',       awayTeam: 'Les Filles de Caleb', time: '16h30', field: 'Terrain  A' },
      { id: 4, homeTeam: 'PCP',           awayTeam: 'Dirty Birds', time: '16h30', field: 'Terrain  B' },
    ]
  },
  { 
    number: 7, 
    date: '16-Feb-25', 
    time: '17h00 - 19h00',
    games: [
      { id: 1, homeTeam: 'Les Filles de Caleb',  awayTeam: 'PCP', time: '17h00', field: 'Terrain A' },
      { id: 2, homeTeam: 'Les bons buveurs',      awayTeam: 'Vikings', time: '17h00', field: 'Terrain  B' },
      { id: 3, homeTeam: 'Destroyers',    awayTeam: 'Eagles', time: '18h00', field: 'Terrain  A' },
      { id: 4, homeTeam: 'Les Filles de Caleb',  awayTeam: 'Dirty Birds', time: '18h00', field: 'Terrain  B' },
    ]
  },
  { 
    number: 8, 
    date: '23-Feb-25', 
    time: '16h00 - 19h00',
    games: [
      { id: 1, homeTeam: 'Eagles',        awayTeam: 'Dirty Birds', time: '16h00', field: 'Terrain  A' },
      { id: 2, homeTeam: 'PCP',           awayTeam: 'Les bons buveurs',      time: '16h00', field: 'Terrain  B' },
      { id: 3, homeTeam: 'Vikings',       awayTeam: 'Destroyers',  time: '17h30', field: 'Terrain  A' },
      { id: 4, homeTeam: 'Eagles',        awayTeam: 'Les Filles de Caleb',      time: '17h30', field: 'Terrain  B' },
    ]
  },
  { 
    number: 9, 
    date: '02-Mar-25', 
    time: '15h00 - 18h00', 
    note: "Playoffs",
    games: [
      { id: 1, homeTeam: '# 1', awayTeam: '# 4', time: '15h00', field: 'Terrain  A' },
      { id: 2, homeTeam: '# 2', awayTeam: '# 3', time: '15h00', field: 'Terrain  B' },
      { id: 3, homeTeam: 'Grande FINALE - Gagnant A vs Gagnant B', awayTeam: '', time: '16h30', field: 'Terrain  A' },
      { id: 4, homeTeam: 'Finale de consolation', awayTeam: '', time: '16h30', field: 'Terrain  B' },
    ]
  },
];

export default function Calendar() {
  const [expandedWeek, setExpandedWeek] = useState<number | null>(null);

  const toggleWeek = (weekNumber: number) => {
    if (expandedWeek === weekNumber) {
      setExpandedWeek(null);
    } else {
      setExpandedWeek(weekNumber);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-12">
        <h1 className="text-4xl font-bold text-gray-900 mb-8 text-center">Calendrier des matchs</h1>
        <div className="max-w-4xl mx-auto space-y-6">
          {weeks.map((week) => (
            <div key={week.number} className="bg-white rounded-xl shadow-md overflow-hidden transition-all duration-300 hover:shadow-lg">
              <button
                onClick={() => toggleWeek(week.number)}
                className="w-full px-6 py-4 flex flex-col sm:flex-row justify-between items-center gap-4 hover:bg-gray-50 transition-colors"
              >
                <div className="flex flex-col sm:flex-row items-center gap-4">
                  <span className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-[#1F2937] text-white font-bold">
                    {week.number}
                  </span>
                  <div className="text-center sm:text-left">
                    <div className="font-semibold text-gray-900">
                      Semaine {week.number} - {formatDate(week.date)}
                    </div>
                    <div className="text-sm text-gray-600">{week.time}</div>
                    {week.note && (
                      <div className="text-sm font-medium text-[#374151] mt-1">{week.note}</div>
                    )}
                  </div>
                </div>
                <svg
                  className={`w-6 h-6 transform transition-transform ${
                    expandedWeek === week.number ? 'rotate-180' : ''
                  }`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </button>
              {expandedWeek === week.number && (
                <div className="border-t border-gray-100">
                  <div className="p-6 space-y-6">
                    {week.activities ? (
                      <div>
                        <h3 className="text-lg font-semibold text-[#1F2937] mb-4 flex items-center">
                          <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                            <path d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z"/>
                          </svg>
                          Programme de la journée
                        </h3>
                        <div className="space-y-2">
                          {week.activities.map((activity, index) => (
                            <div
                              key={index}
                              className="p-3 bg-gray-100 rounded-lg text-gray-800"
                            >
                              {activity}
                            </div>
                          ))}
                        </div>
                      </div>
                    ) : week.games && (
                      <div>
                        <h3 className="text-lg font-semibold text-[#1F2937] mb-4 flex items-center">
                          <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                            <path d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"/>
                          </svg>
                          Matchs de la semaine
                        </h3>
                        <div className="grid gap-3">
                          {week.games.map((game) => (
                            <div
                              key={game.id}
                              className="flex flex-col p-4 bg-gray-100 rounded-lg"
                            >
                              <div className="text-sm font-medium text-[#1F2937] mb-2">
                                {game.field} - {game.time}
                              </div>
                              <div className="flex items-center justify-between gap-4">
                                <span className="font-medium">{game.homeTeam}</span>
                                {game.awayTeam && (
                                  <>
                                    <span className="px-3 py-1 rounded-full bg-gray-200 text-[#1F2937] text-sm font-medium">
                                      VS
                                    </span>
                                    <span className="font-medium">{game.awayTeam}</span>
                                  </>
                                )}
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
