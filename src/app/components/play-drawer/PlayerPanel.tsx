'use client';

import DraggablePlayer from './DraggablePlayer';
import { PLAYERS } from './types';

interface PlayerPanelProps {
  type: 'offense' | 'defense';
}

const PlayerPanel: React.FC<PlayerPanelProps> = ({ type }) => {
  const isOffense = type === 'offense';
  const players = isOffense ? PLAYERS.offense : PLAYERS.defense;
  const bgColor = isOffense ? 'bg-blue-50' : 'bg-red-50';
  const textColor = isOffense ? 'text-blue-700' : 'text-red-700';

  return (
    <div className={`w-full sm:w-auto grid grid-cols-3 sm:grid-cols-2 gap-2 sm:gap-4 p-2 sm:p-4 ${bgColor} rounded-lg`}>
      <h3 className={`col-span-3 sm:col-span-2 text-center font-bold ${textColor} mb-1 sm:mb-2`}>
        {isOffense ? 'Offense' : 'Defense'}
      </h3>
      {players.map((player) => (
        <DraggablePlayer key={player.id} {...player} isOffense={isOffense} />
      ))}
    </div>
  );
};

export default PlayerPanel;
