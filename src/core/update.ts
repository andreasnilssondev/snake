import { updateSnake } from '../objects/snake';
import { updateApple } from '../objects/apple';
import { updateMenu } from '../objects/menu';
import { updateControls } from './controls';

export function update() {
  updateSnake();
  updateApple();
  updateMenu();
  updateControls();
}
