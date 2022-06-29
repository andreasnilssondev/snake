interface ClearCanvas {
  context: CanvasRenderingContext2D;
  canvas: HTMLCanvasElement;
}

export function clearCanvas({ context, canvas }: ClearCanvas) {
  context.clearRect(0, 0, canvas.width, canvas.height);
}
