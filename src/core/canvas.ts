import { Game } from '../types';

export function getCanvas() {
  const canvas = document.querySelector<HTMLCanvasElement>('#canvas')!;
  canvas.width = 500;
  canvas.height = 500;
  return canvas;
}

export function clearCanvas(game: Game) {
  const { context, canvas } = game;
  context.clearRect(0, 0, canvas.width, canvas.height);
}
