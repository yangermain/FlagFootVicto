import { Player } from './data/types';
import { players } from './data/players';
import { teams } from './data/teams';

interface TopPlayer {
  name: string;
  team: string;
  value: number;
  number: number;
}

export default function Home() {
  const getTeamColors = (teamName: string) => {
    const team = teams.find(t => t.name === teamName);
    return team ? { primary: team.primaryColor, secondary: team.secondaryColor } : { primary: '#1F2937', secondary: '#ffffff' };
  };

  const getTextColor = (bgColor: string) => {
    // Convert hex to RGB
    const hex = bgColor.replace('#', '');
    const r = parseInt(hex.substr(0, 2), 16);
    const g = parseInt(hex.substr(2, 2), 16);
    const b = parseInt(hex.substr(4, 2), 16);
    
    // Calculate relative luminance
    const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;
    
    // Return white for dark backgrounds, black for light backgrounds
    return luminance > 0.5 ? '#000000' : '#ffffff';
  };

  const findTopPlayers = (stat: keyof Player['stats'], count: number = 5): TopPlayer[] => {
    return players
      .sort((a: Player, b: Player) => b.stats[stat] - a.stats[stat])
      .slice(0, count)
      .map((player: Player) => ({
        name: player.name,
        team: player.team,
        value: player.stats[stat],
        number: player.number
      }));
  };

  // Get top players for each category
  const topCatches = findTopPlayers('attrapes');
  const topTouchdowns = findTopPlayers('touches');
  const topInterceptions = findTopPlayers('interceptions');
  const topDeflags = findTopPlayers('rabattus');
  const topSacks = findTopPlayers('sacks');

  // Find offensive player of the week
  const offensivePlayer = players.reduce((best: Player, current: Player) => {
    const bestPoints = best.stats.touches * 6 + best.stats.convertis + best.stats.attrapes;
    const currentPoints = current.stats.touches * 6 + current.stats.convertis + current.stats.attrapes;
    return currentPoints > bestPoints ? current : best;
  }, players[0]);

  // Find defensive player of the week
  const defensivePlayer = players.reduce((best: Player, current: Player) => {
    const bestPoints = best.stats.rabattus + best.stats.interceptions * 2 + best.stats.sacks * 2;
    const currentPoints = current.stats.rabattus + current.stats.interceptions * 2 + current.stats.sacks * 2;
    return currentPoints > bestPoints ? current : best;
  }, players[0]);

  // Week 1 matches from calendar
  const upcomingMatches = [
    { date: '8 décembre 2024', time: '15h00', teams: ['Dirty Birds', 'Eagles'], field: 'Terrain A' },
    { date: '8 décembre 2024', time: '15h00', teams: ['Vikings', 'PCP'], field: 'Terrain B' },
    { date: '8 décembre 2024', time: '16h30', teams: ['Les Filles de Caleb', 'Les bons buveurs'], field: 'Terrain A' },
    { date: '8 décembre 2024', time: '16h30', teams: ['Destroyers', 'Eagles'], field: 'Terrain B' },
  ];

  return (
    <div>
      {/* Hero Section */}
      <section className="bg-primary text-white py-20">
        <div className="container">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-montserrat font-bold mb-4">
              Ligue de Flag-Football 6 vs 6
            </h1>
            <h2 className="text-2xl md:text-3xl font-montserrat mb-6">
              Saison Hiver 2024-2025
            </h2>
            <a href="/equipes" className="btn-primary text-lg">
              Découvrir les équipes
            </a>
          </div>
        </div>
      </section>

      {/* Prochains Matchs */}
      <section className="py-16">
        <div className="container">
          <h2 className="text-3xl font-montserrat font-bold mb-8">Prochains Matchs</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {upcomingMatches.map((match, index) => {
              const team1Colors = getTeamColors(match.teams[0]);
              const team2Colors = getTeamColors(match.teams[1]);
              
              return (
                <div key={index} className="card hover:shadow-lg transition-shadow">
                  <div className="text-center space-y-4">
                    <div className="text-gray-600 mb-2">
                      <p className="font-semibold">{match.date} - {match.time}</p>
                      <p className="text-sm">{match.field}</p>
                    </div>
                    <div className="flex justify-between items-center px-4">
                      <div 
                        className="w-48 px-4 py-3 rounded-lg font-semibold text-center"
                        style={{
                          border: `2px solid ${team1Colors.primary}`,
                          color: team1Colors.primary
                        }}
                      >
                        {match.teams[0]}
                      </div>
                      <span className="text-gray-500 mx-4">vs</span>
                      <div 
                        className="w-48 px-4 py-3 rounded-lg font-semibold text-center"
                        style={{
                          border: `2px solid ${team2Colors.primary}`,
                          color: team2Colors.primary
                        }}
                      >
                        {match.teams[1]}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Players of the Week */}
      <section className="bg-gray-50 py-16">
        <div className="container">
          <h2 className="text-3xl font-montserrat font-bold mb-8">Joueurs de la Semaine</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Offensive Player */}
            <div className="card">
              <h3 className="text-xl font-bold mb-4 text-primary">Joueur Offensif</h3>
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <p className="text-lg font-semibold">{offensivePlayer.name}</p>
                  <div 
                    className="w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold"
                    style={{
                      backgroundColor: getTeamColors(offensivePlayer.team).primary,
                      color: getTextColor(getTeamColors(offensivePlayer.team).primary)
                    }}
                  >
                    {offensivePlayer.number}
                  </div>
                  <span className="text-sm text-gray-500">{offensivePlayer.age} ans</span>
                </div>
                <p className="text-gray-600">{offensivePlayer.team}</p>
                <div className="mt-4 space-y-1">
                  <p>Touchdowns: {offensivePlayer.stats.touches}</p>
                  <p>Convertis: {offensivePlayer.stats.convertis}</p>
                  <p>Attrapés: {offensivePlayer.stats.attrapes}</p>
                  <p className="font-bold mt-2">
                    Total Points: {offensivePlayer.stats.touches * 6 + offensivePlayer.stats.convertis}
                  </p>
                </div>
              </div>
            </div>

            {/* Defensive Player */}
            <div className="card">
              <h3 className="text-xl font-bold mb-4 text-primary">Joueur Défensif</h3>
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <p className="text-lg font-semibold">{defensivePlayer.name}</p>
                  <div 
                    className="w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold"
                    style={{
                      backgroundColor: getTeamColors(defensivePlayer.team).primary,
                      color: getTextColor(getTeamColors(defensivePlayer.team).primary)
                    }}
                  >
                    {defensivePlayer.number}
                  </div>
                  <span className="text-sm text-gray-500">{defensivePlayer.age} ans</span>
                </div>
                <p className="text-gray-600">{defensivePlayer.team}</p>
                <div className="mt-4 space-y-1">
                  <p>Deflags: {defensivePlayer.stats.rabattus}</p>
                  <p>Interceptions: {defensivePlayer.stats.interceptions}</p>
                  <p>Sacks: {defensivePlayer.stats.sacks}</p>
                  <p>Pénalités: {defensivePlayer.stats.penalites}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Top 5 Players */}
      <section className="py-16">
        <div className="container">
          <h2 className="text-3xl font-montserrat font-bold mb-8">Top 5 Joueurs</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Touchdowns */}
            <div className="card">
              <h3 className="text-xl font-bold mb-4 text-primary">Touchdowns</h3>
              <div className="space-y-2">
                {topTouchdowns.map((player: TopPlayer, index: number) => (
                  <div key={index} className="flex justify-between items-center">
                    <div className="flex items-center gap-2">
                      <div 
                        className="w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold"
                        style={{
                          backgroundColor: getTeamColors(player.team).primary,
                          color: getTextColor(getTeamColors(player.team).primary)
                        }}
                      >
                        {player.number}
                      </div>
                      <span>{player.name}</span>
                      <span className="text-sm text-gray-500">({player.team})</span>
                    </div>
                    <span className="font-semibold">{player.value}</span>
                  </div>
                ))}
              </div>
            </div>
            {/* Catches */}
            <div className="card">
              <h3 className="text-xl font-bold mb-4 text-primary">Passes Attrapées</h3>
              <div className="space-y-2">
                {topCatches.map((player: TopPlayer, index: number) => (
                  <div key={index} className="flex justify-between items-center">
                    <div className="flex items-center gap-2">
                      <div 
                        className="w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold"
                        style={{
                          backgroundColor: getTeamColors(player.team).primary,
                          color: getTextColor(getTeamColors(player.team).primary)
                        }}
                      >
                        {player.number}
                      </div>
                      <span>{player.name}</span>
                      <span className="text-sm text-gray-500">({player.team})</span>
                    </div>
                    <span className="font-semibold">{player.value}</span>
                  </div>
                ))}
              </div>
            </div>
            {/* Interceptions */}
            <div className="card">
              <h3 className="text-xl font-bold mb-4 text-primary">Interceptions</h3>
              <div className="space-y-2">
                {topInterceptions.map((player: TopPlayer, index: number) => (
                  <div key={index} className="flex justify-between items-center">
                    <div className="flex items-center gap-2">
                      <div 
                        className="w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold"
                        style={{
                          backgroundColor: getTeamColors(player.team).primary,
                          color: getTextColor(getTeamColors(player.team).primary)
                        }}
                      >
                        {player.number}
                      </div>
                      <span>{player.name}</span>
                      <span className="text-sm text-gray-500">({player.team})</span>
                    </div>
                    <span className="font-semibold">{player.value}</span>
                  </div>
                ))}
              </div>
            </div>
            {/* Deflags */}
            <div className="card">
              <h3 className="text-xl font-bold mb-4 text-primary">Deflags</h3>
              <div className="space-y-2">
                {topDeflags.map((player: TopPlayer, index: number) => (
                  <div key={index} className="flex justify-between items-center">
                    <div className="flex items-center gap-2">
                      <div 
                        className="w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold"
                        style={{
                          backgroundColor: getTeamColors(player.team).primary,
                          color: getTextColor(getTeamColors(player.team).primary)
                        }}
                      >
                        {player.number}
                      </div>
                      <span>{player.name}</span>
                      <span className="text-sm text-gray-500">({player.team})</span>
                    </div>
                    <span className="font-semibold">{player.value}</span>
                  </div>
                ))}
              </div>
            </div>
            {/* Sacks */}
            <div className="card">
              <h3 className="text-xl font-bold mb-4 text-primary">Sacks</h3>
              <div className="space-y-2">
                {topSacks.map((player: TopPlayer, index: number) => (
                  <div key={index} className="flex justify-between items-center">
                    <div className="flex items-center gap-2">
                      <div 
                        className="w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold"
                        style={{
                          backgroundColor: getTeamColors(player.team).primary,
                          color: getTextColor(getTeamColors(player.team).primary)
                        }}
                      >
                        {player.number}
                      </div>
                      <span>{player.name}</span>
                      <span className="text-sm text-gray-500">({player.team})</span>
                    </div>
                    <span className="font-semibold">{player.value}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
