import { clearCanvas } from './canvas';
import { drawApple } from '../objects/apple';
import { drawSnake } from '../objects/snake';
import { Game } from '../types';
import { drawMenu } from '../objects/menu';

export function draw(game: Game) {
  clearCanvas(game);

  drawSnake(game);
  drawApple(game);
  drawMenu(game);
}
