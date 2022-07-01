import { Game } from '../types';

interface GetRandomPosition {
  canvas: HTMLCanvasElement;
  size: number;
}

export function getRandomPosition({ canvas, size }: GetRandomPosition) {
  const x = Math.floor(Math.random() * (canvas.width / size)) * size;
  const y = Math.floor(Math.random() * (canvas.height / size)) * size;
  return { x, y };
}

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