import { game } from './game';

export const canvas = document.querySelector<HTMLCanvasElement>('#canvas')!;

export function clearCanvas() {
  const { context, canvasSize } = game;
  context.clearRect(0, 0, canvasSize, canvasSize);
}

function resizeCanvas() {
  const maxWidth = window.innerWidth;
  const maxHeight = window.innerHeight;
  const size = Math.min(maxWidth, maxHeight);
  const scale = size / game.canvasSize;
  canvas.width = size;
  canvas.height = size;

  canvas.setAttribute('data-scale', scale.toString());
  canvas.getContext('2d')!.setTransform(1, 0, 0, 1, 0, 0);
  canvas.getContext('2d')!.scale(scale, scale); // game.context doesn't exist yet
}

export function watchCanvasSize() {
  window.addEventListener('resize', resizeCanvas);
  resizeCanvas();
}
