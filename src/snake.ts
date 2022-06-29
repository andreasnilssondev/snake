import { DIRECTIONS } from './controls';
import { Controls, Snake } from './types';

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
  return { x, y, size, tail, shouldGrow };
}

interface DrawSnake {
  snake: Snake;
  context: CanvasRenderingContext2D;
}

export function drawSnake({ snake, context }: DrawSnake) {
  context.fillStyle = '#388538';
  context.fillRect(snake.x + 1, snake.y + 1, snake.size - 2, snake.size - 2);

  for (const piece of snake.tail) {
    context.fillRect(piece.x + 1, piece.y + 1, snake.size - 2, snake.size - 2);
  }
}

interface MoveSnake {
  snake: Snake;
  controls: Controls;
  canvas: HTMLCanvasElement;
  setGameOver: () => void;
}

export function moveSnake({ snake, controls, canvas, setGameOver }: MoveSnake) {
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

  // If hitting a wall
  if (
    snake.x < 0 ||
    snake.x > canvas.width - snake.size ||
    snake.y < 0 ||
    snake.y > canvas.height - snake.size
  ) {
    setGameOver();
  }

  // If hitting itself
  if (snake.tail.some(position => snake.x === position.x && snake.y === position.y)) {
    setGameOver();
  }

  return snake;
}

export function growSnake(snake: Snake): Snake {
  snake.shouldGrow = true;
  return snake;
}
