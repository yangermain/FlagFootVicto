'use client';

import { useState } from 'react';
import { gameResults } from '../data/results';
import { teams } from '../data/teams';
import { format, parseISO } from 'date-fns';
import { fr } from 'date-fns/locale';

export default function ResultatsPage() {
  const [expandedWeek, setExpandedWeek] = useState<number | null>(null);

  const getTeamName = (teamId: string) => {
    const team = teams.find(t => t.id === teamId);
    return team?.name || teamId;
  };

  const formatDate = (dateStr: string) => {
    // Use parseISO to properly parse the ISO date string
    const date = parseISO(dateStr);
    return format(date, 'd MMMM yyyy', { locale: fr });
  };

  const calculatePoints = (game: typeof gameResults[0], isHome: boolean) => {
    const score = isHome ? game.homeScore : game.awayScore;
    const opponentScore = isHome ? game.awayScore : game.homeScore;
    
    // 2 points for participating
    let points = 2;
    
    // 2 additional points for winning
    if (score > opponentScore) {
      points += 2;
    }
    
    return points;
  };

  // Group games by week
  const gamesByWeek = gameResults.reduce((acc, game) => {
    if (!acc[game.week]) {
      acc[game.week] = [];
    }
    acc[game.week].push(game);
    return acc;
  }, {} as Record<number, typeof gameResults>);

  const toggleWeek = (weekNumber: number) => {
    if (expandedWeek === weekNumber) {
      setExpandedWeek(null);
    } else {
      setExpandedWeek(weekNumber);
    }
  };

  return (
    <main className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Résultats</h1>
      
      <div className="max-w-4xl mx-auto space-y-6">
        {Object.entries(gamesByWeek).map(([week, games]) => {
          const weekNum = parseInt(week);
          const firstGame = games[0];
          
          return (
            <div key={week} className="bg-white rounded-xl shadow-md overflow-hidden transition-all duration-300 hover:shadow-lg">
              <button
                onClick={() => toggleWeek(weekNum)}
                className="w-full px-6 py-4 flex flex-col sm:flex-row justify-between items-center gap-4 hover:bg-gray-50 transition-colors"
              >
                <div className="flex flex-col sm:flex-row items-center gap-4">
                  <span className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-[#1F2937] text-white font-bold">
                    {weekNum}
                  </span>
                  <div className="text-center sm:text-left">
                    <div className="font-semibold text-gray-900">
                      Semaine {weekNum} - {formatDate(firstGame.date)}
                    </div>
                    {weekNum === 0 && (
                      <div className="text-sm text-[#374151]">Journée d'accueil et Jamboree</div>
                    )}
                  </div>
                </div>
                {weekNum !== 0 && (
                  <svg
                    className={`w-6 h-6 transform transition-transform ${
                      expandedWeek === weekNum ? 'rotate-180' : ''
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
                )}
              </button>

              {expandedWeek === weekNum && !firstGame.isJamboree && (
                <div className="border-t border-gray-100">
                  <div className="p-6 grid gap-6">
                    {games.map((game) => {
                      const homePoints = calculatePoints(game, true);
                      const awayPoints = calculatePoints(game, false);
                      
                      return (
                        <div key={game.id} className="bg-gray-50 rounded-lg p-4">
                          <div className="bg-[#1F2937] text-white p-2.5 rounded-t-lg">
                            <h2 className="text-lg font-bold">
                              {formatDate(game.date)} - {game.time} - {game.location}
                            </h2>
                          </div>
                          
                          <div className="p-4">
                            <table className="w-full border-collapse text-sm">
                              <thead>
                                <tr>
                                  <th className="p-2 text-left"></th>
                                  <th className="p-2 text-center">{getTeamName(game.homeTeamId)}</th>
                                  <th className="p-2 text-center">{getTeamName(game.awayTeamId)}</th>
                                </tr>
                              </thead>
                              <tbody>
                                <tr>
                                  <td className="p-2">1ière demie</td>
                                  <td className="p-2 text-center">{game.homeFirstHalf}</td>
                                  <td className="p-2 text-center">{game.awayFirstHalf}</td>
                                </tr>
                                <tr>
                                  <td className="p-2">2e demie</td>
                                  <td className="p-2 text-center">{game.homeSecondHalf}</td>
                                  <td className="p-2 text-center">{game.awaySecondHalf}</td>
                                </tr>
                                <tr>
                                  <td className="p-2"></td>
                                  <td className="p-2 text-center" colSpan={2}>
                                    <div className="flex justify-center items-center gap-8 py-2">
                                      <div className="text-4xl font-bold">{game.homeScore}</div>
                                      <div className="text-xl">-</div>
                                      <div className="text-4xl font-bold">{game.awayScore}</div>
                                    </div>
                                  </td>
                                </tr>
                                <tr>
                                  <td className="p-2 border-t">Total pts match</td>
                                  <td className="p-2 border-t text-center">2</td>
                                  <td className="p-2 border-t text-center">2</td>
                                </tr>
                                <tr>
                                  <td className="p-2">Pts victoire</td>
                                  <td className="p-2 text-center">{homePoints > 2 ? 2 : 0}</td>
                                  <td className="p-2 text-center">{awayPoints > 2 ? 2 : 0}</td>
                                </tr>
                                <tr className="border-t">
                                  <td className="p-2 font-bold">TOTAL PTS</td>
                                  <td className="p-2 text-center font-bold">{homePoints}</td>
                                  <td className="p-2 text-center font-bold">{awayPoints}</td>
                                </tr>
                              </tbody>
                            </table>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </main>
  );
}
