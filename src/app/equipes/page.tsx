"use client"

import { useState } from 'react'
import { players } from '../data/players'
import { teams as teamsData } from '../data/teams'
import { Player, Team as TeamType } from '../data/types'

const JerseyIcon = ({ color }: { color: string }) => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill={color} className="inline-block mr-3">
    <path d="M20.5,7L20.5,7L16,6l-4,2L8,6L3.5,7l0,0C3.2,7.1,3,7.3,3,7.6v11.8C3,19.7,3.3,20,3.6,20l4.9-1l3.5,2l3.5-2l4.9,1 c0.3,0,0.6-0.3,0.6-0.6V7.6C21,7.3,20.8,7.1,20.5,7z M15,14c0,1.7-1.3,3-3,3s-3-1.3-3-3s1.3-3,3-3S15,12.3,15,14z"/>
  </svg>
)

const PlayerList = ({ players, isExpanded }: { players: Player[], isExpanded: boolean }) => {
  if (!isExpanded) return null;
  
  return (
    <div className="mt-6 overflow-hidden transition-all duration-300">
      <div className="bg-gray-50 rounded-lg overflow-hidden">
        <table className="w-full">
          <thead>
            <tr className="bg-gray-100 border-b border-gray-200">
              <th className="py-3 px-4 text-left text-sm font-semibold text-gray-600">#</th>
              <th className="py-3 px-4 text-left text-sm font-semibold text-gray-600">Nom</th>
              <th className="py-3 px-4 text-left text-sm font-semibold text-gray-600">Position</th>
            </tr>
          </thead>
          <tbody>
            {players.sort((a, b) => a.number - b.number).map(player => (
              <tr key={player.id} className="border-b border-gray-200 hover:bg-gray-50 transition-colors">
                <td className="py-3 px-4 font-medium">{player.number}</td>
                <td className="py-3 px-4">{player.name}</td>
                <td className="py-3 px-4">{player.position}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default function Teams() {
  const [expandedTeam, setExpandedTeam] = useState<string | null>(null);

  const toggleTeam = (teamId: string) => {
    setExpandedTeam(expandedTeam === teamId ? null : teamId);
  };

  return (
    <div className="py-16">
      <div className="container">
        <h1 className="text-4xl font-bold mb-12">Nos Équipes</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {teamsData.map(team => {
            const teamPlayers = players.filter(p => p.team === team.name);
            const isExpanded = expandedTeam === team.id;
            
            return (
              <div key={team.id} className="card relative overflow-hidden">
                <div className="absolute top-0 left-0 w-1 h-full" style={{ backgroundColor: team.primaryColor }}></div>
                <div className="pl-6">
                  <div className="flex items-center mb-6">
                    <JerseyIcon color={team.primaryColor} />
                    <h3 className="text-xl font-bold">{team.name}</h3>
                  </div>

                  <div className="grid grid-cols-3 gap-4 mb-6">
                    <div>
                      <p className="text-gray-600">Joueurs</p>
                      <p className="text-2xl font-bold">{teamPlayers.length}</p>
                    </div>
                    <div>
                      <p className="text-gray-600">Victoires</p>
                      <p className="text-2xl font-bold">{team.stats?.wins || 0}</p>
                    </div>
                    <div>
                      <p className="text-gray-600">Défaites</p>
                      <p className="text-2xl font-bold">{team.stats?.losses || 0}</p>
                    </div>
                  </div>

                  <div className="flex gap-4">
                    <button 
                      onClick={() => toggleTeam(team.id)}
                      className="btn-secondary inline-flex items-center"
                    >
                      {isExpanded ? 'Masquer l\'équipe' : "Voir l'équipe"}
                      <svg 
                        className={`ml-2 w-4 h-4 transform transition-transform ${isExpanded ? 'rotate-90' : ''}`} 
                        fill="none" 
                        stroke="currentColor" 
                        viewBox="0 0 24 24"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </button>

                    <a 
                      href={`/joueurs?team=${encodeURIComponent(team.name)}`}
                      className="btn-primary inline-flex items-center"
                      style={{ 
                        backgroundColor: team.primaryColor,
                      }}
                    >
                      Plus de détails
                      <svg className="ml-2 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </a>
                  </div>

                  <PlayerList players={teamPlayers} isExpanded={isExpanded} />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
