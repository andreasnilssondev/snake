import { clearCanvas } from './canvas';
import { drawApple } from '../objects/apple';
import { drawSnake } from '../objects/snake';
import { drawMenu } from '../objects/menu';
import { drawControls } from './controls';
import { Game } from '../types';

export function draw(game: Game) {
  clearCanvas(game);

  drawSnake(game);
  drawApple(game);
  drawMenu(game);
  drawControls(game);
}
