import { updateSnake } from './snake';
import { updateApple } from './apple';
import { Game } from './types';

export function update(game: Game) {
  updateSnake(game);
  updateApple(game);
}
