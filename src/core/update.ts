import { updateSnake } from '../objects/snake';
import { updateApple } from '../objects/apple';
import { updateMenu } from '../objects/menu';
import { Game } from '../types';
import { updateControls } from './controls';

export function update(game: Game) {
  updateSnake(game);
  updateApple(game);
  updateMenu(game);
  updateControls(game);
}
