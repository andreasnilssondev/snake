import { game } from '../core/game';

export function getRandomPosition() {
  const { canvas } = game;
  const size = canvas.width / 20;
  const x = Math.floor(Math.random() * (canvas.width / size)) * size;
  const y = Math.floor(Math.random() * (canvas.height / size)) * size;
  return { x, y };
}

export function createApple() {
  const { canvas } = game;
  const size = canvas.width / 20;
  const { x, y } = getRandomPosition();
  return { x, y, size };
}

export function renderApple() {
  const { objects, context } = game;
  const { apple } = objects;
  const { x, y, size } = apple;
  context.fillStyle = 'red';
  context.fillRect(x, y, size, size);
}

function isBeingEatenBySnake() {
  const { snake, apple } = game.objects;
  return snake.x === apple.x && snake.y === apple.y;
}

export function updateApple() {
  if (isBeingEatenBySnake()) {
    game.objects.apple = createApple();
  }
}
