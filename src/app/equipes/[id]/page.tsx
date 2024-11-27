import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import { teams } from '../../data/teams';
import { players } from '../../data/players';
import { Team } from '../../data/types';

type Props = {
  params: { id: string };
};

export async function generateStaticParams() {
  return teams.map((team) => ({
    id: team.id,
  }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const team = teams.find(t => t.id === params.id);
  
  if (!team) {
    return {
      title: 'Équipe non trouvée',
    };
  }

  return {
    title: `${team.name} - Ligue de Flag-Football`,
    description: `Statistiques et informations sur l'équipe ${team.name}`,
  };
}

export default async function TeamPage({ params }: Props) {
  const team = teams.find(t => t.id === params.id);
  
  if (!team) {
    notFound();
  }

  const teamPlayers = players.filter(p => p.team === team.name);

  const differential = (team.stats?.pointsFor || 0) - (team.stats?.pointsAgainst || 0);

  return (
    <div className="py-16">
      <div className="container mx-auto px-4 max-w-7xl">
        <h1 className="text-4xl font-bold mb-8">{team.name}</h1>
        
        {/* Statistiques de l'équipe */}
        <div className="bg-white rounded-xl shadow-sm p-6 mb-12">
          <h2 className="text-2xl font-bold mb-6">Statistiques de l'équipe</h2>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-6">
            <div>
              <p className="text-gray-600">Victoires</p>
              <p className="text-2xl font-bold" style={{ color: team.primaryColor }}>{team.stats?.wins || 0}</p>
            </div>
            <div>
              <p className="text-gray-600">Défaites</p>
              <p className="text-2xl font-bold" style={{ color: team.primaryColor }}>{team.stats?.losses || 0}</p>
            </div>
            <div>
              <p className="text-gray-600">Points Pour</p>
              <p className="text-2xl font-bold" style={{ color: team.primaryColor }}>{team.stats?.pointsFor || 0}</p>
            </div>
            <div>
              <p className="text-gray-600">Points Contre</p>
              <p className="text-2xl font-bold" style={{ color: team.primaryColor }}>{team.stats?.pointsAgainst || 0}</p>
            </div>
            <div>
              <p className="text-gray-600">Différentiel</p>
              <p className={`text-2xl font-bold`} style={{ color: differential >= 0 ? team.primaryColor : '#DC2626' }}>
                {differential >= 0 ? '+' : ''}{differential}
              </p>
            </div>
          </div>
        </div>

        {/* Liste des joueurs */}
        <div>
          <h2 className="text-2xl font-bold mb-6">Joueurs</h2>
          <div className="overflow-x-auto rounded-xl shadow">
            <div className="inline-block min-w-full align-middle">
              <table className="min-w-full divide-y divide-gray-200">
                <thead style={{ backgroundColor: team.primaryColor }} className="text-white">
                  <tr>
                    <th scope="col" className="px-4 py-3 text-left text-sm font-semibold whitespace-nowrap min-w-[80px]">Numéro</th>
                    <th scope="col" className="px-4 py-3 text-left text-sm font-semibold whitespace-nowrap min-w-[120px]">Nom</th>
                    <th scope="col" className="px-4 py-3 text-left text-sm font-semibold whitespace-nowrap min-w-[100px]">Position Off.</th>
                    <th scope="col" className="px-4 py-3 text-left text-sm font-semibold whitespace-nowrap min-w-[100px]">Position Déf.</th>
                    <th scope="col" className="px-4 py-3 text-center text-sm font-semibold whitespace-nowrap min-w-[100px]">Touches</th>
                    <th scope="col" className="px-4 py-3 text-center text-sm font-semibold whitespace-nowrap min-w-[100px]">Interceptions</th>
                    <th scope="col" className="px-4 py-3 text-center text-sm font-semibold whitespace-nowrap min-w-[100px]">Verges Passes</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {teamPlayers.map((player) => (
                    <tr key={player.id} className="hover:bg-gray-50">
                      <td className="px-4 py-3 text-sm whitespace-nowrap">{player.number}</td>
                      <td className="px-4 py-3 text-sm whitespace-nowrap">{player.name}</td>
                      <td className="px-4 py-3 text-sm whitespace-nowrap">{player.positionOffensive}</td>
                      <td className="px-4 py-3 text-sm whitespace-nowrap">{player.positionDefensive}</td>
                      <td className="px-4 py-3 text-sm text-center whitespace-nowrap">{player.stats?.touches || 0}</td>
                      <td className="px-4 py-3 text-sm text-center whitespace-nowrap">{player.stats?.interceptions || 0}</td>
                      <td className="px-4 py-3 text-sm text-center whitespace-nowrap">{player.stats?.passingYards || 0}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
