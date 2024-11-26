'use client';

import { useState, useMemo, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { players } from '../data/players';
import { Player } from '../data/types';

type PlayerStats = Player['stats'];
type SortKey = keyof Player | keyof PlayerStats;

type SortConfig = {
  key: SortKey;
  isStats: boolean;
  direction: 'asc' | 'desc';
};

export default function PlayersPage() {
  const searchParams = useSearchParams();
  const [selectedTeams, setSelectedTeams] = useState<string[]>([]);
  const [sortConfig, setSortConfig] = useState<SortConfig>({ 
    key: 'name', 
    isStats: false,
    direction: 'asc' 
  });

  // Initialize selectedTeams with the team from URL if present
  useEffect(() => {
    const teamFromUrl = searchParams.get('team');
    if (teamFromUrl) {
      setSelectedTeams([decodeURIComponent(teamFromUrl)]);
    }
  }, [searchParams]);

  const teams = Array.from(new Set(players.map(p => p.team)));

  const handleTeamToggle = (team: string) => {
    setSelectedTeams(prev =>
      prev.includes(team)
        ? prev.filter(t => t !== team)
        : [...prev, team]
    );
  };

  const sortedPlayers = useMemo(() => {
    let filteredPlayers = selectedTeams.length > 0
      ? players.filter(p => selectedTeams.includes(p.team))
      : players;

    return [...filteredPlayers].sort((a, b) => {
      let aValue = sortConfig.isStats
        ? (a.stats as any)[sortConfig.key]
        : (a as any)[sortConfig.key];
      let bValue = sortConfig.isStats
        ? (b.stats as any)[sortConfig.key]
        : (b as any)[sortConfig.key];

      if (typeof aValue === 'string') aValue = aValue.toLowerCase();
      if (typeof bValue === 'string') bValue = bValue.toLowerCase();

      if (aValue < bValue) return sortConfig.direction === 'asc' ? -1 : 1;
      if (aValue > bValue) return sortConfig.direction === 'asc' ? 1 : -1;
      return 0;
    });
  }, [players, sortConfig, selectedTeams]);

  const handleSort = (key: SortKey, isStats: boolean = false) => {
    setSortConfig(prev => ({
      key,
      isStats,
      direction: prev.key === key && prev.direction === 'asc' ? 'desc' : 'asc'
    }));
  };

  const SortIcon = ({ column, isStats }: { column: SortKey; isStats?: boolean }) => {
    const isActive = sortConfig.key === column && sortConfig.isStats === isStats;
    return (
      <span className="ml-1 text-gray-400">↕</span>
    );
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <h1 className="text-4xl font-bold text-gray-900 mb-8 text-center">Nos Joueurs</h1>

      <div className="mb-6">
        <h2 className="text-[#1F2937] mb-3">Filtrer par équipe:</h2>
        <div className="flex flex-wrap gap-2">
          {teams.map(team => (
            <button
              key={team}
              onClick={() => handleTeamToggle(team)}
              className={`px-4 py-1.5 rounded-full border transition-colors ${
                selectedTeams.includes(team)
                  ? 'bg-[#1F2937] text-white border-transparent'
                  : 'bg-white text-gray-700 border-gray-200 hover:border-gray-300'
              }`}
            >
              {team}
            </button>
          ))}
        </div>
      </div>

      <div className="bg-white rounded shadow overflow-hidden">
        <div className="overflow-x-auto max-h-[600px] relative">
          <table className="w-full table-auto whitespace-nowrap">
            <thead className="sticky top-0 z-30">
              <tr className="bg-[#1F2937] text-white">
                <th className="cursor-pointer px-4 py-2 text-center border-b border-gray-700 sticky left-0 z-40 bg-[#1F2937]" onClick={() => handleSort('number')}>
                  No. <SortIcon column="number" />
                </th>
                <th className="cursor-pointer px-4 py-2 text-left border-b border-gray-700 bg-[#1F2937]" onClick={() => handleSort('name')}>
                  Nom <SortIcon column="name" />
                </th>
                <th className="cursor-pointer px-4 py-2 text-left border-b border-gray-700 bg-[#1F2937]" onClick={() => handleSort('team')}>
                  Équipe <SortIcon column="team" />
                </th>
                <th className="cursor-pointer px-4 py-2 text-center border-b border-gray-700 bg-[#1F2937]" onClick={() => handleSort('positionOffensive')}>
                  Pos. Off. <SortIcon column="positionOffensive" />
                </th>
                <th className="cursor-pointer px-4 py-2 text-center border-b border-gray-700 bg-[#1F2937]" onClick={() => handleSort('positionDefensive')}>
                  Pos. Déf. <SortIcon column="positionDefensive" />
                </th>
                <th className="cursor-pointer px-4 py-2 text-center border-b border-gray-700 bg-[#1F2937]" onClick={() => handleSort('age')}>
                  Âge <SortIcon column="age" />
                </th>
                <th className="cursor-pointer px-4 py-2 text-center border-b border-gray-700 bg-[#1F2937]" onClick={() => handleSort('experience')}>
                  Exp. <SortIcon column="experience" />
                </th>
                <th className="cursor-pointer px-4 py-2 text-center border-b border-gray-700 bg-[#1F2937]" onClick={() => handleSort('touches', true)}>
                  TDs <SortIcon column="touches" isStats={true} />
                </th>
                <th className="cursor-pointer px-4 py-2 text-center border-b border-gray-700 bg-[#1F2937]" onClick={() => handleSort('attrapes', true)}>
                  P.Att <SortIcon column="attrapes" isStats={true} />
                </th>
                <th className="cursor-pointer px-4 py-2 text-center border-b border-gray-700 bg-[#1F2937]" onClick={() => handleSort('sacks', true)}>
                  Sacks <SortIcon column="sacks" isStats={true} />
                </th>
                <th className="cursor-pointer px-4 py-2 text-center border-b border-gray-700 bg-[#1F2937]" onClick={() => handleSort('interceptions', true)}>
                  Int. <SortIcon column="interceptions" isStats={true} />
                </th>
                <th className="cursor-pointer px-4 py-2 text-center border-b border-gray-700 bg-[#1F2937]" onClick={() => handleSort('penalites', true)}>
                  Pén. <SortIcon column="penalites" isStats={true} />
                </th>
                <th className="cursor-pointer px-4 py-2 text-center border-b border-gray-700 bg-[#1F2937]" onClick={() => handleSort('rabattus', true)}>
                  P.Rab. <SortIcon column="rabattus" isStats={true} />
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {sortedPlayers.map((player, idx) => (
                <tr key={player.id} className={idx % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                  <td className="px-4 py-2 text-center sticky left-0 z-10 bg-inherit border-r">{player.number}</td>
                  <td className="px-4 py-2 text-left">{player.name}</td>
                  <td className="px-4 py-2 text-left">{player.team}</td>
                  <td className="px-4 py-2 text-center">{player.positionOffensive}</td>
                  <td className="px-4 py-2 text-center">{player.positionDefensive}</td>
                  <td className="px-4 py-2 text-center">{player.age}</td>
                  <td className="px-4 py-2 text-center">{player.experience}</td>
                  <td className="px-4 py-2 text-center">{player.stats.touches}</td>
                  <td className="px-4 py-2 text-center">{player.stats.attrapes}</td>
                  <td className="px-4 py-2 text-center">{player.stats.sacks}</td>
                  <td className="px-4 py-2 text-center">{player.stats.interceptions}</td>
                  <td className="px-4 py-2 text-center">{player.stats.penalites}</td>
                  <td className="px-4 py-2 text-center">{player.stats.rabattus}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
