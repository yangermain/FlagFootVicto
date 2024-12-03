'use client';

import { Tool } from './types';

interface ControlPanelProps {
  selectedTool: Tool;
  setSelectedTool: (tool: Tool) => void;
  routeType: string;
  setRouteType: (type: string) => void;
  color: string;
  setColor: (color: string) => void;
  lineWidth: number;
  setLineWidth: (width: number) => void;
  zoom: number;
  setZoom: (zoom: number) => void;
  undoStack: ImageData[];
  redoStack: ImageData[];
  onUndo: () => void;
  onRedo: () => void;
  onDrawField: () => void;
  onFlipField: () => void;
  onClearCanvas: () => void;
}

const ControlPanel: React.FC<ControlPanelProps> = ({
  selectedTool,
  setSelectedTool,
  routeType,
  setRouteType,
  color,
  setColor,
  lineWidth,
  setLineWidth,
  zoom,
  setZoom,
  undoStack,
  redoStack,
  onUndo,
  onRedo,
  onDrawField,
  onFlipField,
  onClearCanvas,
}) => {
  return (
    <div className="w-full sm:w-auto flex flex-col items-center space-y-2 sm:space-y-4 px-2 sm:px-4">
      {/* Drawing Tools Row */}
      <div className="flex flex-wrap justify-center gap-2">
        <select 
          value={selectedTool}
          onChange={(e) => setSelectedTool(e.target.value as Tool)}
          className="min-w-[100px] text-sm border border-gray-300 rounded-md px-2 py-1 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        >
          <option value="pen">Crayon</option>
          <option value="line">Ligne</option>
          <option value="arrow">Flèche</option>
          <option value="route">Route</option>
          <option value="circle">Cercle</option>
          <option value="rectangle">Rectangle</option>
          <option value="eraser">Efface</option>
        </select>

        {selectedTool === 'route' && (
          <select
            value={routeType}
            onChange={(e) => setRouteType(e.target.value)}
            className="min-w-[100px] text-sm border border-gray-300 rounded-md px-2 py-1 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="go">Go</option>
            <option value="slant">Slant</option>
            <option value="out">Out</option>
            <option value="post">Post</option>
            <option value="corner">Corner</option>
          </select>
        )}
      </div>

      {/* Color and Size Controls */}
      <div className="flex flex-wrap justify-center items-center gap-2">
        <input
          type="color"
          value={color}
          onChange={(e) => setColor(e.target.value)}
          className="w-8 h-8 rounded border border-gray-300 p-0"
        />
        <div className="flex flex-col items-center">
          <span className="text-xs text-gray-600">Épaisseur</span>
          <input
            type="range"
            min="1"
            max="10"
            value={lineWidth}
            onChange={(e) => setLineWidth(Number(e.target.value))}
            className="w-20 sm:w-24"
          />
        </div>
        <div className="flex flex-col items-center">
          <span className="text-xs text-gray-600">Zoom</span>
          <input
            type="range"
            min="0.5"
            max="2"
            step="0.1"
            value={zoom}
            onChange={(e) => setZoom(Number(e.target.value))}
            className="w-20 sm:w-24"
          />
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex flex-wrap justify-center gap-2">
        <button
          onClick={onUndo}
          disabled={undoStack.length === 0}
          className="w-10 h-10 flex items-center justify-center bg-gray-500 text-white rounded-md hover:bg-gray-600 transition-colors duration-200 shadow-sm text-lg font-medium disabled:opacity-50 disabled:cursor-not-allowed"
        >
          ←
        </button>
        <button
          onClick={onDrawField}
          className="px-3 h-10 bg-green-500 text-white rounded-md hover:bg-green-600 transition-colors duration-200 shadow-sm text-sm font-medium whitespace-nowrap"
        >
          Terrain
        </button>
        <button
          onClick={onFlipField}
          className="px-3 h-10 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors duration-200 shadow-sm text-sm font-medium whitespace-nowrap"
        >
          Inverser
        </button>
        <button
          onClick={onClearCanvas}
          className="px-3 h-10 bg-red-500 text-white rounded-md hover:bg-red-600 transition-colors duration-200 shadow-sm text-sm font-medium whitespace-nowrap"
        >
          Effacer
        </button>
        <button
          onClick={onRedo}
          disabled={redoStack.length === 0}
          className="w-10 h-10 flex items-center justify-center bg-gray-500 text-white rounded-md hover:bg-gray-600 transition-colors duration-200 shadow-sm text-lg font-medium disabled:opacity-50 disabled:cursor-not-allowed"
        >
          →
        </button>
      </div>
    </div>
  );
};

export default ControlPanel;
