import { DIRECTIONS } from '../core/controls';
import { Game } from '../types';
import { setGameOver } from '../core/game';

export function createSnake(canvas: HTMLCanvasElement) {
  const speed = 200; // How many ms to move one square
  const size = canvas.width / 20;
  const x = size * 2;
  const y = size * 2;

  const tail = [
    { y, x: x - size * 3 },
    { y, x: x - size * 2 },
    { y, x: x - size },
  ];

  return {
    x,
    y,
    size,
    tail,
    shouldGrow: false,
    speed,
    timeSinceLastUpdate: null,
  };
}

export function drawSnake(game: Game) {
  const { objects, context } = game;
  const { snake } = objects;

  context.fillStyle = '#388538';
  context.fillRect(snake.x + 1, snake.y + 1, snake.size - 2, snake.size - 2);

  snake.tail.forEach(piece => {
    context.fillRect(piece.x + 1, piece.y + 1, snake.size - 2, snake.size - 2);
  });
}

function isEatingApple(game: Game) {
  const { snake, apple } = game.objects;
  return snake.x === apple.x && snake.y === apple.y;
}

function isWallCollision(game: Game) {
  const { objects, canvas } = game;
  const { snake } = objects;

  return (
    snake.x < 0 ||
    snake.x > canvas.width - snake.size ||
    snake.y < 0 ||
    snake.y > canvas.height - snake.size
  );
}

function isSelfCollision(game: Game) {
  const { snake } = game.objects;
  return snake.tail.some(position => snake.x === position.x && snake.y === position.y);
}

export function moveSnake(game: Game) {
  const { objects, controls } = game;
  const { snake } = objects;

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

  if (isWallCollision(game)) {
    setGameOver(game);
  }

  if (isSelfCollision(game)) {
    setGameOver(game);
  }
}

export function updateSnake(game: Game) {
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

  moveSnake(game);

  if (isEatingApple(game)) {
    game.objects.snake.shouldGrow = true;
  }

  snake.timeSinceLastUpdate = 0; // TODO: Does it need to be more accurate?
}
