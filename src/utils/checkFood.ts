import { createApple } from '../apple';
import { growSnake } from '../snake';
import { Snake, Apple } from '../types';

interface IsEatingApple {
  snake: Snake;
  apple: Apple;
}

function isEatingApple({ snake, apple }: IsEatingApple) {
  return snake.x === apple.x && snake.y === apple.y;
}

interface CheckFood {
  snake: Snake;
  apple: Apple;
  canvas: HTMLCanvasElement;
}

export function checkFood(game: CheckFood) {
  const { snake, apple, canvas } = game;

  if (isEatingApple({ snake, apple })) {
    game.apple = createApple(canvas);
    game.snake = growSnake(snake);
  }
}
