import { clearCanvas } from './utils/clearCanvas';
import { drawApple } from './apple';
import { drawSnake } from './snake';
import { Game } from './types';

export function draw(game: Game) {
  const { snake, apple, canvas, context, gameOver } = game;

  clearCanvas({ context, canvas });

  if (gameOver) {
    context.font = '40px Arial';
    context.textAlign = 'center';
    context.fillStyle = '#888';
    context.fillText('Game over', canvas.width / 2, canvas.height / 3);
  }

  drawSnake({ snake, context });
  drawApple({ apple, context });
}
