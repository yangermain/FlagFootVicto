import { notFound } from 'next/navigation';
import { Metadata } from 'next';

interface Player {
  id: string;
  name: string;
  number: number;
  positionOffensive: string;
  positionDefensive: string;
  stats: {
    touchdowns: number;
    interceptions: number;
    passes: number;
  };
}

interface TeamData {
  id: string;
  name: string;
  category: 'masculin' | 'feminin';
  players: Player[];
  stats: {
    wins: number;
    losses: number;
    pointsFor: number;
    pointsAgainst: number;
  };
}

const validTeamIds = ['M1', 'M2', 'M3', 'M4', 'F1', 'F2', 'F3', 'F4'];

export async function generateStaticParams() {
  return validTeamIds.map((id) => ({
    id,
  }));
}

type Props = {
  params: { id: string };
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const id = params.id;
  
  if (!validTeamIds.includes(id)) {
    return {
      title: 'Équipe non trouvée',
    };
  }

  return {
    title: `Équipe ${id} - Ligue de Flag-Football`,
    description: `Statistiques et informations sur l'équipe ${id}`,
  };
}

// Simulated team data
async function getTeamData(id: string): Promise<TeamData> {
  if (!validTeamIds.includes(id)) {
    throw new Error('Team not found');
  }

  // Simulate network delay
  await new Promise(resolve => setTimeout(resolve, 100));

  const isWomensTeam = id.startsWith('F');
  const playerPrefix = isWomensTeam ? 'Joueuse' : 'Joueur';
  
  return {
    id,
    name: `Équipe ${id}`,
    category: isWomensTeam ? 'feminin' : 'masculin',
    players: Array.from({ length: 8 }, (_, i) => ({
      id: `${id}-${i + 1}`,
      name: `${playerPrefix} ${i + 1}`,
      number: i + 1,
      positionOffensive: i === 0 ? 'QB' : i < 4 ? 'Rec' : 'Rush',
      positionDefensive: i === 0 ? 'S' : i < 4 ? 'CB' : 'LB',
      stats: {
        touchdowns: Math.floor(Math.random() * 10),
        interceptions: Math.floor(Math.random() * 5),
        passes: Math.floor(Math.random() * 20),
      },
    })),
    stats: {
      wins: Math.floor(Math.random() * 5),
      losses: Math.floor(Math.random() * 3),
      pointsFor: Math.floor(Math.random() * 100) + 50,
      pointsAgainst: Math.floor(Math.random() * 80) + 30,
    },
  };
}

export default async function TeamPage({ params }: Props) {
  try {
    const team = await getTeamData(params.id);
    const playerLabel = team.category === 'feminin' ? 'Joueuses' : 'Joueurs';
    const differential = team.stats.pointsFor - team.stats.pointsAgainst;

    return (
      <div className="py-16">
        <div className="container">
          <h1 className="text-4xl font-montserrat font-bold mb-8">{team.name}</h1>
          
          {/* Statistiques de l'équipe */}
          <div className="card mb-12">
            <h2 className="text-2xl font-montserrat font-bold mb-6">Statistiques de l'équipe</h2>
            <div className="grid grid-cols-2 md:grid-cols-5 gap-6">
              <div>
                <p className="text-gray-600">Victoires</p>
                <p className="text-2xl font-bold text-primary">{team.stats.wins}</p>
              </div>
              <div>
                <p className="text-gray-600">Défaites</p>
                <p className="text-2xl font-bold text-primary">{team.stats.losses}</p>
              </div>
              <div>
                <p className="text-gray-600">Points Pour</p>
                <p className="text-2xl font-bold text-primary">{team.stats.pointsFor}</p>
              </div>
              <div>
                <p className="text-gray-600">Points Contre</p>
                <p className="text-2xl font-bold text-primary">{team.stats.pointsAgainst}</p>
              </div>
              <div>
                <p className="text-gray-600">Différentiel</p>
                <p className={`text-2xl font-bold ${differential >= 0 ? 'text-primary' : 'text-red-600'}`}>
                  {differential >= 0 ? '+' : ''}{differential}
                </p>
              </div>
            </div>
          </div>

          {/* Liste des joueurs */}
          <div>
            <h2 className="text-2xl font-montserrat font-bold mb-6">{playerLabel}</h2>
            <div className="overflow-x-auto shadow rounded-lg">
              <div className="inline-block min-w-full align-middle">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-primary text-white">
                    <tr>
                      <th scope="col" className="px-4 py-3 text-left text-sm font-semibold whitespace-nowrap min-w-[80px]">Numéro</th>
                      <th scope="col" className="px-4 py-3 text-left text-sm font-semibold whitespace-nowrap min-w-[120px]">Nom</th>
                      <th scope="col" className="px-4 py-3 text-left text-sm font-semibold whitespace-nowrap min-w-[100px]">Position Off.</th>
                      <th scope="col" className="px-4 py-3 text-left text-sm font-semibold whitespace-nowrap min-w-[100px]">Position Déf.</th>
                      <th scope="col" className="px-4 py-3 text-center text-sm font-semibold whitespace-nowrap min-w-[100px]">Touchdowns</th>
                      <th scope="col" className="px-4 py-3 text-center text-sm font-semibold whitespace-nowrap min-w-[100px]">Interceptions</th>
                      <th scope="col" className="px-4 py-3 text-center text-sm font-semibold whitespace-nowrap min-w-[80px]">Passes</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {team.players.map((player) => (
                      <tr key={player.id} className="hover:bg-gray-50">
                        <td className="px-4 py-3 text-sm whitespace-nowrap">{player.number}</td>
                        <td className="px-4 py-3 text-sm whitespace-nowrap">{player.name}</td>
                        <td className="px-4 py-3 text-sm whitespace-nowrap">{player.positionOffensive}</td>
                        <td className="px-4 py-3 text-sm whitespace-nowrap">{player.positionDefensive}</td>
                        <td className="px-4 py-3 text-sm text-center whitespace-nowrap">{player.stats.touchdowns}</td>
                        <td className="px-4 py-3 text-sm text-center whitespace-nowrap">{player.stats.interceptions}</td>
                        <td className="px-4 py-3 text-sm text-center whitespace-nowrap">{player.stats.passes}</td>
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
  } catch (error) {
    notFound();
  }
}
