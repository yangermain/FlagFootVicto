export type Tool = 'pen' | 'line' | 'circle' | 'rectangle' | 'eraser' | 'arrow' | 'route';

export interface Player {
  id: string;
  label: string;
}

export interface DraggablePlayerProps {
  id: string;
  label: string;
  isOffense: boolean;
}

export interface DragItem {
  id: string;
  label: string;
  isOffense: boolean;
  type: string;
}

export const PLAYERS = {
  offense: [
    { id: 'qb', label: 'QB' },
    { id: 'snap', label: 'SN' },
    { id: 'wr1', label: 'WR1' },
    { id: 'wr2', label: 'WR2' },
    { id: 'sb1', label: 'SB1' },
    { id: 'sb2', label: 'SB2' }
  ],
  defense: [
    { id: 'safety', label: 'S' },
    { id: 'rusher', label: 'R' },
    { id: 'cb1', label: 'CB1' },
    { id: 'cb2', label: 'CB2' },
    { id: 'hb1', label: 'HB1' },
    { id: 'hb2', label: 'HB2' }
  ]
};
