import { clearCanvas } from './canvas';
import { drawApple } from './apple';
import { drawSnake } from './snake';
import { Game } from './types';
import { drawGameOver } from './game';

export function draw(game: Game) {
  clearCanvas(game);

  if (game.gameOver) {
    drawGameOver(game);
  }

  drawSnake(game);
  drawApple(game);
}
