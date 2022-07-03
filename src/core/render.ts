import { clearCanvas } from './canvas';
import { renderApple } from '../objects/apple';
import { renderSnake } from '../objects/snake';
import { renderMenu } from '../objects/menu';
import { renderControls } from './controls';

export function render() {
  clearCanvas();
  renderSnake();
  renderApple();
  renderMenu();
  renderControls();
}
