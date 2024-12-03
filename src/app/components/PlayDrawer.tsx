'use client';

import { useRef, useState, useEffect } from 'react';
import PlayerPanel from './play-drawer/PlayerPanel';
import ControlPanel from './play-drawer/ControlPanel';
import DrawingCanvas from './play-drawer/DrawingCanvas';
import { Tool } from './play-drawer/types';
import { drawField, clearCanvas, flipCanvas, handleUndo, handleRedo } from './play-drawer/utils';

const MAX_HISTORY = 50;

const PlayDrawer: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [color, setColor] = useState('#000000');
  const [lineWidth, setLineWidth] = useState(2);
  const [selectedTool, setSelectedTool] = useState<Tool>('pen');
  const [backgroundColor, setBackgroundColor] = useState('#ffffff');
  const [fieldColor, setFieldColor] = useState('#ffffff');
  const [routeType, setRouteType] = useState('go');
  const [canvasSize, setCanvasSize] = useState({ width: 600, height: 400 });
  const [opacity, setOpacity] = useState(1);
  const [isFlipped, setIsFlipped] = useState(false);
  const [zoom, setZoom] = useState(1);
  const [undoStack, setUndoStack] = useState<ImageData[]>([]);
  const [redoStack, setRedoStack] = useState<ImageData[]>([]);

  useEffect(() => {
    const updateCanvasSize = () => {
      if (containerRef.current) {
        const container = containerRef.current;
        const maxWidth = Math.min(container.clientWidth - 32, 900);
        const aspectRatio = 1.5;
        
        let width = maxWidth;
        let height = width / aspectRatio;
        
        setCanvasSize({
          width: Math.floor(width),
          height: Math.floor(height)
        });
      }
    };

    updateCanvasSize();
    window.addEventListener('resize', updateCanvasSize);
    return () => window.removeEventListener('resize', updateCanvasSize);
  }, []);

  const saveToHistory = () => {
    const currentCanvas = document.querySelector('canvas');
    if (!currentCanvas) return;
    
    const ctx = currentCanvas.getContext('2d');
    if (!ctx) return;

    const currentState = ctx.getImageData(0, 0, currentCanvas.width, currentCanvas.height);
    setUndoStack(prev => {
      const newStack = [...prev, currentState];
      if (newStack.length > MAX_HISTORY) newStack.shift();
      return newStack;
    });
    setRedoStack([]);
  };

  const handleDrawField = () => {
    const currentCanvas = document.querySelector('canvas');
    if (!currentCanvas) return;
    drawField(currentCanvas, fieldColor, saveToHistory);
  };

  const handleClearCanvas = () => {
    const currentCanvas = document.querySelector('canvas');
    if (!currentCanvas) return;
    clearCanvas(currentCanvas, backgroundColor, saveToHistory);
  };

  const handleFlipField = () => {
    const currentCanvas = document.querySelector('canvas');
    if (!currentCanvas) return;
    flipCanvas(currentCanvas, saveToHistory);
    setIsFlipped(!isFlipped);
  };

  const handleUndoAction = () => {
    const currentCanvas = document.querySelector('canvas');
    if (!currentCanvas) return;
    handleUndo(currentCanvas, undoStack, setUndoStack, setRedoStack);
  };

  const handleRedoAction = () => {
    const currentCanvas = document.querySelector('canvas');
    if (!currentCanvas) return;
    handleRedo(currentCanvas, redoStack, setUndoStack, setRedoStack);
  };

  return (
    <div ref={containerRef} className="flex flex-col items-center w-full max-w-[900px] mx-auto">
      <div className="w-full bg-white rounded-lg shadow-lg p-2 sm:p-4 mb-2 sm:mb-4">
        <div className="flex flex-col sm:flex-row justify-between items-center sm:items-start gap-4 mb-2 sm:mb-4">
          <PlayerPanel type="offense" />
          
          <ControlPanel
            selectedTool={selectedTool}
            setSelectedTool={setSelectedTool}
            routeType={routeType}
            setRouteType={setRouteType}
            color={color}
            setColor={setColor}
            lineWidth={lineWidth}
            setLineWidth={setLineWidth}
            zoom={zoom}
            setZoom={setZoom}
            undoStack={undoStack}
            redoStack={redoStack}
            onUndo={handleUndoAction}
            onRedo={handleRedoAction}
            onDrawField={handleDrawField}
            onFlipField={handleFlipField}
            onClearCanvas={handleClearCanvas}
          />
          
          <PlayerPanel type="defense" />
        </div>
      </div>

      <DrawingCanvas
        width={canvasSize.width}
        height={canvasSize.height}
        zoom={zoom}
        isFlipped={isFlipped}
        selectedTool={selectedTool}
        color={color}
        lineWidth={lineWidth}
        backgroundColor={backgroundColor}
        routeType={routeType}
        onSaveToHistory={saveToHistory}
      />
    </div>
  );
};

export default PlayDrawer;
