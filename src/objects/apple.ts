import { getRandomPosition } from '../core/canvas';
import { Game } from '../types';

export function createApple(canvas: HTMLCanvasElement) {
  const size = canvas.width / 20;
  const { x, y } = getRandomPosition({ canvas, size });
  return { x, y, size };
}

export function drawApple(game: Game) {
  const { objects, context } = game;
  const { apple } = objects;
  const { x, y, size } = apple;
  context.fillStyle = 'red';
  context.fillRect(x, y, size, size);
}

function isBeingEatenBySnake(game: Game) {
  const { snake, apple } = game.objects;
  return snake.x === apple.x && snake.y === apple.y;
}

export function updateApple(game: Game) {
  if (isBeingEatenBySnake(game)) {
    game.objects.apple = createApple(game.canvas);
  }
}
