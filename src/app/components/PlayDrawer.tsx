'use client';
import { useRef, useState, useEffect } from 'react';

type Tool = 'pen' | 'line' | 'circle' | 'rectangle' | 'eraser' | 'arrow' | 'player' | 'route';

const PlayDrawer = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [color, setColor] = useState('#000000');
  const [lineWidth, setLineWidth] = useState(2);
  const [selectedTool, setSelectedTool] = useState<Tool>('pen');
  const [startPos, setStartPos] = useState<{ x: number; y: number } | null>(null);
  const [backgroundColor, setBackgroundColor] = useState('#ffffff');
  const [routeType, setRouteType] = useState('go');

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    ctx.strokeStyle = selectedTool === 'eraser' ? backgroundColor : color;
    ctx.lineWidth = selectedTool === 'eraser' ? 20 : lineWidth;
    ctx.lineCap = 'round';
  }, [color, lineWidth, selectedTool, backgroundColor]);

  const getMousePos = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return { x: 0, y: 0 };
    
    const rect = canvas.getBoundingClientRect();
    return {
      x: e.clientX - rect.left,
      y: e.clientY - rect.top
    };
  };

  const drawArrow = (ctx: CanvasRenderingContext2D, from: { x: number; y: number }, to: { x: number; y: number }) => {
    const headLength = 15;
    const dx = to.x - from.x;
    const dy = to.y - from.y;
    const angle = Math.atan2(dy, dx);
    
    // Draw the main line
    ctx.beginPath();
    ctx.moveTo(from.x, from.y);
    ctx.lineTo(to.x, to.y);
    ctx.stroke();
    
    // Draw the arrow head
    ctx.beginPath();
    ctx.moveTo(to.x, to.y);
    ctx.lineTo(
      to.x - headLength * Math.cos(angle - Math.PI / 6),
      to.y - headLength * Math.sin(angle - Math.PI / 6)
    );
    ctx.moveTo(to.x, to.y);
    ctx.lineTo(
      to.x - headLength * Math.cos(angle + Math.PI / 6),
      to.y - headLength * Math.sin(angle + Math.PI / 6)
    );
    ctx.stroke();
  };

  const drawPlayer = (ctx: CanvasRenderingContext2D, x: number, y: number, isOffense = true) => {
    const radius = 15;
    ctx.beginPath();
    ctx.arc(x, y, radius, 0, 2 * Math.PI);
    ctx.stroke();
    
    if (isOffense) {
      // Draw X inside circle for offense
      const offset = radius * 0.7;
      ctx.beginPath();
      ctx.moveTo(x - offset, y - offset);
      ctx.lineTo(x + offset, y + offset);
      ctx.moveTo(x + offset, y - offset);
      ctx.lineTo(x - offset, y + offset);
    } else {
      // Draw dot inside circle for defense
      ctx.beginPath();
      ctx.arc(x, y, radius * 0.3, 0, 2 * Math.PI);
      ctx.fill();
    }
    ctx.stroke();
  };

  const drawRoute = (ctx: CanvasRenderingContext2D, start: { x: number; y: number }, end: { x: number; y: number }) => {
    const midX = (start.x + end.x) / 2;
    const midY = (start.y + end.y) / 2;

    ctx.beginPath();
    ctx.moveTo(start.x, start.y);

    switch (routeType) {
      case 'go':
        // Straight line with arrow
        drawArrow(ctx, start, end);
        break;
      case 'slant':
        // Angled line
        ctx.lineTo(end.x, end.y);
        drawArrow(ctx, { x: end.x - 10, y: end.y - 10 }, end);
        break;
      case 'out':
        // Right angle
        ctx.lineTo(start.x, end.y);
        ctx.lineTo(end.x, end.y);
        drawArrow(ctx, { x: end.x - 10, y: end.y }, end);
        break;
      case 'post':
        // Diagonal after straight
        ctx.lineTo(midX, midY);
        ctx.lineTo(end.x, end.y);
        drawArrow(ctx, { x: end.x - 10, y: end.y - 10 }, end);
        break;
      case 'corner':
        // Straight then diagonal
        ctx.lineTo(midX, start.y);
        ctx.lineTo(end.x, end.y);
        drawArrow(ctx, { x: end.x - 10, y: end.y - 10 }, end);
        break;
    }
    ctx.stroke();
  };

  const startDrawing = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const pos = getMousePos(e);
    setStartPos(pos);
    setIsDrawing(true);

    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    if (selectedTool === 'pen' || selectedTool === 'eraser') {
      ctx.beginPath();
      ctx.moveTo(pos.x, pos.y);
    } else if (selectedTool === 'player') {
      drawPlayer(ctx, pos.x, pos.y, e.button === 0); // Left click for offense, right click for defense
      setIsDrawing(false);
    }
  };

  const draw = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!isDrawing || !startPos) return;
    
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const currentPos = getMousePos(e);

    if (selectedTool === 'pen' || selectedTool === 'eraser') {
      ctx.lineTo(currentPos.x, currentPos.y);
      ctx.stroke();
    } else {
      // Create a copy of the canvas for shape preview
      const tempCanvas = document.createElement('canvas');
      tempCanvas.width = canvas.width;
      tempCanvas.height = canvas.height;
      const tempCtx = tempCanvas.getContext('2d');
      if (!tempCtx) return;

      // Copy the current canvas state
      tempCtx.drawImage(canvas, 0, 0);

      // Clear the main canvas
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // Draw the previous state
      ctx.drawImage(tempCanvas, 0, 0);

      // Draw the new shape
      if (selectedTool === 'line') {
        ctx.beginPath();
        ctx.moveTo(startPos.x, startPos.y);
        ctx.lineTo(currentPos.x, currentPos.y);
        ctx.stroke();
      } else if (selectedTool === 'arrow' || selectedTool === 'route') {
        if (selectedTool === 'route') {
          drawRoute(ctx, startPos, currentPos);
        } else {
          drawArrow(ctx, startPos, currentPos);
        }
      } else if (selectedTool === 'rectangle') {
        ctx.beginPath();
        const width = currentPos.x - startPos.x;
        const height = currentPos.y - startPos.y;
        ctx.rect(startPos.x, startPos.y, width, height);
        ctx.stroke();
      } else if (selectedTool === 'circle') {
        ctx.beginPath();
        const radius = Math.sqrt(
          Math.pow(currentPos.x - startPos.x, 2) + Math.pow(currentPos.y - startPos.y, 2)
        );
        ctx.arc(startPos.x, startPos.y, radius, 0, 2 * Math.PI);
        ctx.stroke();
      }
    }
  };

  const stopDrawing = () => {
    setIsDrawing(false);
    setStartPos(null);
  };

  const clearCanvas = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    ctx.fillStyle = backgroundColor;
    ctx.fillRect(0, 0, canvas.width, canvas.height);
  };

  const drawField = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Clear canvas with white background
    ctx.fillStyle = backgroundColor;
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Draw field outline
    ctx.strokeStyle = '#000000';
    ctx.lineWidth = 2;
    ctx.strokeRect(50, 50, canvas.width - 100, canvas.height - 100);

    // Draw middle line horizontally
    ctx.beginPath();
    ctx.moveTo(50, canvas.height / 2);
    ctx.lineTo(canvas.width - 50, canvas.height / 2);
    ctx.stroke();

    // Draw yard lines horizontally
    ctx.strokeStyle = '#cccccc';
    ctx.lineWidth = 1;
    const yardHeight = (canvas.height - 100) / 10;
    for (let i = 1; i < 10; i++) {
      ctx.beginPath();
      ctx.moveTo(50, 50 + yardHeight * i);
      ctx.lineTo(canvas.width - 50, 50 + yardHeight * i);
      ctx.stroke();
    }

    // Add yard numbers
    ctx.fillStyle = '#666666';
    ctx.font = '12px Arial';
    ctx.textAlign = 'right';
    for (let i = 0; i <= 10; i++) {
      const y = 50 + yardHeight * i;
      ctx.fillText(`${i * 10}`, 45, y + 4);
    }
  };

  return (
    <div className="flex flex-col items-center gap-4 p-4">
      <div className="flex flex-wrap gap-4 mb-4">
        <div className="flex gap-2 items-center">
          <label className="text-sm font-medium">Outils:</label>
          <select 
            value={selectedTool}
            onChange={(e) => setSelectedTool(e.target.value as Tool)}
            className="border rounded px-2 py-1"
          >
            <option value="pen">Crayon</option>
            <option value="line">Ligne</option>
            <option value="arrow">Flèche</option>
            <option value="route">Route</option>
            <option value="circle">Cercle</option>
            <option value="rectangle">Rectangle</option>
            <option value="player">Joueur</option>
            <option value="eraser">Efface</option>
          </select>
        </div>
        {selectedTool === 'route' && (
          <div className="flex gap-2 items-center">
            <label className="text-sm font-medium">Type de route:</label>
            <select
              value={routeType}
              onChange={(e) => setRouteType(e.target.value)}
              className="border rounded px-2 py-1"
            >
              <option value="go">Go</option>
              <option value="slant">Slant</option>
              <option value="out">Out</option>
              <option value="post">Post</option>
              <option value="corner">Corner</option>
            </select>
          </div>
        )}
        <div className="flex gap-2 items-center">
          <label className="text-sm font-medium">Couleur:</label>
          <input
            type="color"
            value={color}
            onChange={(e) => setColor(e.target.value)}
            className="w-8 h-8"
          />
        </div>
        <div className="flex gap-2 items-center">
          <label className="text-sm font-medium">Épaisseur:</label>
          <input
            type="range"
            min="1"
            max="10"
            value={lineWidth}
            onChange={(e) => setLineWidth(Number(e.target.value))}
            className="w-32"
          />
        </div>
        <button
          onClick={drawField}
          className="px-4 py-1 bg-green-500 text-white rounded hover:bg-green-600"
        >
          Terrain
        </button>
        <button
          onClick={clearCanvas}
          className="px-4 py-1 bg-red-500 text-white rounded hover:bg-red-600"
        >
          Effacer tout
        </button>
      </div>
      <div className="text-sm text-gray-600 mb-2">
        * Clic gauche pour joueur offensif (X), clic droit pour joueur défensif (•)
      </div>
      <canvas
        ref={canvasRef}
        width={600}
        height={800}
        onMouseDown={startDrawing}
        onMouseMove={draw}
        onMouseUp={stopDrawing}
        onMouseLeave={stopDrawing}
        onContextMenu={(e) => e.preventDefault()}
        className="border border-gray-300 bg-white"
      />
    </div>
  );
};

export default PlayDrawer;