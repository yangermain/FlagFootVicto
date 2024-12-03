type SetStateFunction<T> = (value: T | ((prev: T) => T)) => void;

export const drawField = (
  canvas: HTMLCanvasElement,
  fieldColor: string,
  onSaveToHistory: () => void
) => {
  const ctx = canvas.getContext('2d');
  if (!ctx) return;

  onSaveToHistory();
  
  // Fill background with white
  ctx.fillStyle = fieldColor;
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  const margin = canvas.width * 0.08;
  
  // Draw field outline in black
  ctx.strokeStyle = '#000000';
  ctx.lineWidth = 2;
  ctx.strokeRect(margin, margin, canvas.width - 2 * margin, canvas.height - 2 * margin);

  // Draw middle line
  ctx.beginPath();
  ctx.moveTo(margin, canvas.height / 2);
  ctx.lineTo(canvas.width - margin, canvas.height / 2);
  ctx.stroke();

  // Draw yard lines
  ctx.strokeStyle = '#000000';
  ctx.lineWidth = 1;
  const yardHeight = (canvas.height - 2 * margin) / 10;
  for (let i = 1; i < 10; i++) {
    ctx.beginPath();
    ctx.moveTo(margin, margin + yardHeight * i);
    ctx.lineTo(canvas.width - margin, margin + yardHeight * i);
    ctx.stroke();
  }
};

export const clearCanvas = (
  canvas: HTMLCanvasElement,
  backgroundColor: string,
  onSaveToHistory: () => void
) => {
  const ctx = canvas.getContext('2d');
  if (!ctx) return;

  onSaveToHistory();
  ctx.fillStyle = backgroundColor;
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  drawField(canvas, backgroundColor, onSaveToHistory);
};

export const flipCanvas = (
  canvas: HTMLCanvasElement,
  onSaveToHistory: () => void
) => {
  const ctx = canvas.getContext('2d');
  if (!ctx) return;

  onSaveToHistory();

  const tempCanvas = document.createElement('canvas');
  tempCanvas.width = canvas.width;
  tempCanvas.height = canvas.height;
  const tempCtx = tempCanvas.getContext('2d');
  if (!tempCtx) return;

  tempCtx.save();
  tempCtx.scale(-1, 1);
  tempCtx.drawImage(canvas, -canvas.width, 0);
  tempCtx.restore();

  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.drawImage(tempCanvas, 0, 0);
};

export const handleUndo = (
  canvas: HTMLCanvasElement,
  undoStack: ImageData[],
  setUndoStack: SetStateFunction<ImageData[]>,
  setRedoStack: SetStateFunction<ImageData[]>
) => {
  if (undoStack.length === 0) return;
  
  const ctx = canvas.getContext('2d');
  if (!ctx) return;

  const currentState = ctx.getImageData(0, 0, canvas.width, canvas.height);
  const previousState = undoStack[undoStack.length - 1];

  setRedoStack((prev: ImageData[]) => [...prev, currentState]);
  setUndoStack((prev: ImageData[]) => prev.slice(0, -1));
  
  ctx.putImageData(previousState, 0, 0);
};

export const handleRedo = (
  canvas: HTMLCanvasElement,
  redoStack: ImageData[],
  setUndoStack: SetStateFunction<ImageData[]>,
  setRedoStack: SetStateFunction<ImageData[]>
) => {
  if (redoStack.length === 0) return;
  
  const ctx = canvas.getContext('2d');
  if (!ctx) return;

  const currentState = ctx.getImageData(0, 0, canvas.width, canvas.height);
  const nextState = redoStack[redoStack.length - 1];

  setUndoStack((prev: ImageData[]) => [...prev, currentState]);
  setRedoStack((prev: ImageData[]) => prev.slice(0, -1));
  
  ctx.putImageData(nextState, 0, 0);
};
