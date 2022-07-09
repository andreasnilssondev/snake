import { game } from '../core/game';
import { Apple } from '../types';

export function getRandomPosition() {
  const { canvas } = game;
  const size = canvas.width / 20;
  const x = Math.floor(Math.random() * (canvas.width / size)) * size;
  const y = Math.floor(Math.random() * (canvas.height / size)) * size;
  return { x, y };
}

function isBeingEatenBySnake() {
  const { snake, apple } = game.objects;
  return snake.x === apple.x && snake.y === apple.y;
}

export function init() {
  const { canvas } = game;
  const size = canvas.width / 20;
  const { x, y } = getRandomPosition();
  Object.assign(game.objects.apple, { x, y, size });
}

export function render() {
  const { objects, context } = game;
  const { apple } = objects;
  const { x, y, size } = apple;
  context.fillStyle = 'red';
  context.fillRect(x, y, size, size);
}

export function update() {
  if (isBeingEatenBySnake()) {
    init();
  }
}

export const apple = { init, update, render } as Apple;
