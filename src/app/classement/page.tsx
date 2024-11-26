'use client';

interface TeamStanding {
  name: string;
  played: number;
  wins: number;
  losses: number;
  points: number;
  pointsFor: number;
  pointsAgainst: number;
}

const teams: TeamStanding[] = [
  { name: 'Dirty Birds', played: 0, wins: 0, losses: 0, points: 0, pointsFor: 0, pointsAgainst: 0 },
  { name: 'Eagles', played: 0, wins: 0, losses: 0, points: 0, pointsFor: 0, pointsAgainst: 0 },
  { name: 'Vikings', played: 0, wins: 0, losses: 0, points: 0, pointsFor: 0, pointsAgainst: 0 },
  { name: 'PCP', played: 0, wins: 0, losses: 0, points: 0, pointsFor: 0, pointsAgainst: 0 },
  { name: 'Les Filles de Caleb', played: 0, wins: 0, losses: 0, points: 0, pointsFor: 0, pointsAgainst: 0 },
  { name: 'Les bons buveurs', played: 0, wins: 0, losses: 0, points: 0, pointsFor: 0, pointsAgainst: 0 },
  { name: 'Destroyers', played: 0, wins: 0, losses: 0, points: 0, pointsFor: 0, pointsAgainst: 0 }
];

export default function Standings() {
  // Sort teams by points, then by point difference
  const sortedTeams = [...teams].sort((a, b) => {
    if (b.points !== a.points) {
      return b.points - a.points;
    }
    const aDiff = a.pointsFor - a.pointsAgainst;
    const bDiff = b.pointsFor - b.pointsAgainst;
    return bDiff - aDiff;
  });

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container mx-auto px-4">
        <h1 className="text-4xl font-bold text-gray-900 mb-8 text-center">Classement</h1>
        
        <div className="max-w-6xl mx-auto bg-white rounded-xl shadow-md overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-[#1F2937] text-white">
                  <th className="py-4 px-6 text-left">Position</th>
                  <th className="py-4 px-6 text-left">Équipe</th>
                  <th className="py-4 px-6 text-center">Joués</th>
                  <th className="py-4 px-6 text-center">Victoires</th>
                  <th className="py-4 px-6 text-center">Défaites</th>
                  <th className="py-4 px-6 text-center">Pointage</th>
                  <th className="py-4 px-6 text-center">Pts. Pour</th>
                  <th className="py-4 px-6 text-center">Pts. Contre</th>
                  <th className="py-4 px-6 text-center">Différentiel</th>
                </tr>
              </thead>
              <tbody>
                {sortedTeams.map((team, index) => (
                  <tr 
                    key={team.name}
                    className={`
                      border-b last:border-b-0
                      ${index < 4 ? 'bg-gray-100' : ''}
                      hover:bg-gray-50 transition-colors
                    `}
                  >
                    <td className="py-4 px-6">
                      <span className="font-semibold">{index + 1}</span>
                    </td>
                    <td className="py-4 px-6 font-semibold">{team.name}</td>
                    <td className="py-4 px-6 text-center">{team.played}</td>
                    <td className="py-4 px-6 text-center text-[#2d851b] font-bold">{team.wins}</td>
                    <td className="py-4 px-6 text-center text-red-600 font-medium">{team.losses}</td>
                    <td className="py-4 px-6 text-center font-bold">{team.points}</td>
                    <td className="py-4 px-6 text-center">{team.pointsFor}</td>
                    <td className="py-4 px-6 text-center">{team.pointsAgainst}</td>
                    <td className="py-4 px-6 text-center font-medium">
                      <span className={team.pointsFor - team.pointsAgainst > 0 ? 'text-[#1F2937]' : 'text-red-600'}>
                        {team.pointsFor - team.pointsAgainst > 0 ? '+' : ''}
                        {team.pointsFor - team.pointsAgainst}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          
          <div className="p-6 bg-gray-50 border-t">
            <h2 className="font-semibold text-gray-900 mb-2">Légende</h2>
            <div className="space-y-2 text-sm text-gray-600">
              <p>• Les points sont calculés comme suit : Victoire = 2 points, Défaite = 0 point</p>
              <p>• Deux (2) points sont accordé pour gagner la demie. 1/2 = 2 points. Il y a donc une possibilité de maximum 6 points par match</p>
              <p>• En cas d'égalité de points, le classement est déterminé par la différence de points (Pour - Contre)</p>
              <p>• Les 4 premières équipes (surlignées en gris) se qualifient pour les séries éliminatoires</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
