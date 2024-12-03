'use client';

import { useRef, useEffect, useState } from 'react';
import { useDrop } from 'react-dnd';
import { Tool, DragItem } from './types';

interface DrawingCanvasProps {
  width: number;
  height: number;
  zoom: number;
  isFlipped: boolean;
  selectedTool: Tool;
  color: string;
  lineWidth: number;
  backgroundColor: string;
  routeType: string;
  onSaveToHistory: () => void;
}

const DrawingCanvas: React.FC<DrawingCanvasProps> = ({
  width,
  height,
  zoom,
  isFlipped,
  selectedTool,
  color,
  lineWidth,
  backgroundColor,
  routeType,
  onSaveToHistory,
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [startPos, setStartPos] = useState<{ x: number; y: number } | null>(null);
  const [baseCanvas, setBaseCanvas] = useState<ImageData | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    ctx.strokeStyle = selectedTool === 'eraser' ? backgroundColor : color;
    ctx.lineWidth = selectedTool === 'eraser' ? 20 : lineWidth;
    ctx.lineCap = 'round';
  }, [color, lineWidth, selectedTool, backgroundColor]);

  const drawPlayer = (ctx: CanvasRenderingContext2D, x: number, y: number, isOffense = true) => {
    const radius = width * 0.02;
    
    ctx.save();
    
    if (isOffense) {
      ctx.strokeStyle = '#0066cc';
      ctx.fillStyle = '#e6f0ff';
    } else {
      ctx.strokeStyle = '#cc0000';
      ctx.fillStyle = '#ffe6e6';
    }
    
    ctx.beginPath();
    ctx.arc(x, y, radius, 0, 2 * Math.PI);
    ctx.fill();
    ctx.lineWidth = 2;
    ctx.stroke();
    
    if (isOffense) {
      const offset = radius * 0.7;
      ctx.beginPath();
      ctx.strokeStyle = '#0066cc';
      ctx.lineWidth = 2;
      ctx.moveTo(x - offset, y - offset);
      ctx.lineTo(x + offset, y + offset);
      ctx.moveTo(x + offset, y - offset);
      ctx.lineTo(x - offset, y + offset);
      ctx.stroke();
    } else {
      ctx.beginPath();
      ctx.fillStyle = '#cc0000';
      ctx.arc(x, y, radius * 0.5, 0, 2 * Math.PI);
      ctx.fill();
    }
    
    ctx.restore();
  };

  const drawArrow = (ctx: CanvasRenderingContext2D, from: { x: number; y: number }, to: { x: number; y: number }) => {
    const headLength = width * 0.025;
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

  const getMousePos = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return { x: 0, y: 0 };
    
    const rect = canvas.getBoundingClientRect();
    
    // Calculate the ratio between the canvas's actual size and its display size
    const scaleX = canvas.width / rect.width;
    const scaleY = canvas.height / rect.height;
    
    // Get mouse position relative to the canvas element and apply zoom correction
    const x = (e.clientX - rect.left) * scaleX * zoom;
    const y = (e.clientY - rect.top) * scaleY * zoom;
    
    return {
      x: isFlipped ? canvas.width - x : x,
      y: y
    };
  };

  const startDrawing = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const pos = getMousePos(e);
    setStartPos(pos);
    setIsDrawing(true);

    setBaseCanvas(ctx.getImageData(0, 0, canvas.width, canvas.height));

    if (selectedTool === 'pen' || selectedTool === 'eraser') {
      ctx.beginPath();
      ctx.moveTo(pos.x, pos.y);
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
    if (isDrawing) {
      onSaveToHistory();
    }
    setIsDrawing(false);
    setStartPos(null);
    setBaseCanvas(null);
  };

  const [, drop] = useDrop<DragItem>(() => ({
    accept: 'player',
    drop: (item, monitor) => {
      const canvas = canvasRef.current;
      if (!canvas) return;

      const clientOffset = monitor.getClientOffset();
      if (!clientOffset) return;

      const bounds = canvas.getBoundingClientRect();
      
      // Use the same coordinate calculation as getMousePos
      const scaleX = canvas.width / bounds.width;
      const scaleY = canvas.height / bounds.height;
      
      const x = (clientOffset.x - bounds.left) * scaleX * zoom;
      const y = (clientOffset.y - bounds.top) * scaleY * zoom;

      const ctx = canvas.getContext('2d');
      if (ctx) {
        drawPlayer(ctx, isFlipped ? canvas.width - x : x, y, item.isOffense);
        onSaveToHistory();
      }
    }
  }));

  return (
    <div 
      ref={drop}
      className="w-full bg-white rounded-lg shadow-lg p-2 sm:p-4 relative overflow-hidden"
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
      }}
    >
      <canvas
        ref={canvasRef}
        width={width}
        height={height}
        onMouseDown={startDrawing}
        onMouseMove={draw}
        onMouseUp={stopDrawing}
        onMouseLeave={stopDrawing}
        onContextMenu={(e) => e.preventDefault()}
        className="border border-gray-200 rounded-lg bg-white"
        style={{ 
          touchAction: 'none',
          transform: `scale(${zoom})`,
          transformOrigin: 'center center',
          maxWidth: '100%',
          maxHeight: '100%'
        }}
      />
    </div>
  );
};

export default DrawingCanvas;
