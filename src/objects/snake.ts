import { DIRECTIONS } from './controls';
import { game, setGameOver } from '../core/game';
import { Snake } from '../types';

export function init() {
  const { canvas } = game;
  const speed = 200; // How many ms to move one square
  const size = canvas.width / 20;
  const x = size * 2;
  const y = size * 2;

  const tail = [
    { y, x: x - size * 3 },
    { y, x: x - size * 2 },
    { y, x: x - size },
  ];

  Object.assign(game.objects.snake, {
    x,
    y,
    size,
    tail,
    shouldGrow: false,
    speed,
    timeSinceLastUpdate: null,
  });
}

export function render() {
  const { objects, context } = game;
  const { snake } = objects;

  context.fillStyle = '#388538';
  context.fillRect(snake.x + 1, snake.y + 1, snake.size - 2, snake.size - 2);

  snake.tail.forEach(piece => {
    context.fillRect(piece.x + 1, piece.y + 1, snake.size - 2, snake.size - 2);
  });
}

function isEatingApple() {
  const { snake, apple } = game.objects;
  return snake.x === apple.x && snake.y === apple.y;
}

function isWallCollision() {
  const { objects, canvas } = game;
  const { snake } = objects;

  return (
    snake.x < 0 ||
    snake.x > canvas.width - snake.size ||
    snake.y < 0 ||
    snake.y > canvas.height - snake.size
  );
}

function isSelfCollision() {
  const { snake } = game.objects;
  return snake.tail.some(position => snake.x === position.x && snake.y === position.y);
}

export function moveSnake() {
  const { objects } = game;
  const { snake, controls } = objects;

  if (!snake.shouldGrow) {
    snake.tail.splice(0, 1);
  }

  snake.shouldGrow = false;
  snake.tail.push({ x: snake.x, y: snake.y });
  const direction = DIRECTIONS[controls.currentKey];
  const [xDirection, yDirection] = direction;
  snake.x += xDirection * snake.size;
  snake.y += yDirection * snake.size;
  controls.lastKey = controls.currentKey;

  if (isWallCollision()) {
    setGameOver();
  }

  if (isSelfCollision()) {
    setGameOver();
  }
}

export function update() {
  if (game.gameOver) {
    return;
  }

  const { snake } = game.objects;

  if (snake.timeSinceLastUpdate !== null) {
    snake.timeSinceLastUpdate += game.fps;

    if (snake.timeSinceLastUpdate < snake.speed) {
      return;
    }
  }

  moveSnake();

  if (isEatingApple()) {
    game.objects.snake.shouldGrow = true;
  }

  snake.timeSinceLastUpdate = 0; // TODO: Does it need to be more accurate?
}

export const snake = { init, update, render } as Snake;
