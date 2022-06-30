import { getRandomPosition } from './canvas';
import { Game } from './types';
import { checkFood } from './utils/checkFood';

export function createApple(canvas: HTMLCanvasElement) {
  const size = 25;
  const { x, y } = getRandomPosition({ canvas, size });
  return { x, y, size };
}

export function drawApple(game: Game) {
  const { apple, context } = game;
  const { x, y, size } = apple;
  context.fillStyle = 'red';
  context.fillRect(x, y, size, size);
}

export function updateApple(game: Game) {
  checkFood(game);
}
