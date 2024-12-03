'use client';

import { useDrag } from 'react-dnd';
import { DraggablePlayerProps, DragItem } from './types';

const DraggablePlayer: React.FC<DraggablePlayerProps> = ({ id, label, isOffense }) => {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: 'player',
    item: { id, label, isOffense, type: 'player' } as DragItem,
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  }));

  return (
    <div
      ref={drag}
      className={`
        w-8 h-8 rounded-full flex items-center justify-center cursor-move
        ${isOffense 
          ? 'bg-blue-100 border-2 border-blue-500 hover:bg-blue-200' 
          : 'bg-red-100 border-2 border-red-500 hover:bg-red-200'}
        ${isDragging ? 'opacity-50' : 'opacity-100'}
        transform transition-all duration-200 hover:scale-105 shadow-md
      `}
      style={{
        touchAction: 'none',
      }}
    >
      <span className={`
        text-xs font-bold
        ${isOffense ? 'text-blue-700' : 'text-red-700'}
      `}>
        {label}
      </span>
    </div>
  );
};

export default DraggablePlayer;
