import { createApple } from '../apple';
import { growSnake } from '../snake';
import { Game } from '../types';

function isEatingApple(game: Game) {
  const { snake, apple } = game;
  return snake.x === apple.x && snake.y === apple.y;
}

export function checkFood(game: Game) {
  const { snake, canvas } = game;

  if (isEatingApple(game)) {
    game.apple = createApple(canvas);
    game.snake = growSnake(snake);
  }
}
