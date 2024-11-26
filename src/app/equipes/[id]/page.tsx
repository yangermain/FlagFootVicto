import { notFound } from 'next/navigation';
import { Metadata } from 'next';

interface Player {
  id: string;
  name: string;
  number: number;
  position: string;
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
      position: i === 0 ? 'Quarterback' : i < 4 ? 'Receveur' : 'Défenseur',
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

    return (
      <div className="py-16">
        <div className="container">
          <h1 className="text-4xl font-montserrat font-bold mb-8">{team.name}</h1>
          
          {/* Statistiques de l'équipe */}
          <div className="card mb-12">
            <h2 className="text-2xl font-montserrat font-bold mb-6">Statistiques de l'équipe</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
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
            </div>
          </div>

          {/* Liste des joueurs */}
          <div>
            <h2 className="text-2xl font-montserrat font-bold mb-6">{playerLabel}</h2>
            <div className="overflow-x-auto">
              <table className="w-full bg-white rounded-lg shadow">
                <thead className="bg-primary text-white">
                  <tr>
                    <th className="py-3 px-4 text-left">Numéro</th>
                    <th className="py-3 px-4 text-left">Nom</th>
                    <th className="py-3 px-4 text-left">Position</th>
                    <th className="py-3 px-4 text-center">Touchdowns</th>
                    <th className="py-3 px-4 text-center">Interceptions</th>
                    <th className="py-3 px-4 text-center">Passes</th>
                  </tr>
                </thead>
                <tbody>
                  {team.players.map((player) => (
                    <tr key={player.id} className="border-b hover:bg-gray-50">
                      <td className="py-3 px-4">{player.number}</td>
                      <td className="py-3 px-4">{player.name}</td>
                      <td className="py-3 px-4">{player.position}</td>
                      <td className="py-3 px-4 text-center">{player.stats.touchdowns}</td>
                      <td className="py-3 px-4 text-center">{player.stats.interceptions}</td>
                      <td className="py-3 px-4 text-center">{player.stats.passes}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    );
  } catch (error) {
    notFound();
  }
}
