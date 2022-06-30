import { checkFood } from './utils/checkFood';
import { moveSnake } from './snake';
import { Game } from './types';

export function update(game: Game) {
  game.snake = moveSnake(game);
  checkFood(game);
}
