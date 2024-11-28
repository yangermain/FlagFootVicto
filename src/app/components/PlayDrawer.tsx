'use client';
import { useRef, useState, useEffect } from 'react';

type Tool = 'pen' | 'line' | 'circle' | 'rectangle' | 'eraser' | 'arrow' | 'player' | 'route';

const PlayDrawer = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [color, setColor] = useState('#000000');
  const [lineWidth, setLineWidth] = useState(2);
  const [selectedTool, setSelectedTool] = useState<Tool>('pen');
  const [startPos, setStartPos] = useState<{ x: number; y: number } | null>(null);
  const [backgroundColor, setBackgroundColor] = useState('#ffffff');
  const [routeType, setRouteType] = useState('go');
  const [canvasSize, setCanvasSize] = useState({ width: 600, height: 400 });
  const [baseCanvas, setBaseCanvas] = useState<ImageData | null>(null);

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
    const scaleX = canvas.width / rect.width;
    const scaleY = canvas.height / rect.height;
    
    return {
      x: (e.clientX - rect.left) * scaleX,
      y: (e.clientY - rect.top) * scaleY
    };
  };

  const drawArrow = (ctx: CanvasRenderingContext2D, from: { x: number; y: number }, to: { x: number; y: number }) => {
    const headLength = canvasSize.width * 0.025;
    const dx = to.x - from.x;
    const dy = to.y - from.y;
    const angle = Math.atan2(dy, dx);
    
    ctx.beginPath();
    ctx.moveTo(from.x, from.y);
    ctx.lineTo(to.x, to.y);
    ctx.stroke();
    
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
    const radius = canvasSize.width * 0.025;
    ctx.beginPath();
    ctx.arc(x, y, radius, 0, 2 * Math.PI);
    ctx.stroke();
    
    if (isOffense) {
      const offset = radius * 0.7;
      ctx.beginPath();
      ctx.moveTo(x - offset, y - offset);
      ctx.lineTo(x + offset, y + offset);
      ctx.moveTo(x + offset, y - offset);
      ctx.lineTo(x - offset, y + offset);
    } else {
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
        drawArrow(ctx, start, end);
        break;
      case 'slant':
        ctx.lineTo(end.x, end.y);
        drawArrow(ctx, { x: end.x - 10, y: end.y - 10 }, end);
        break;
      case 'out':
        ctx.lineTo(start.x, end.y);
        ctx.lineTo(end.x, end.y);
        drawArrow(ctx, { x: end.x - 10, y: end.y }, end);
        break;
      case 'post':
        ctx.lineTo(midX, midY);
        ctx.lineTo(end.x, end.y);
        drawArrow(ctx, { x: end.x - 10, y: end.y - 10 }, end);
        break;
      case 'corner':
        ctx.lineTo(midX, start.y);
        ctx.lineTo(end.x, end.y);
        drawArrow(ctx, { x: end.x - 10, y: end.y - 10 }, end);
        break;
    }
    ctx.stroke();
  };

  const startDrawing = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const pos = getMousePos(e);
    setStartPos(pos);
    setIsDrawing(true);

    // Save the current canvas state
    setBaseCanvas(ctx.getImageData(0, 0, canvas.width, canvas.height));

    if (selectedTool === 'pen' || selectedTool === 'eraser') {
      ctx.beginPath();
      ctx.moveTo(pos.x, pos.y);
    } else if (selectedTool === 'player') {
      drawPlayer(ctx, pos.x, pos.y, e.button === 0);
      setIsDrawing(false);
    }
  };

  const draw = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!isDrawing || !startPos || !baseCanvas) return;
    
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const currentPos = getMousePos(e);

    if (selectedTool === 'pen' || selectedTool === 'eraser') {
      ctx.lineTo(currentPos.x, currentPos.y);
      ctx.stroke();
    } else {
      // Restore the base canvas before drawing the preview
      ctx.putImageData(baseCanvas, 0, 0);

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
    setBaseCanvas(null);
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

    ctx.fillStyle = backgroundColor;
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    const margin = canvas.width * 0.08;
    
    // Draw field outline
    ctx.strokeStyle = '#000000';
    ctx.lineWidth = 2;
    ctx.strokeRect(margin, margin, canvas.width - 2 * margin, canvas.height - 2 * margin);

    // Draw middle line
    ctx.beginPath();
    ctx.moveTo(margin, canvas.height / 2);
    ctx.lineTo(canvas.width - margin, canvas.height / 2);
    ctx.stroke();

    // Draw yard lines
    ctx.strokeStyle = '#cccccc';
    ctx.lineWidth = 1;
    const yardHeight = (canvas.height - 2 * margin) / 10;
    for (let i = 1; i < 10; i++) {
      ctx.beginPath();
      ctx.moveTo(margin, margin + yardHeight * i);
      ctx.lineTo(canvas.width - margin, margin + yardHeight * i);
      ctx.stroke();
    }

    // Add yard numbers
    ctx.fillStyle = '#666666';
    ctx.font = `${canvas.width * 0.02}px Arial`;
    ctx.textAlign = 'right';
    for (let i = 0; i <= 10; i++) {
      const y = margin + yardHeight * i;
      ctx.fillText(`${i * 10}`, margin - 5, y + 4);
    }
  };

  const captureScreenshot = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const link = document.createElement('a');
    link.download = 'play-drawing.png';
    link.href = canvas.toDataURL('image/png');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div ref={containerRef} className="flex flex-col items-center w-full max-w-[900px] mx-auto">
      <div className="w-full bg-white rounded-lg shadow-lg p-4 mb-4">
        <div className="flex flex-wrap justify-center gap-4 mb-4">
          <div className="flex items-center space-x-3">
            <label className="text-sm font-semibold text-gray-700 whitespace-nowrap">Outils:</label>
            <select 
              value={selectedTool}
              onChange={(e) => setSelectedTool(e.target.value as Tool)}
              className="border border-gray-300 rounded-md px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
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
            <div className="flex items-center space-x-3">
              <label className="text-sm font-semibold text-gray-700 whitespace-nowrap">Type:</label>
              <select
                value={routeType}
                onChange={(e) => setRouteType(e.target.value)}
                className="border border-gray-300 rounded-md px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="go">Go</option>
                <option value="slant">Slant</option>
                <option value="out">Out</option>
                <option value="post">Post</option>
                <option value="corner">Corner</option>
              </select>
            </div>
          )}

          <div className="flex items-center space-x-3">
            <label className="text-sm font-semibold text-gray-700 whitespace-nowrap">Couleur:</label>
            <input
              type="color"
              value={color}
              onChange={(e) => setColor(e.target.value)}
              className="w-8 h-8 rounded border border-gray-300 p-0"
            />
          </div>

          <div className="flex items-center space-x-3">
            <label className="text-sm font-semibold text-gray-700 whitespace-nowrap">Épaisseur:</label>
            <input
              type="range"
              min="1"
              max="10"
              value={lineWidth}
              onChange={(e) => setLineWidth(Number(e.target.value))}
              className="w-24"
            />
          </div>
        </div>

        <div className="flex justify-center gap-2">
          <button
            onClick={drawField}
            className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 transition-colors duration-200 shadow-sm text-sm font-medium"
          >
            Terrain
          </button>
          <button
            onClick={clearCanvas}
            className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition-colors duration-200 shadow-sm text-sm font-medium"
          >
            Effacer tout
          </button>
          <button
            onClick={captureScreenshot}
            className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors duration-200 shadow-sm text-sm font-medium"
          >
            Capture d'écran
          </button>
        </div>
      </div>

      <div className="text-sm text-gray-600 mb-2 italic text-center">
        * Clic gauche pour joueur offensif (X), clic droit pour joueur défensif (•)
      </div>

      <div className="w-full bg-white rounded-lg shadow-lg p-4">
        <canvas
          ref={canvasRef}
          width={canvasSize.width}
          height={canvasSize.height}
          onMouseDown={startDrawing}
          onMouseMove={draw}
          onMouseUp={stopDrawing}
          onMouseLeave={stopDrawing}
          onContextMenu={(e) => e.preventDefault()}
          className="w-full h-auto border border-gray-200 rounded-lg bg-white"
          style={{ touchAction: 'none' }}
        />
      </div>
    </div>
  );
};

export default PlayDrawer;
