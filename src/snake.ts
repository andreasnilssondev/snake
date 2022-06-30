import { DIRECTIONS } from './controls';
import { Game, Snake } from './types';
import { setGameOver } from './game';

export function createSnake() {
  const size = 25;
  const x = size * 2;
  const y = size * 2;
  const tail = [
    { y, x: x - size * 3 },
    { y, x: x - size * 2 },
    { y, x: x - size },
  ];
  const shouldGrow = false;
  return {
    x,
    y,
    size,
    tail,
    shouldGrow,
  };
}

export function drawSnake(game: Game) {
  const { snake, context } = game;

  context.fillStyle = '#388538';
  context.fillRect(snake.x + 1, snake.y + 1, snake.size - 2, snake.size - 2);

  snake.tail.forEach(piece => {
    context.fillRect(piece.x + 1, piece.y + 1, snake.size - 2, snake.size - 2);
  });
}

function isWallCollision(snake: Snake, canvas: HTMLCanvasElement) {
  return (
    snake.x < 0 ||
    snake.x > canvas.width - snake.size ||
    snake.y < 0 ||
    snake.y > canvas.height - snake.size
  );
}

function isSelfCollision(snake: Snake) {
  return snake.tail.some(position => snake.x === position.x && snake.y === position.y);
}

export function moveSnake(game: Game) {
  const { snake, controls, canvas } = game;

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

  if (isWallCollision(snake, canvas)) {
    setGameOver(game);
  }

  if (isSelfCollision(snake)) {
    setGameOver(game);
  }

  return snake;
}

export function growSnake(snake: Snake): Snake {
  snake.shouldGrow = true;
  return snake;
}

export function updateSnake(game: Game) {
  game.snake = moveSnake(game);
}
